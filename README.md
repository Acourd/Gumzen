# Gumzen ✦ Epistemic Agent Suite for Gumloop

<p align="center">
  <strong>15 production-ready, copy-paste agent skills powered by the Oyza Core certainty protocol. Built for research, programming, and visual communication in Gumloop workflows.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Gumloop-Ready-c53030?style=flat-square" alt="Gumloop Compatible" />
  <img src="https://img.shields.io/badge/Skills-15_Cataloged-0969da?style=flat-square" alt="15 Skills" />
  <img src="https://img.shields.io/badge/Protocol-Oyza_Core-161b22?style=flat-square" alt="Oyza Core Protocol" />
  <img src="https://img.shields.io/badge/Marp-16%3A9_Slides-0288d1?style=flat-square&logo=markdown" alt="Marp Slides" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />
</p>

---

## ✦ The Foundation: Oyza Core

Every agent in Gumzen runs under the behavioral guardrails of [**Oyza Core**](core/OYZA_INTERACTION_PROTOCOL.md) — a portable contract for human-agent interaction and epistemic calibration:

- **Strict Evidence Calibration:** Differentiates reported claims, direct physical measurements, logical inferences, and unproven hypotheses.
- **Goal Custody:** Executes explicit objectives without substituting assumed goals, and asks clarifying questions only when trade-offs materially affect scope.
- **Zero Fluff & Zero Slop:** Eliminates sycophancy, synthetic polite preambles, and conversational filler.
- **Contained Authority:** An analysis does not authorize destructive mutations; all actions preserve explicit rollback paths.

---

## ⚡ How to Use in Gumloop (3-Step Setup)

You can run any Gumzen skill inside Gumloop in less than 60 seconds:

1. **Pick a Skill:** Browse the catalog below and open its `SKILL.md` file.
2. **Copy the Payload:** Scroll down to the **"Bloque Listo para Copiar (Copy-Ready Payload)"** section and click the native copy button.
3. **Paste into Gumloop:** In your Gumloop workflow canvas, drag an **AI Agent Node**, paste the payload into its **System Prompt / Instructions** field, and wire your input variables.

That is all. The agent executes with calibrated boundaries, producing clean Markdown, JSON verdicts, or Marp slide decks without conversational clutter.

---

## 🗂️ The 15 Specialized Skills Catalog

The suite is divided into three focused domains with airtight boundaries:

### 1. Programming & Architecture (`skills/programming/`)

| Skill | Primary Focus | Concrete Deliverable |
| :--- | :--- | :--- |
| [**`scout`**](skills/programming/scout/SKILL.md) | Clean-room reconnaissance | Isolates the essential 5% algorithm, discarding 95% framework bloat while analyzing closed issues for hidden bugs. |
| [**`idea-maximizer`**](skills/programming/idea-maximizer/SKILL.md) | Multi-horizon exploration | Generates 3 tiered alternatives (Direct, Adjacent, Aspirational) bound to falsifiable verification milestones. |
| [**`intent-contract`**](skills/programming/intent-contract/SKILL.md) | Socratic intent capture | Resolves ambiguous prompts via at most 2 high-leverage A/B/C trade-off queries and locks non-goals. |
| [**`code-audit`**](skills/programming/code-audit/SKILL.md) | Adversarial static review | Inspects diffs across 4 lenses: resource lifecycles, race conditions, AST idioms, and security boundaries. |
| [**`causal-debug`**](skills/programming/causal-debug/SKILL.md) | Root-cause diagnostic | Separates root causes from surface symptoms using counter-factual placebo tests and regression suites. |

### 2. Communication & Visual Synthesis (`skills/communication/`)

| Skill | Primary Focus | Concrete Deliverable |
| :--- | :--- | :--- |
| [**`humanizer`**](skills/communication/humanizer/SKILL.md) | Cadence & anti-slop editing | Enforces natural syntactic variation ($\sigma^2 \ge 6.0$, $CV \ge 0.25$) while purging synthetic AI clichés. |
| [**`presentation-architect`**](skills/communication/presentation-architect/SKILL.md) | Widescreen Marp slide decks | Generates 16:9 Marp presentations with KaTeX math, a strict 18-line vertical budget, and timed speaker notes. |
| [**`visual-explainer`**](skills/communication/visual-explainer/SKILL.md) | Spatial mental models | Translates complex flows into pure terminal ASCII blueprints and rendered GitHub Mermaid diagrams. |
| [**`narrative-distiller`**](skills/communication/narrative-distiller/SKILL.md) | BLUF executive briefings | Compresses long threads and reports into 2-sentence conclusions with exact metrics and reversible next steps. |
| [**`pedagogic-editor`**](skills/communication/pedagogic-editor/SKILL.md) | Instructional scaffolding | Balances cognitive load through 3 stages: intuitive physical anchor, minimal runnable skeleton, and edge cases. |

### 3. Research & Epistemic Governance (`skills/research/`)

