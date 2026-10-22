/**
 * Deterministic Gate Checks para Gumloop en Node.js (Isomórfico a gate_checks.py).
 * Cero dependencias externas (solo bibliotecas nativas de Node).
 */

function checkMarpFrontmatter(deck) {
  const hasMarp = /^\s*marp:\s*true\b/mi.test(deck);
  const has16_9 = /^\s*size:\s*16:9\b/mi.test(deck);
  return {
    valid: hasMarp && has16_9,
    hasMarp,
    has16_9
  };
}

function splitSlides(deck) {
  const text = deck.trim();
  if (text.startsWith('---')) {
    const parts = text.split(/\n---\s*\n/);
    if (parts.length > 1) {
      return parts.slice(1);
    }
    return [];
  }
  return text.split(/\n---\s*\n/);
}

function countVisibleLines(slide) {
  const cleaned = slide
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style>[\s\S]*?<\/style>/g, '');
  const lines = cleaned
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0 && !l.startsWith('<!--'));
  return lines.length;
}

function checkSlideBudgets(slides, maxAllowed = 18) {
  const slideDetails = [];
  let budgetPassed = true;
  let notesPassed = true;
  let maxDetected = 0;

  slides.forEach((slide, idx) => {
    const linesCount = countVisibleLines(slide);
    if (linesCount > maxDetected) maxDetected = linesCount;

    const hasNotes = /<!--\s*Speaker Notes:/i.test(slide);
    const hasTime = /\[⏱️[^\]]+\]/.test(slide);

    if (linesCount > maxAllowed) budgetPassed = false;
    if (!hasNotes || !hasTime) notesPassed = false;

    slideDetails.push({
      slideIndex: idx + 1,
      visibleLines: linesCount,
      linesPassed: linesCount <= maxAllowed,
      hasNotes,
      hasTimeEstimate: hasTime
    });
  });

  return {
    budgetPassed,
    notesPassed,
    maxLines: maxDetected,
    slidesCount: slides.length,
    details: slideDetails
  };
}

// --- Procedencia numérica ---------------------------------------------------
// Solo se comparan cifras que son afirmaciones: se excluyen notas del orador
// (comentarios HTML), bloques de código, código en línea, URLs y el frontmatter.
// Coincidencia por valor numérico con límites de token, no por subcadena.
const NUMBER_RE = /(?<![A-Za-z_\d.])(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?(%)?(?!\d)/g;

function claimText(text) {
  return text
    .replace(/^\s*---\s*\n[\s\S]*?\n---[ \t]*(?:\n|$)/, ' ')
    .replace(/<style>[\s\S]*?<\/style>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/^\s*(`{3,}|~{3,})[\s\S]*?^\s*\1[ \t]*$/gm, ' ')
    .replace(/`[^`\n]+`/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ');
}

function numbersIn(text) {
  return [...claimText(text).matchAll(NUMBER_RE)].map(m => m[0]);
}

function canonical(token) {
  const value = Number(token.replace(/%$/, '').replace(/,/g, ''));
  return Number.isFinite(value) ? String(value) : null;
}

function isCheckable(token) {
  if (token.endsWith('%') || token.includes('.') || token.includes(',')) return true;
  const value = Number(token);
  return value >= 10 && !(value >= 1900 && value <= 2099);
}

function checkNumericProvenance(deck, primaryText) {
  if (!primaryText) return [];
  const sourceValues = new Set(numbersIn(primaryText).map(canonical).filter(v => v !== null));
  const unverified = new Set();
  for (const token of numbersIn(deck)) {
    if (isCheckable(token) && !sourceValues.has(canonical(token))) unverified.add(token);
  }
  return [...unverified].sort();
}

function checkBibtexCitations(deck, bibtex) {
  if (!bibtex) return [];

  const citeMatches = [...deck.matchAll(/\[@([a-zA-Z0-9_\-]+)\]/g)];
  const citeKeys = [...new Set(citeMatches.map(m => m[1]))];

  const missing = citeKeys.filter(key => {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`@\\w+\\{${escaped}\\s*,`, 'i');
    return !regex.test(bibtex);
  });

  return missing.sort();
}

function runGateChecks(slidesMarkdown, primaryText = '', bibtex = '') {
  const frontmatter = checkMarpFrontmatter(slidesMarkdown);
  const slides = splitSlides(slidesMarkdown);
  const slideEval = checkSlideBudgets(slides, 18);
  const unverifiedNumbers = checkNumericProvenance(slidesMarkdown, primaryText);
  const unverifiedCitations = checkBibtexCitations(slidesMarkdown, bibtex);

  const overallPassed = (
    frontmatter.valid &&
    slideEval.budgetPassed &&
    slideEval.notesPassed &&
    unverifiedNumbers.length === 0 &&
    unverifiedCitations.length === 0
  );

  const mdLines = ['## 🛡️ Reporte Determinista del Gate (Exit Code 0 Verification)\n'];
  mdLines.push(`- **Veredicto General:** ${overallPassed ? '✅ APROBADO' : '❌ CORRECCIONES REQUERIDAS'}`);
  mdLines.push(`- **Directivas Marp 16:9:** ${frontmatter.valid ? '✅ Válido' : '❌ Faltan directivas marp: true o size: 16:9'}`);
  mdLines.push(`- **Presupuesto Tipográfico:** ${slideEval.budgetPassed ? '✅ Pasó' : '❌ Diapositivas superan 18 líneas'} (Máximo detectado: ${slideEval.maxLines} líneas)`);
  mdLines.push(`- **Cobertura de Notas de Orador:** ${slideEval.notesPassed ? '✅ 100% con tiempo' : '❌ Faltan notas o estimación [⏱️] en diapositivas'}`);

  if (unverifiedNumbers.length > 0) {
    mdLines.push(`- **⚠️ Cifras sin Procedencia en Texto Primario (${unverifiedNumbers.length}):** ${unverifiedNumbers.join(', ')}`);
  } else {
    mdLines.push('- **Procedencia Numérica:** ✅ 100% de cifras presentes en el texto primario.');
  }

  if (unverifiedCitations.length > 0) {
    mdLines.push(`- **⚠️ Citas sin Entrada en BibTeX (${unverifiedCitations.length}):** ${unverifiedCitations.join(', ')}`);
  } else {
    mdLines.push('- **Registro de Citas:** ✅ Todas las citas cuentan con entrada BibTeX.');
  }

  const gateReportMarkdown = mdLines.join('\n');

  return {
    gate_passed: overallPassed,
    marp_valid: frontmatter.valid,
    line_budget_passed: slideEval.budgetPassed,
    max_lines: slideEval.maxLines,
    notes_passed: slideEval.notesPassed,
    slides_count: slideEval.slidesCount,
    unverified_numbers: unverifiedNumbers,
    unverified_citations: unverifiedCitations,
    gate_report_markdown: gateReportMarkdown,
    gate_report_json: JSON.stringify({
      gate_passed: overallPassed,
      marp_valid: frontmatter.valid,
      line_budget_passed: slideEval.budgetPassed,
      max_lines: slideEval.maxLines,
      notes_passed: slideEval.notesPassed,
      unverified_numbers_count: unverifiedNumbers.length,
      unverified_citations_count: unverifiedCitations.length
    }, null, 2)
  };
}

function main(slidesMarkdown, primaryText = '', bibtex = '') {
  return runGateChecks(slidesMarkdown, primaryText, bibtex);
}

module.exports = {
  checkMarpFrontmatter,
  splitSlides,
  countVisibleLines,
  checkSlideBudgets,
  checkNumericProvenance,
  checkBibtexCitations,
  runGateChecks,
  main
};
