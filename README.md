# Gumzen ✦ Academic Research & Presentation Suite for Gumloop

<p align="center">
  <strong>Turn scientific papers and research into grounded, verified Marp presentation decks using structured Gumloop workflows.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Gumloop-Workflow_Compatible-c53030?style=flat-square" alt="Gumloop Compatible" />
  <img src="https://img.shields.io/badge/Marp-16%3A9_Panoramas-0288d1?style=flat-square&logo=markdown" alt="Marp Slides" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />
  <img src="https://img.shields.io/badge/Epistemic_Rigor-Oyza_C11--C16-161b22?style=flat-square" alt="Oyza Protocol" />
</p>

---

## ⌗ Overview

**Gumzen** is a modular agent toolkit designed specifically for **[Gumloop](https://www.gumloop.com)**. It bridges the gap between unstructured academic literature and professional presentation slides.

Most AI agents struggle with academic tasks: when asked to "research a paper and build slides," unconstrained conversational agents tend to hallucinate fake citations, invent non-existent statistics, and wander into open-ended search loops.

Gumzen solves this through **bounded, decoupled workflow topology**:
1. **Zero-Token Literature Extraction:** Fetches verified papers and abstracts from public repositories (such as arXiv) via a native Python node, avoiding unconstrained LLM browsing.
2. **Empirical Fact Grounding:** Uses the `academic-literature-grounding` skill to split findings into observable evidence, author inferences, and explicit methodology limits.
3. **Copy-Ready Marp Decks:** Uses `presentation-deck-architect` to produce pure, widescreen 16:9 Marp Markdown slides with integrated speaker notes and typography budget controls.
4. **Epistemic Certainty Gate:** Employs `fact-audit-and-certainty` to reject hallucinated numbers or ghost DOIs before you present to an audience.

---

## 🔄 Gumloop Workflow Architecture

The suite is orchestrated around a 5-node directed acyclic graph (DAG) defined in [`workflows/academic_research_pipeline.json`](workflows/academic_research_pipeline.json):

```text
┌─────────────────┐      ┌───────────────────────────┐      ┌─────────────────────────────┐
│  1. USER INPUT  │ ───► │  2. CUSTOM PYTHON NODE    │ ───► │ 3. LITERATURE GROUNDING     │
│  (Topic / Link) │      │  (arXiv Metadata Fetcher) │      │    (Evidence Matrix & Bib)  │
└─────────────────┘      └───────────────────────────┘      └──────────────┬──────────────┘
                                                                           │
                                                                           ▼
┌─────────────────────────┐      ┌─────────────────────────────┐
│  5. FACT AUDIT GATE     │ ◄─── │ 4. PRESENTATION ARCHITECT   │
│  (Oyza Certainty Check) │      │    (16:9 Marp + Notes)      │
└─────────────────────────┘      └─────────────────────────────┘
```

---

## ⚡ Deployment & Setup Guides

<details>
<summary><b>🚀 How to Deploy on Gumloop (Click to expand)</b></summary>
<br>

Follow these steps to run the complete pipeline inside your Gumloop workspace:

1. **Log in to Gumloop:** Open [gumloop.com](https://www.gumloop.com) and navigate to your **Workflows** dashboard.
2. **Import the Pipeline:** Create a new flow and import [`workflows/academic_research_pipeline.json`](workflows/academic_research_pipeline.json).
3. **Configure Node 2 (Custom Python):**
   - Paste the code from [`workflows/custom_nodes/arxiv_semantic_fetcher.py`](workflows/custom_nodes/arxiv_semantic_fetcher.py).
   - Ensure the entry function is set to `main(query, max_results)`.
4. **Attach Agent Skills:**
   - For **Node 3**, copy the instructions from [`skills/academic-literature-grounding/SKILL.md`](skills/academic-literature-grounding/SKILL.md).
   - For **Node 4**, copy the instructions from [`skills/presentation-deck-architect/SKILL.md`](skills/presentation-deck-architect/SKILL.md).
   - For **Node 5**, copy the instructions from [`skills/fact-audit-and-certainty/SKILL.md`](skills/fact-audit-and-certainty/SKILL.md).
5. **Run & Inspect:** Provide a research topic (e.g., *"autonomous agent memory architectures"*). The workflow outputs certified Marp slides ready for projection.

<br>
</details>

<details>
<summary><b>💻 Local Testing & Standalone CLI (Click to expand)</b></summary>
<br>

You can also run and test every component locally without cloud dependencies:

1. **Fetch research papers using pure Node.js:**
   ```bash
   node workflows/custom_nodes/arxiv_semantic_fetcher.cjs
   ```
2. **Compile slides to PDF using Marp CLI:**
   ```bash
   npx @marp-team/marp-cli your-presentation.md --pdf
   ```
3. **Run deterministic test suites:**
   ```bash
   node tests/suite_runner.cjs
   node tests/test_humanize_and_marp.cjs
   ```

<br>
</details>

---

## 📦 The "Copy-Ready" Output Contract

When interacting with an agent running these skills, output formatting is designed around zero friction:

```text
User:  "Here is my research draft on agentic systems. Can you turn it into a 6-slide talk?"

Agent: "Here is your 6-slide deck formatted in 16:9 widescreen with speaker notes:

       ┌────────────────────────────────────────────────────────┐
       │ ```markdown                                            │
       │ ---                                                    │
       │ marp: true                                             │
       │ size: 16:9                                             │
       │ theme: gaia                                            │
       │ ...                                                    │
       │ ```                                                    │
       └────────────────────────────────────────────────────────┘
       
       💡 Speaker Notes Summary:
       - Estimated talk duration: 8 minutes.
       - Slide 3: Focus on the baseline gap before discussing your metrics.
       - To compile to PDF: npx @marp-team/marp-cli deck.md --pdf"
```

> 🎯 **One-Click Copy:** Clicking the native "Copy" button on the fenced block copies **only** valid, compiling Marp source code. No conversational fluff, no signatures, and no personal contact links to manually delete.

---

## 🛠️ The 3 Core Skills

| Skill | Primary Input | Concrete Deliverable |
| :--- | :--- | :--- |
| **[`academic-literature-grounding`](skills/academic-literature-grounding)** | Paper text or PDF context | Evidence matrix (observed facts vs. theoretical deductions), stated limits, and clean Unicode BibTeX citations. |
| **[`presentation-deck-architect`](skills/presentation-deck-architect)** | Structured research summary | 16:9 Marp presentation deck with KaTeX math (`$x^2$`), multi-column layout, and timed speaker notes. |
| **[`fact-audit-and-certainty`](skills/fact-audit-and-certainty)** | Generated slides vs. original text | 4-gate verification report (provenance, numeric accuracy, causal claim bounds, and $\le 18$ line typography limit). |

---

## 🗺️ Roadmap & Ecosystem Evolution

To expand Gumzen from a skill collection into a comprehensive knowledge engine, the following modules are planned:

1. **Automated Scheduled Digest (Gumloop Cron Node):**
   - Set up scheduled triggers that scan arXiv and PubMed weekly for specific keywords and compile an automated digest deck directly into a shared Google Drive folder.
2. **Multi-Format Export Connectors:**
   - Expand beyond Marp Markdown by adding native Gumloop integration with the **Google Slides API** and **Notion Database** blocks for instant multi-channel publication.
3. **Human-in-the-Loop Checkpoint:**
   - Introduce a Gumloop Approval / Form Node between literature extraction and slide generation, allowing researchers to refine key claims before slides are compiled.
4. **Cross-Engine Portability (MCP Server):**
   - Expose Gumzen skills as an open Model Context Protocol (MCP) server so that local tools (like Claude Code, Cursor, or Codex) can invoke the exact same academic pipelines.

---

## 🤝 Attribution & Open Source

Distributed under the **[MIT License](LICENSE)**.

This project builds upon the open-source work of the community:
- [Marp Team](https://marp.app) and **robonuggets** for Markdown slide design conventions.
- **ngtiendong** for research literature grounding patterns.
- The **Axkern** ecosystem and **Oyza C1–C16** protocol for epistemic certainty gates and anti-hallucination contracts.

Review [`ATTRIBUTION.md`](ATTRIBUTION.md) for full authorship and licensing details.

---

<details>
<summary><b>🇪🇸 Versión Completa en Español (Haz clic para expandir)</b></summary>
<br>

# Gumzen ✦ Suite Académica y de Presentaciones para Gumloop

### ⌗ Descripción General
**Gumzen** es un conjunto modular de herramientas agénticas diseñado específicamente para flujos de trabajo en **Gumloop**. Su propósito es transformar artículos de investigación y literatura científica en presentaciones profesionales de diapositivas en **Marp Markdown**, garantizando rigor epistémico y evitando alucinaciones.

### ⌗ Arquitectura Desacoplada
Para evitar que los modelos de lenguaje divaguen en bucles infinitos de búsqueda o inventen citas inexistentes, Gumzen organiza el flujo en etapas delimitadas:
1. **Extracción en Python nativo:** Consulta APIs como arXiv sin consumir tokens de LLM.
2. **Deconstrucción de fuentes:** Separa datos experimentales de deducciones teóricas del autor.
3. **Formateo Marp 16:9:** Genera diapositivas panorámicas con notas de orador integradas y control estricto de presupuesto de texto ($\le 18$ líneas por lámina).
4. **Compuerta de certeza (Oyza C11–C16):** Rechaza afirmaciones no respaldadas antes de la entrega final.

### ⌗ Formato "Copy-Ready"
Al pulsar el botón nativo de «Copiar» en el bloque de código, obtienes **únicamente** el código fuente limpio de las diapositivas. Sin textos de saludo, sin marcas personales ni enlaces invasivos que tengas que borrar antes de tu exposición.

### ⌗ Habilidades Principales
- **`academic-literature-grounding`:** Extracción empírica de metodología, muestras y citas BibTeX.
- **`presentation-deck-architect`:** Compilador de diapositivas Marp con soporte KaTeX y paletas sobrias.
- **`fact-audit-and-certainty`:** Auditor adversarial de procedencia y exactitud numérica.

Consulte [`ATTRIBUTION.md`](ATTRIBUTION.md) y [`LICENSE`](LICENSE) para los detalles completos de licencias abiertas y atribución.

<br>
</details>