| Skill | Primary Focus | Concrete Deliverable |
| :--- | :--- | :--- |
| [**`web-research-filter`**](skills/research/web-research-filter/SKILL.md) | Noise & SEO scrubbing | Triangulates claims across $\ge 2$ independent primary sources while stripping content farms and sponsor bias. |
| [**`paper-deconstructor`**](skills/research/paper-deconstructor/SKILL.md) | Empirical paper dissection | Separates direct observations from author inferences and outputs normalized Unicode BibTeX citations. |
| [**`concept-synthesizer`**](skills/research/concept-synthesizer/SKILL.md) | Cross-domain isomorphisms | Uncovers formal mathematical and systemic equivalents across different vocabularies and disciplines. |
| [**`socratic-tutor`**](skills/research/socratic-tutor/SKILL.md) | Active discovery inquiry | Presents minimal counter-examples to challenge assumptions without unsolicited answers or patronizing lectures. |
| [**`epistemic-auditor`**](skills/research/epistemic-auditor/SKILL.md) | Pre-flight quality gate | Terminal 4-gate verification check (provenance, numeric accuracy, causal claim bounds, and line budgets). |

---

## 📦 Copy-Ready Output Contract

Every skill in Gumzen is engineered with a strict copy-ready boundary:

```text
User:   "Build a 6-slide Marp presentation explaining our distributed queue benchmark."

Agent:  "Here is your certified Marp presentation ready for projection:

        ┌────────────────────────────────────────────────────────┐
        │ ```markdown                                            │
        │ ---                                                    │
        │ marp: true                                             │
        │ size: 16:9                                             │
        │ theme: gaia                                            │
        │ ...                                                    │
        │ ```                                                    │
        └────────────────────────────────────────────────────────┘

        ⏱️ Presentation Duration: 8 minutes.
        💡 Speaker Tip: Focus on the throughput drop at Slide 3 before explaining the fix."
```

Clicking the native "Copy" button in your browser captures only clean, valid Markdown or JSON. No greetings, signatures, or promotional links are embedded in the generated artifacts.

---

## 🔄 Example Research Pipeline (Gumloop DAG)

The repository provides a complete 5-node workflow in [`workflows/academic_research_pipeline.json`](workflows/academic_research_pipeline.json):
1. **User Input:** Topic or arXiv research query.
2. **arXiv Fetcher (Python):** Retrieves verified metadata and abstracts without LLM token cost.
3. **Paper Deconstructor (Agent):** Extracts empirical evidence and builds a normalized BibTeX registry.
4. **Presentation Architect (Agent):** Compiles 16:9 Marp slides with speaker notes.
5. **Epistemic Auditor (Agent):** Inspects claims, numerical precision, and typographical limits before certifying.

---

## 🧪 Local Test Verification

You can verify the entire test suite locally:

```bash
npm test
```

This executes:
- `tests/suite_runner.cjs`: Validates file structures, DAG contracts, BibTeX generation, and all 15 skills.
- `tests/test_humanize_and_marp.cjs`: Audits prose cadence, burstiness ($\sigma^2 \ge 6.0$, $CV \ge 0.25$), anti-slop rules, and Marp syntax.

---

## 🤝 Attribution & Open Source

Distributed under the [MIT License](LICENSE).

Gumzen builds upon open work by the research and developer community:
- [Marp Team](https://marp.app) and **robonuggets** for Markdown slide design conventions.
- **ngtiendong** for academic literature deconstruction patterns.
- The **Axkern** ecosystem and **Oyza Core** for epistemic verification and interaction contracts.

See [`ATTRIBUTION.md`](ATTRIBUTION.md) for detailed provenance records.

---

<details>
<summary><b>🇪🇸 Resumen en Español (Haz clic para expandir)</b></summary>
<br>

# Gumzen ✦ Suite Agéntica Epistémica para Gumloop

### ⌗ Fundamento Oyza Core
Gumzen opera sobre el contrato de interacción y certeza **Oyza Core**, garantizando distinción rigurosa entre observaciones directas e inferencias, cero adulación, economía de recursos y verificación adversarial.

### ⌗ Catálogo de 15 Habilidades
- **Programación:** `scout`, `idea-maximizer`, `intent-contract`, `code-audit`, `causal-debug`.
- **Comunicación:** `humanizer`, `presentation-architect`, `visual-explainer`, `narrative-distiller`, `pedagogic-editor`.
- **Investigación:** `web-research-filter`, `paper-deconstructor`, `concept-synthesizer`, `socratic-tutor`, `epistemic-auditor`.

### ⌗ Formato Copiable
Cada habilidad contiene un bloque listo para pegar directamente en los nodos de agente de Gumloop sin comentarios iniciales ni firmas personales.

Consulte [`ATTRIBUTION.md`](ATTRIBUTION.md) y [`LICENSE`](LICENSE) para detalles completos.

<br>
</details>
