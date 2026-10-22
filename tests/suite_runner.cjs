/**
 * Test Suite Determinista para Gumloop Academic Agent Suite.
 * Verifica integridad de archivos, esquemas de skills, plantillas Marp,
 * validación DAG de Gumloop y funcionamiento del extractor de arXiv.
 * 
 * Ejecución: node tests/suite_runner.cjs
 */

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.resolve(__dirname, '..');
let testsPassed = 0;
let testsFailed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
    testsFailed++;
  }
}

console.log('====================================================');
console.log('  Gumloop Academic Suite - Deterministic Test Runner');
console.log('====================================================\n');

// 1. Verificación de Licencia y Atribución
console.log('--- 1. Licencia, Atribución y Sanitización ---');

runTest('LICENSE existe y contiene texto de licencia MIT', () => {
  const licensePath = path.join(ROOT_DIR, 'LICENSE');
  assert.ok(fs.existsSync(licensePath), 'LICENSE debe existir');
  const content = fs.readFileSync(licensePath, 'utf-8');
  assert.ok(content.includes('MIT License'), 'Debe declarar MIT License');
  assert.ok(content.includes('2026'), 'Debe incluir copyright 2026');
});

runTest('ATTRIBUTION.md existe y reconoce fuentes de inspiración', () => {
  const attrPath = path.join(ROOT_DIR, 'ATTRIBUTION.md');
  assert.ok(fs.existsSync(attrPath), 'ATTRIBUTION.md debe existir');
  const content = fs.readFileSync(attrPath, 'utf-8');
  assert.ok(content.includes('Marp'), 'Debe citar a Marp');
  assert.ok(content.includes('ngtiendong'), 'Debe citar a ngtiendong');
  assert.ok(content.includes('robonuggets'), 'Debe citar a robonuggets');
  assert.ok(content.includes('Axkern'), 'Debe citar a Axkern');
  assert.ok(content.includes('Oyza'), 'Debe citar a Oyza');
});

runTest('Skills no contienen firmas personales ni enlaces de autopromoción invasivos', () => {
  const presentationSkill = fs.readFileSync(
    path.join(ROOT_DIR, 'skills/presentation-deck-architect/SKILL.md'),
    'utf-8'
  );
  assert.ok(!presentationSkill.includes('github.com/Acourd'), 'No debe contener enlace personal promocional');
  assert.ok(!presentationSkill.includes('**Ponente / Investigador:** Acourd'), 'No debe contener ponente personal hardcodeado');
});

// 2. Verificación de Skills Académicas
console.log('\n--- 2. Esquemas de Skills y Formato Copiable ---');

runTest('presentation-deck-architect contiene directivas Marp 16:9 y Speaker Notes', () => {
  const content = fs.readFileSync(
    path.join(ROOT_DIR, 'skills/presentation-deck-architect/SKILL.md'),
    'utf-8'
  );
  assert.ok(content.includes('size: 16:9'), 'Debe incluir tamaño panorámico 16:9');
  assert.ok(content.includes('<!-- Speaker Notes:'), 'Debe incluir notas de orador');
  assert.ok(content.includes('BLOQUE DE COPIADO RÁPIDO'), 'Debe incluir bloque de copiado rápido');
});

runTest('academic-literature-grounding contiene matriz epistémica y BibTeX', () => {
  const content = fs.readFileSync(
    path.join(ROOT_DIR, 'skills/academic-literature-grounding/SKILL.md'),
    'utf-8'
  );
  assert.ok(content.includes('Matriz de Certeza Empírica'), 'Debe contener matriz de certeza');
  assert.ok(content.includes('```bibtex'), 'Debe incluir formato BibTeX');
  assert.ok(content.includes('Observación'), 'Debe distinguir observaciones directas');
  assert.ok(content.includes('Inferencia'), 'Debe distinguir inferencias');
});

