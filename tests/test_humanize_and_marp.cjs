/**
 * Test de Calidad de Texto, Métricas de Cadencia (Humanize) y Validación Marp.
 * Audita todos los archivos de documentación y skills para garantizar burstiness rítmica,
 * ausencia absoluta de clichés de AI y compilación estricta de Marp.
 * 
 * Ejecución: node tests/test_humanize_and_marp.cjs
 */

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.resolve(__dirname, '..');

const FORBIDDEN_SLOP_MARKERS = [
  'delve',
  'rich tapestry',
  'tapestry',
  'beacon of',
  'game-changer',
  'paradigm shift',
  'plethora of',
  'myriad of',
  'embark on',
  'unleash',
  'streamline',
  'seamlessly',
  'invaluable',
  'it goes without saying',
  'at its core',
  'hope this helps',
  'certainly!',
  'feel free to ask',
  'tapiz',
  'faro de',
  'sinfonía de',
  'plétora de',
  'salto cuántico',
  'de vanguardia',
  'huelga decir',
  'espero que esto te sirva'
];

function analyzeTextCadence(text) {
  // Eliminar bloques de código markdown (4 backticks y 3 backticks) para auditar solo la prosa
  const without4Backticks = text.replace(/````[\s\S]*?````/g, '');
  const prose = without4Backticks.replace(/```[\s\S]*?```/g, '').replace(/`[^`]+`/g, '');
  
  // Dividir en oraciones por puntos, signos de exclamación o interrogación
  const sentences = prose
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 5 && !s.startsWith('#') && !s.startsWith('-') && !s.startsWith('|'));

  if (sentences.length < 3) return { cv: 1.0, variance: 10.0, slopFound: [], mean: 12.0, sentenceCount: sentences.length };

  const wordCounts = sentences.map(s => s.split(/\s+/).filter(w => w.length > 0).length);
  const mean = wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length;
  const variance = wordCounts.reduce((sum, len) => sum + Math.pow(len - mean, 2), 0) / wordCounts.length;
  const stdDev = Math.sqrt(variance);
  const cv = mean > 0 ? stdDev / mean : 0;

  const textLower = prose.toLowerCase();
  const slopFound = FORBIDDEN_SLOP_MARKERS.filter(marker => textLower.includes(marker));

  return { cv, variance, mean, slopFound, sentenceCount: sentences.length };
}

console.log('====================================================');
console.log('  Audit de Cadencia Rítmica & Control Anti-Slop');
console.log('====================================================\n');

const filesToAudit = [
  'README.md',
  'ATTRIBUTION.md',
  'core/OYZA_INTERACTION_PROTOCOL.md',
  'skills/programming/scout/SKILL.md',
  'skills/programming/idea-maximizer/SKILL.md',
  'skills/programming/intent-contract/SKILL.md',
  'skills/programming/code-audit/SKILL.md',
  'skills/programming/causal-debug/SKILL.md',
  'skills/communication/humanizer/SKILL.md',
  'skills/communication/presentation-architect/SKILL.md',
  'skills/communication/visual-explainer/SKILL.md',
  'skills/communication/narrative-distiller/SKILL.md',
  'skills/communication/pedagogic-editor/SKILL.md',
  'skills/research/web-research-filter/SKILL.md',
  'skills/research/paper-deconstructor/SKILL.md',
  'skills/research/concept-synthesizer/SKILL.md',
  'skills/research/socratic-tutor/SKILL.md',
  'skills/research/epistemic-auditor/SKILL.md'
];

let allPassed = true;

for (const relPath of filesToAudit) {
  const fullPath = path.join(ROOT_DIR, relPath);
  assert.ok(fs.existsSync(fullPath), `Archivo ${relPath} debe existir`);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const metrics = analyzeTextCadence(content);

  console.log(`Auditoría de: ${relPath}`);
  console.log(`  - Oraciones auditadas: ${metrics.sentenceCount}`);
  console.log(`  - Media de palabras: ${metrics.mean.toFixed(2)}`);
  console.log(`  - Varianza sintáctica (σ²): ${metrics.variance.toFixed(2)} (Mínimo: 6.0)`);
  console.log(`  - Coeficiente de Burstiness (CV): ${metrics.cv.toFixed(2)} (Mínimo: 0.25)`);
  
  if (metrics.slopFound.length > 0) {
    console.error(`  [FAIL] Clichés de AI detectados: ${metrics.slopFound.join(', ')}`);
    allPassed = false;
  } else {
    console.log(`  [PASS] Cero clichés o delatores de AI detectados.`);
  }

  if (metrics.variance < 6.0 || metrics.cv < 0.25) {
    console.error(`  [FAIL] Cadencia monótona (CV < 0.25 o σ² < 6.0)`);
    allPassed = false;
  } else {
    console.log(`  [PASS] Cadencia humana asimétrica aprobada.`);
  }
  console.log('');
}

// Validación de la sintaxis Marp del bloque copiable
console.log('--- Validación de Sintaxis Marp (presentation-architect) ---');
const marpSkill = fs.readFileSync(path.join(ROOT_DIR, 'skills/communication/presentation-architect/SKILL.md'), 'utf-8');
const marpMatch = marpSkill.match(/```markdown\n(---[\s\S]*?```)/);

assert.ok(marpMatch, 'Debe encontrarse el bloque Marp en el SKILL.md');
const marpCode = marpMatch[1];

assert.ok(marpCode.includes('marp: true'), 'Debe tener directiva marp: true');
assert.ok(marpCode.includes('size: 16:9'), 'Debe tener formato 16:9');
assert.ok(marpCode.includes('paginate: true'), 'Debe tener paginación activa');

// Contar número de diapositivas separadas por '---'
const slides = marpCode.split(/\n---\n/);
console.log(`  Total de diapositivas en la plantilla: ${slides.length - 1} láminas`);
assert.ok(slides.length >= 6, 'Debe contener entre 5 y 6 diapositivas completas');

for (let i = 1; i < slides.length; i++) {
  const slide = slides[i];
  assert.ok(slide.includes('<!-- Speaker Notes:'), `Diapositiva ${i} debe tener notas de orador`);
}
console.log('  [PASS] Todas las diapositivas cuentan con notas de orador integradas.');

if (allPassed) {
  console.log('\n[ÉXITO] Todas las comprobaciones de Humanize y Marp fueron superadas.');
  process.exit(0);
} else {
  console.error('\n[FALLO] Se detectaron violaciones de calidad.');
  process.exit(1);
}
