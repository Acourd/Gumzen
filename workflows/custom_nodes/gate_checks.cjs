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

function checkNumericProvenance(deck, primaryText) {
  if (!primaryText) return [];

  const rawMatches = deck.match(/\b(?:\d+(?:\.\d+)?%|\d+\.\d+\b|\d{2,}\b)/g) || [];
  const uniqueTokens = [...new Set(rawMatches)];

  const unverified = uniqueTokens.filter(token => {
    if (token === '16' || token === '9') return false; // Ignorar formato 16:9
    return !primaryText.includes(token);
  });

  return unverified.sort();
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
