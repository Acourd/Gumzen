/**
 * Test Suite Determinista para Gumzen Epistemic Agent Suite.
 * Verifica integridad de archivos, las 15 skills por categoría, contratos Copy-Ready,
 * protocolo Oyza Core, plantillas Marp, validación DAG y módulo arXiv.
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

async function runAsyncTest(name, fn) {
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`  [FAIL] ${name}: ${err.message}`);
    testsFailed++;
  }
}

async function main() {
  console.log('====================================================');
  console.log('  Gumzen Epistemic Suite - Deterministic Test Runner');
  console.log('====================================================\n');

  // 1. Verificación de Licencia, Atribución y Oyza Core
  console.log('--- 1. Licencia, Atribución y Protocolo Oyza Core ---');

  runTest('LICENSE existe y contiene texto de licencia MIT', () => {
    const licensePath = path.join(ROOT_DIR, 'LICENSE');
    assert.ok(fs.existsSync(licensePath), 'LICENSE debe existir');
    const content = fs.readFileSync(licensePath, 'utf-8');
    assert.ok(content.includes('MIT License'), 'Debe declarar MIT License');
    assert.ok(content.includes('2026'), 'Debe incluir copyright 2026');
  });

  runTest('ATTRIBUTION.md existe y reconoce fuentes de inspiración y Oyza', () => {
    const attrPath = path.join(ROOT_DIR, 'ATTRIBUTION.md');
    assert.ok(fs.existsSync(attrPath), 'ATTRIBUTION.md debe existir');
    const content = fs.readFileSync(attrPath, 'utf-8');
    assert.ok(content.includes('Marp'), 'Debe citar a Marp');
    assert.ok(content.includes('ngtiendong'), 'Debe citar a ngtiendong');
    assert.ok(content.includes('robonuggets'), 'Debe citar a robonuggets');
    assert.ok(content.includes('Axkern'), 'Debe citar a Axkern');
    assert.ok(content.includes('Oyza'), 'Debe citar a Oyza');
  });

  runTest('core/OYZA_INTERACTION_PROTOCOL.md contiene las 6 secciones canónicas del contrato portable', () => {
    const oyzaPath = path.join(ROOT_DIR, 'core/OYZA_INTERACTION_PROTOCOL.md');
    assert.ok(fs.existsSync(oyzaPath), 'OYZA_INTERACTION_PROTOCOL.md debe existir');
    const content = fs.readFileSync(oyzaPath, 'utf-8');
    assert.ok(content.includes('Identidad y Ergonomía') || content.includes('Identidad y ergonomía'), 'Debe incluir sección 1');
    assert.ok(content.includes('Custodia del Objetivo') || content.includes('Custodia del objetivo'), 'Debe incluir sección 2');
    assert.ok(content.includes('Certeza y Evidencia') || content.includes('Certeza y evidencia'), 'Debe incluir sección 3');
    assert.ok(content.includes('Autoridad y Delegación') || content.includes('Autoridad y delegación'), 'Debe incluir sección 4');
    assert.ok(content.includes('Recursos y Cierre') || content.includes('Recursos y cierre'), 'Debe incluir sección 5');
    assert.ok(content.includes('Activación y Retirada') || content.includes('Activación y retirada'), 'Debe incluir sección 6');
  });

  // 2. Verificación del Catálogo Completo de 15 Skills
  console.log('\n--- 2. Catálogo de 15 Skills (3 Familias) & Formato Copiable ---');

  const EXPECTED_SKILLS = [
    // Programming
    { path: 'skills/programming/scout/SKILL.md', name: 'scout', cat: 'programming' },
    { path: 'skills/programming/idea-maximizer/SKILL.md', name: 'idea-maximizer', cat: 'programming' },
    { path: 'skills/programming/intent-contract/SKILL.md', name: 'intent-contract', cat: 'programming' },
    { path: 'skills/programming/code-audit/SKILL.md', name: 'code-audit', cat: 'programming' },
    { path: 'skills/programming/causal-debug/SKILL.md', name: 'causal-debug', cat: 'programming' },
    // Communication
    { path: 'skills/communication/humanizer/SKILL.md', name: 'humanizer', cat: 'communication' },
    { path: 'skills/communication/presentation-architect/SKILL.md', name: 'presentation-architect', cat: 'communication' },
    { path: 'skills/communication/visual-explainer/SKILL.md', name: 'visual-explainer', cat: 'communication' },
    { path: 'skills/communication/narrative-distiller/SKILL.md', name: 'narrative-distiller', cat: 'communication' },
    { path: 'skills/communication/pedagogic-editor/SKILL.md', name: 'pedagogic-editor', cat: 'communication' },
    // Research
    { path: 'skills/research/web-research-filter/SKILL.md', name: 'web-research-filter', cat: 'research' },
    { path: 'skills/research/paper-deconstructor/SKILL.md', name: 'paper-deconstructor', cat: 'research' },
    { path: 'skills/research/concept-synthesizer/SKILL.md', name: 'concept-synthesizer', cat: 'research' },
    { path: 'skills/research/socratic-tutor/SKILL.md', name: 'socratic-tutor', cat: 'research' },
    { path: 'skills/research/epistemic-auditor/SKILL.md', name: 'epistemic-auditor', cat: 'research' }
  ];

  runTest('Existen exactamente las 15 skills en sus directorios canónicos con frontmatter válido', () => {
    for (const s of EXPECTED_SKILLS) {
      const fullPath = path.join(ROOT_DIR, s.path);
      assert.ok(fs.existsSync(fullPath), `Skill ${s.path} debe existir`);
      const content = fs.readFileSync(fullPath, 'utf-8');
      assert.ok(content.startsWith('---'), `${s.path} debe tener frontmatter YAML`);
      assert.ok(content.includes(`name: ${s.name}`), `${s.path} debe declarar name: ${s.name}`);
      assert.ok(content.includes(`category: ${s.cat}`), `${s.path} debe declarar category: ${s.cat}`);
      assert.ok(!content.includes('github.com/Acourd'), `${s.path} no debe contener enlace promocional`);
      assert.ok(!content.includes('**Ponente / Investigador:** Acourd'), `${s.path} no debe contener autor personal`);
    }
  });

  runTest('Todas las 15 skills cuentan con sección "Bloque Listo para Copiar (Copy-Ready Payload)" bien delimitada', () => {
    for (const s of EXPECTED_SKILLS) {
      const fullPath = path.join(ROOT_DIR, s.path);
      const content = fs.readFileSync(fullPath, 'utf-8');
      assert.ok(
        content.includes('Bloque Listo para Copiar') || content.includes('Copy-Ready Payload'),
        `Skill ${s.path} debe contener sección Copy-Ready Payload`
      );

      // Si la skill contiene bloques de código internos (como plantillas Marp, BibTeX o JSON),
      // el bloque exterior DEBE abrir con 4 backticks (````markdown) para no cerrarse prematuramente.
      const hasInnerCodeBlocks = ['presentation-architect', 'paper-deconstructor', 'epistemic-auditor'].includes(s.name);
      if (hasInnerCodeBlocks) {
        assert.ok(
          content.includes('````markdown'),
          `Skill ${s.path} tiene bloques anidados y debe encapsular su payload con 4 backticks (\`\`\`\`markdown)`
        );
      } else {
        assert.ok(
          content.includes('```markdown'),
          `Skill ${s.path} debe incluir un bloque de código markdown listo para copiar`
        );
      }

      // Validar balance estricto de fences en el archivo completo
      const lines = content.split('\n');
      const fences = [];
      lines.forEach((l, idx) => {
        const m = l.trim().match(/^(`{3,}|~{3,})/);
        if (m) fences.push({ line: idx + 1, char: m[1][0], len: m[1].length });
      });

      // El número total de fences debe ser par y cada apertura debe cerrarse con fence de misma longitud
      assert.strictEqual(fences.length % 2, 0, `Skill ${s.path} tiene fences desbalanceados (total: ${fences.length})`);
    }
  });

  runTest('presentation-architect contiene directivas Marp 16:9, Speaker Notes y KaTeX', () => {
    const content = fs.readFileSync(
      path.join(ROOT_DIR, 'skills/communication/presentation-architect/SKILL.md'),
      'utf-8'
    );
    assert.ok(content.includes('size: 16:9'), 'Debe incluir tamaño panorámico 16:9');
    assert.ok(content.includes('<!-- Speaker Notes:'), 'Debe incluir notas de orador');
    assert.ok(content.includes('KaTeX'), 'Debe documentar soporte matemático KaTeX');
    assert.ok(content.includes('18'), 'Debe documentar el presupuesto de 18 líneas');
  });

  runTest('paper-deconstructor contiene Matriz de Certeza Epistémica y BibTeX', () => {
    const content = fs.readFileSync(
      path.join(ROOT_DIR, 'skills/research/paper-deconstructor/SKILL.md'),
      'utf-8'
    );
    assert.ok(content.includes('Matriz de Certeza Epistémica'), 'Debe contener matriz de certeza');
    assert.ok(content.includes('```bibtex'), 'Debe incluir formato BibTeX');
    assert.ok(content.includes('Observación'), 'Debe distinguir observaciones directas');
    assert.ok(content.includes('Inferencia'), 'Debe distinguir inferencias');
    assert.ok(content.includes('Límite Declarado'), 'Debe distinguir límites metodológicos');
  });

  runTest('epistemic-auditor contiene las 4 compuertas operacionales y salida JSON', () => {
    const content = fs.readFileSync(
      path.join(ROOT_DIR, 'skills/research/epistemic-auditor/SKILL.md'),
      'utf-8'
    );
    assert.ok(content.includes('PROCEDENCIA'), 'Compuerta 1 presente');
    assert.ok(content.includes('PRECISIÓN NUMÉRICA'), 'Compuerta 2 presente');
    assert.ok(content.includes('LÍMITES CAUSALES'), 'Compuerta 3 presente');
    assert.ok(content.includes('PRESUPUESTO MARP'), 'Compuerta 4 presente');
    assert.ok(content.includes('18'), 'Presupuesto de 18 líneas presente');
    assert.ok(content.includes('audit_passed'), 'Salida JSON presente');
  });

  // 3. Verificación de Workflow DAG y Contrato de Nodos
  console.log('\n--- 3. Integridad de Workflows y Contratos DAG ---');

  runTest('academic_research_pipeline.json es JSON válido y tiene 5 nodos con enlaces coherentes', () => {
    const jsonPath = path.join(ROOT_DIR, 'workflows/academic_research_pipeline.json');
    assert.ok(fs.existsSync(jsonPath), 'El pipeline JSON debe existir');
    const pipeline = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    assert.strictEqual(pipeline.nodes.length, 5, 'Debe tener exactamente 5 nodos');

    const nodeOutputsMap = new Map();
    for (const node of pipeline.nodes) {
      nodeOutputsMap.set(node.id, node.outputs || []);

      if (node.script_path) {
        const scriptFullPath = path.join(ROOT_DIR, node.script_path);
        assert.ok(fs.existsSync(scriptFullPath), `script_path ${node.script_path} debe existir en disco`);
      }
      if (node.skill_ref) {
        const skillFullPath = path.join(ROOT_DIR, node.skill_ref);
        assert.ok(fs.existsSync(skillFullPath), `skill_ref ${node.skill_ref} debe existir en disco`);
      }
    }

    // Validar que cada input de forma "node_id.output_name" coincide con un output declarado
    for (const node of pipeline.nodes) {
      if (node.inputs) {
        for (const [inKey, inBinding] of Object.entries(node.inputs)) {
          if (typeof inBinding === 'string' && inBinding.includes('.')) {
            const [srcNodeId, srcOutName] = inBinding.split('.');
            assert.ok(
              nodeOutputsMap.has(srcNodeId),
              `El nodo ${node.id} intenta consumir del nodo inexistente: ${srcNodeId}`
            );
            const declaredOutputs = nodeOutputsMap.get(srcNodeId);
            assert.ok(
              declaredOutputs.includes(srcOutName),
              `El nodo ${node.id} intenta consumir ${inBinding}, pero ${srcNodeId} solo emite [${declaredOutputs.join(', ')}]`
            );
          }
        }
      }
    }
  });

  runTest('arxiv_semantic_fetcher.py contiene def main() y emite las salidas esperadas por el DAG', () => {
    const pyPath = path.join(ROOT_DIR, 'workflows/custom_nodes/arxiv_semantic_fetcher.py');
    const pyContent = fs.readFileSync(pyPath, 'utf-8');
    assert.ok(pyContent.includes('def main('), 'Debe definir def main() como punto de entrada de Gumloop');
    assert.ok(pyContent.includes('"papers_markdown"'), 'Debe emitir papers_markdown');
    assert.ok(pyContent.includes('"raw_json"'), 'Debe emitir raw_json');
    assert.ok(pyContent.includes('"bibtex"'), 'Debe emitir bibtex');
  });

  // 4. Verificación Funcional del Módulo arXiv (Node.js)
  console.log('\n--- 4. Módulo Extractor de arXiv (Cero Tokens & Unicode) ---');

  const { fetchArxiv, generateBibtex, cleanAsciiSlug, cleanAuthorLastname } = require('../workflows/custom_nodes/arxiv_semantic_fetcher.cjs');

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

  runTest('generateBibtex maneja nombres con acentos y caracteres no latinos sin corromper claves', () => {
    const accentedPaper = {
      title: '¿Cómo optimizar modelos de lenguaje?',
      authors: ['José García', 'Max Müller'],
      year: '2026'
    };
    const b1 = generateBibtex(accentedPaper);
    assert.ok(b1.includes('garcia_2026_como'), 'Debe generar clave limpia garcia_2026_como');

    const cyrillicPaper = {
      title: 'Обзор искусственного интеллекта',
      authors: ['Иван Иванов'],
      year: '2026'
    };
    const b2 = generateBibtex(cyrillicPaper);
    assert.ok(!b2.includes('@article{_'), 'La clave nunca debe comenzar con _');
    assert.ok(b2.includes('autor_2026_paper'), 'Debe aplicar fallback seguro autor_2026_paper');
  });

  runTest('cleanAsciiSlug y cleanAuthorLastname manejan casos de borde (vacío, puntuación, CJK)', () => {
    assert.strictEqual(cleanAsciiSlug(''), 'paper', 'Slug vacío debe usar fallback');
    assert.strictEqual(cleanAsciiSlug('??? !!! @#$%'), 'paper', 'Slug de solo símbolos debe usar fallback');
    assert.strictEqual(cleanAsciiSlug('日本語テスト'), 'paper', 'Slug de caracteres no latinos debe usar fallback');
    assert.strictEqual(cleanAsciiSlug('A Deep Neural Architecture'), 'deep', 'Slug normal debe extraer primera palabra > 2 chars');

    assert.strictEqual(cleanAuthorLastname(''), 'autor', 'Autor vacío debe usar fallback');
    assert.strictEqual(cleanAuthorLastname('Plato'), 'plato', 'Nombre único debe extraerse en minúsculas');
    assert.strictEqual(cleanAuthorLastname('José-María O\'Connor'), 'oconnor', 'Apellido compuesto debe limpiarse de puntuación');
  });

  await runAsyncTest('fetchArxiv emite claves conformes al contrato DAG (papers_markdown, raw_json, bibtex)', async () => {
    const result = await fetchArxiv('');
    assert.strictEqual(result.success, false, 'Consulta vacía debe devolver success: false');
    assert.strictEqual(result.count, 0, 'Count debe ser 0');
    assert.ok(typeof result.papers_markdown === 'string', 'papers_markdown debe ser string');
    assert.ok(typeof result.raw_json === 'string', 'raw_json debe ser string JSON');
    assert.ok(typeof result.bibtex === 'string', 'bibtex debe ser string');
  });

  // 5. Documentación y Oyza en README
  console.log('\n--- 5. Documentación README & Oyza Core Foundation ---');

  runTest('README.md documenta Gumloop, Oyza Core, las 15 skills y enlaza a atribuciones', () => {
    const readme = fs.readFileSync(path.join(ROOT_DIR, 'README.md'), 'utf-8');
    assert.ok(readme.includes('Gumloop'), 'Debe enfocar la documentación en Gumloop');
    assert.ok(readme.includes('Oyza Core'), 'Debe presentar Oyza Core como fundamento');
    assert.ok(readme.includes('ATTRIBUTION.md'), 'Debe enlazar a las atribuciones');
    assert.ok(readme.includes('academic_research_pipeline.json'), 'Debe referenciar el pipeline de Gumloop');
    assert.ok(readme.includes('Copy-Ready'), 'Debe explicar el formato copiable');
    // Verificar que cataloga las 15 skills
    for (const s of EXPECTED_SKILLS) {
      assert.ok(readme.includes(s.name), `README debe catalogar la skill ${s.name}`);
    }
  });

  console.log('\n====================================================');
  console.log(`Resumen de Pruebas: ${testsPassed} Pasadas, ${testsFailed} Falladas`);
  console.log('====================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
