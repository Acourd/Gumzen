/**
 * Test Suite Determinista para Deterministic Gate Checks (gate_checks.cjs & gate_checks.py).
 * Comprueba que el oráculo de código detecte físicamente violaciones de formato,
 * exceso de líneas, notas ausentes, cifras sin procedencia y citas BibTeX fantasma.
 * 
 * Ejecución: node tests/test_gate_checks.cjs
 */

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { runGateChecks } = require('../workflows/custom_nodes/gate_checks.cjs');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
    failed++;
  }
}

console.log('====================================================');
console.log('  Deterministic Gate Checks - Verification Suite');
console.log('====================================================\n');

// 1. Fixture Válido (Debe Aprobar)
const validDeck = `---
marp: true
size: 16:9
theme: gaia
---
# Introducción a Sistemas Distribuidos
- Tasa observada de disponibilidad: 99.8%
- Muestra evaluada: 500 nodos
<!-- Speaker Notes: [⏱️ 45s] Explicar la arquitectura de consenso. -->
---
## Resultados Principales
- Latencia reducida a 12.4ms
[@lamport_1978_time]
<!-- Speaker Notes: [⏱️ 60s] Resaltar la cota de Lamport. -->
`;

const validPrimary = "El experimento evaluó 500 nodos alcanzando 99.8% de disponibilidad y 12.4ms de latencia media.";
const validBibtex = "@article{lamport_1978_time,\n  author = {Leslie Lamport},\n  title = {Time, Clocks, and the Ordering of Events},\n  year = {1978}\n}";

test('1. Fixture válido con cifras y citas reales pasa el gate al 100%', () => {
  const result = runGateChecks(validDeck, validPrimary, validBibtex);
  assert.strictEqual(result.gate_passed, true);
  assert.strictEqual(result.marp_valid, true);
  assert.strictEqual(result.line_budget_passed, true);
  assert.strictEqual(result.notes_passed, true);
  assert.strictEqual(result.unverified_numbers.length, 0);
  assert.strictEqual(result.unverified_citations.length, 0);
});

// 2. Mutación: Falta Frontmatter Marp
test('2. Mutación: Falta marp: true o size: 16:9 hace fallar marp_valid', () => {
  const invalidMarp = validDeck.replace('size: 16:9', 'size: 4:3');
  const result = runGateChecks(invalidMarp, validPrimary, validBibtex);
  assert.strictEqual(result.gate_passed, false);
  assert.strictEqual(result.marp_valid, false);
});

// 3. Mutación: Exceso de Líneas (> 18 líneas visibles)
test('3. Mutación: Diapositiva con más de 18 líneas hace fallar line_budget_passed', () => {
  const longSlide = validDeck + `\n---\n## Diapositiva Saturada\n` + Array.from({ length: 22 }, (_, i) => `- Línea ${i + 1}`).join('\n') + `\n<!-- Speaker Notes: [⏱️ 30s] Nota válida. -->\n`;
  const result = runGateChecks(longSlide, validPrimary, validBibtex);
  assert.strictEqual(result.gate_passed, false);
  assert.strictEqual(result.line_budget_passed, false);
  assert.ok(result.max_lines > 18);
});

// 4. Mutación: Notas de Orador Incompletas
test('4. Mutación: Falta de notas o tiempo estimado hace fallar notes_passed', () => {
  const noNotes = validDeck.replace('<!-- Speaker Notes: [⏱️ 45s] Explicar la arquitectura de consenso. -->', '');
  const result = runGateChecks(noNotes, validPrimary, validBibtex);
  assert.strictEqual(result.gate_passed, false);
  assert.strictEqual(result.notes_passed, false);
});

// 5. Mutación: Cifra sin Procedencia en Texto Primario (Alucinación Numérica)
test('5. Mutación: Cifra alucinada (ej. 87.5%) es detectada y reportada', () => {
  const fakeNumberDeck = validDeck.replace('99.8%', '87.5%');
  const result = runGateChecks(fakeNumberDeck, validPrimary, validBibtex);
  assert.strictEqual(result.gate_passed, false);
  assert.ok(result.unverified_numbers.includes('87.5%'));
});

// 6. Mutación: Cita BibTeX Fantasma (Alucinación Bibliográfica)
test('6. Mutación: Cita [@autor_fantasma] sin entrada BibTeX es detectada y reportada', () => {
  const fakeCiteDeck = validDeck.replace('[@lamport_1978_time]', '[@ghost_author_2026]');
  const result = runGateChecks(fakeCiteDeck, validPrimary, validBibtex);
  assert.strictEqual(result.gate_passed, false);
  assert.ok(result.unverified_citations.includes('ghost_author_2026'));
});

// 7. Verificación del Reporte Estructurado JSON y Markdown
test('7. Emisión de gate_report_markdown y gate_report_json bien formados', () => {
  const result = runGateChecks(validDeck, validPrimary, validBibtex);
  assert.ok(result.gate_report_markdown.includes('Reporte Determinista del Gate'));
  const parsedJson = JSON.parse(result.gate_report_json);
  assert.strictEqual(parsedJson.gate_passed, true);
  assert.strictEqual(parsedJson.unverified_numbers_count, 0);
});

// 8. Verificación de Compatibilidad del Script de Python
test('8. workflows/custom_nodes/gate_checks.py existe y define la firma canónica def main()', () => {
  const pyPath = path.join(__dirname, '../workflows/custom_nodes/gate_checks.py');
  assert.ok(fs.existsSync(pyPath), 'gate_checks.py debe existir');
  const content = fs.readFileSync(pyPath, 'utf-8');
  assert.ok(content.includes('def main(slides_markdown: str'), 'def main() con slides_markdown debe existir');
  assert.ok(content.includes('check_numeric_provenance'), 'check_numeric_provenance debe existir');
  assert.ok(content.includes('check_bibtex_citations'), 'check_bibtex_citations debe existir');
});

console.log('\n====================================================');
console.log(`Resumen de Pruebas Gate: ${passed} Pasadas, ${failed} Falladas`);
console.log('====================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