runTest('fact-audit-and-certainty contiene las 4 compuertas y salida dual', () => {
  const content = fs.readFileSync(
    path.join(ROOT_DIR, 'skills/fact-audit-and-certainty/SKILL.md'),
    'utf-8'
  );
  assert.ok(content.includes('PROCEDENCIA'), 'Compuerta 1 presente');
  assert.ok(content.includes('PRECISIÓN NUMÉRICA'), 'Compuerta 2 presente');
  assert.ok(content.includes('CAUSALIDAD'), 'Compuerta 3 presente');
  assert.ok(content.includes('MARP'), 'Compuerta 4 presente');
  assert.ok(content.includes('audit_passed'), 'Salida JSON presente');
  assert.ok(content.includes('exit_code'), 'Código de salida presente');
});

// 3. Verificación de Workflow DAG
console.log('\n--- 3. Integridad de Workflows y Conexiones DAG ---');

runTest('academic_research_pipeline.json es JSON válido y tiene 5 nodos conectados', () => {
  const jsonPath = path.join(ROOT_DIR, 'workflows/academic_research_pipeline.json');
  assert.ok(fs.existsSync(jsonPath), 'El pipeline JSON debe existir');
  const pipeline = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  assert.strictEqual(pipeline.nodes.length, 5, 'Debe tener exactamente 5 nodos');
  
  // Verificar que todas las referencias a archivos en el pipeline existen
  for (const node of pipeline.nodes) {
    if (node.script_path) {
      const scriptFullPath = path.join(ROOT_DIR, node.script_path);
      assert.ok(fs.existsSync(scriptFullPath), `script_path ${node.script_path} debe existir en disco`);
    }
    if (node.skill_ref) {
      const skillFullPath = path.join(ROOT_DIR, node.skill_ref);
      assert.ok(fs.existsSync(skillFullPath), `skill_ref ${node.skill_ref} debe existir en disco`);
    }
  }
});

// 4. Verificación Funcional del Módulo arXiv
console.log('\n--- 4. Módulo Extractor de arXiv (Cero Tokens) ---');

const { fetchArxiv, generateBibtex } = require('../workflows/custom_nodes/arxiv_semantic_fetcher.cjs');

runTest('generateBibtex produce sintaxis válida con autores y slug de título', () => {
  const mockPaper = {
    title: 'Self-Stabilizing Agent Governance in Autonomous Networks',
    authors: ['Ada Lovelace', 'Alan Turing'],
    year: '2026',
    id: 'http://arxiv.org/abs/2601.12345v1',
    primaryCategory: 'cs.AI',
    doi: '10.1000/182'
  };

  const bibtex = generateBibtex(mockPaper);
  assert.ok(bibtex.startsWith('@article{'), 'Debe empezar con @article');
  assert.ok(bibtex.includes('lovelace_2026_selfstabilizing'), 'La clave de citación debe incluir apellido del primer autor, año y slug');
  assert.ok(bibtex.includes('Ada Lovelace and Alan Turing'), 'Los autores deben estar separados por and');
  assert.ok(bibtex.includes('primaryClass  = {cs.AI}'), 'Debe incluir la categoría');
  assert.ok(bibtex.includes('doi       = {10.1000/182}'), 'Debe incluir el DOI');
});

runTest('fetchArxiv maneja consultas vacías sin lanzar excepciones', async () => {
  const result = await fetchArxiv('');
  assert.strictEqual(result.success, false, 'Consulta vacía debe devolver success: false');
  assert.strictEqual(result.count, 0, 'Count debe ser 0');
});

runTest('README.md tiene guía rápida de 3 pasos y tabla de costos', () => {
  const readme = fs.readFileSync(path.join(ROOT_DIR, 'README.md'), 'utf-8');
  assert.ok(readme.includes('1. Inicio Rápido'), 'Debe contener inicio rápido');
  assert.ok(readme.includes('3 a 5 créditos'), 'Debe documentar el costo predecible');
  assert.ok(readme.includes('ATTRIBUTION.md'), 'Debe enlazar a las atribuciones');
});

console.log('\n====================================================');
console.log(`Resumen de Pruebas: ${testsPassed} Pasadas, ${testsFailed} Falladas`);
console.log('====================================================\n');

if (testsFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
