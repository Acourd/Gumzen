# Análisis de Nomenclatura y Ecosistema para Repositorios de Agentes

> **Ubicación:** `docs/NAMING_AND_ECOSYSTEM_SURVEY.md`  
> **Propósito:** Registrar cómo la comunidad estructura y nombra repositorios de frameworks para Gumloop, automatización de agentes y skills académicas antes de publicar en GitHub.

---

## 1. Patrones Observados en GitHub

Al auditar repositorios de la comunidad relacionados con Gumloop, Dify, Coze y kits de skills agénticas, se identifican 4 patrones dominantes:

### Patrón A: Orientado a la Plataforma (*Platform-First*)
* **Ejemplos en el ecosistema:** `gumloop-py`, `gumloop-templates`, `gumloop-recipes`, `gumloop-community-nodes`.
* **Ventaja:** Posicionamiento SEO inmediato para usuarios que busquen "Gumloop" en GitHub.
* **Inconveniente:** Si la plataforma evoluciona o se migran las skills a Dify o Claude Code, el nombre queda anclado.

### Patrón B: Orientado al Caso de Uso Académico (*Domain-First*)
* **Ejemplos en el ecosistema:** `academic-research-skills`, `scholar-flow`, `marp-slides-agent`, `paper-to-deck`.
* **Ventaja:** Comunica de inmediato el valor (investigación, síntesis y diapositivas) independientemente del orquestador.
* **Inconveniente:** No deja claro de inicio si es para Gumloop, terminal o chat.

### Patrón C: Híbrido Funcional (*Framework / Toolkit*)
* **Ejemplos en el ecosistema:** `gumloop-academic-toolkit`, `gumloop-scholar-agent`, `gumloop-research-flows`.
* **Ventaja:** Combina la especificidad de Gumloop con la especialidad académica.

### Patrón D: Soberano / Firma de Autor (*Ecosystem-Branded*)
* **Ejemplos en el ecosistema:** `Axion-Gumloop`, `Acourd-Research-Engine`, `Oyza-Scholar-Flow`.
* **Ventaja:** Se conecta orgánicamente con tu filosofía de gobernanza (Axkern/Oyza) y estética unificada.

---

## 2. Propuestas de Nombres para el Repositorio

| Nombre Propuesto | Enfoque | Público Objetivo |
| **`gumzen-agent-suite`** | Rigor Epistémico & Ecosistema | Suite completa de 15 habilidades agénticas |
| **`scholar-agent-gumloop`** | Funcional / Modular | Automatización de papers y presentaciones |
| **`gumloop-deck-architect`** | Específico para Diapositivas | Conversión de investigación a Marp / Slides |
| **`oyza-gumloop-framework`** | Rigor Epistémico (Oyza Core) | Creación académica con rigor anti-falsos verdes |
| **`gumloop-research-pipeline`** | Orientado a Flujos DAG | Flujos de bajo costo por créditos |

---

## 3. Recomendación de Arquitectura de Carpetas

Mantener la estructura estandarizada de agentes para que cualquier usuario pueda importar o copiar las skills directamente:

```text
Gumloop/
├── core/
│   └── OYZA_INTERACTION_PROTOCOL.md   <- Contrato portable de interacción y certeza Oyza Core
├── skills/
│   ├── programming/                   <- scout, idea-maximizer, intent-contract, code-audit, causal-debug
│   ├── communication/                 <- humanizer, presentation-architect, visual-explainer, narrative-distiller, pedagogic-editor
│   └── research/                      <- web-research-filter, paper-deconstructor, concept-synthesizer, socratic-tutor, epistemic-auditor
├── workflows/                         <- Plantillas y JSONs para importar en Gumloop
│   └── custom_nodes/                  <- Scripts auxiliares para nodos sin coste LLM (Python/Node)
└── docs/                              <- Guías de optimización de créditos y arquitectura
```
