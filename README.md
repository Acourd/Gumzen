# Gumloop Academic & Presentation Agent Suite (v2.1)

Hola. Bienvenido a la **Suite Académica y de Presentaciones para Gumloop**. 

Este repositorio reúne tres agentes especializados, scripts ligeros y plantillas de diapositivas en **Marp Markdown** pensados para investigar artículos científicos, extraer evidencia verificada y compilar presentaciones claras y profesionales, cuidando al máximo el consumo de créditos.

Todo el contenido es de código abierto, transparente y está pensado para utilizarse tanto en la nube de **Gumloop** como en tu editor local (**VS Code + Marp**).

---

## ⚡ 1. Inicio Rápido (En 3 Pasos)

Puedes empezar a trabajar hoy mismo sin necesidad de configuraciones complicadas:

### Opción A: Uso Local (100% Gratuito y sin Servidores)
1. **Recupera artículos de investigación de arXiv:**  
   Ejecuta el extractor ligero con Node.js (cero dependencias externas):
   ```bash
   node workflows/custom_nodes/arxiv_semantic_fetcher.cjs
   ```
2. **Genera tus diapositivas:**  
   Copia el resumen obtenido y abre la plantilla de [`skills/presentation-deck-architect/SKILL.md`](skills/presentation-deck-architect/SKILL.md) en tu editor favorito.
3. **Previsualiza y exporta a PDF:**  
   Instala la extensión **Marp for VS Code** o compila directamente desde tu terminal:
   ```bash
   npx @marp-team/marp-cli presentacion.md --pdf
   ```

### Opción B: Despliegue en Gumloop (Flujo DAG Automatizado)
1. Inicia sesión en tu cuenta de [Gumloop.com](https://www.gumloop.com).
2. Crea un nuevo flujo e importa el archivo [`workflows/academic_research_pipeline.json`](workflows/academic_research_pipeline.json).
3. Conecta el script de Python en el nodo custom y las directivas de `skills/` en los tres nodos de agente.
4. Ejecuta el pipeline: el recorrido completo consume entre **3 y 5 créditos**.

---

## 💬 2. La Experiencia Interactiva y el Formato "Copy-Ready"

Cuando converses con un agente equipado con estas skills, notarás un diseño pensado para eliminar fricciones:

```text
Usuario: "Tengo este borrador de paper sobre agentes autónomos. ¿Me preparas una presentación de 6 láminas?"

Agente:  "Con gusto. Preparé una estructura de 6 láminas en tema oscuro panorámico (16:9),
         con notas de orador y presupuesto de texto para evitar desbordamientos:

         ┌────────────────────────────────────────────────────────┐
         │ ```markdown                                            │
         │ ---                                                    │
         │ marp: true                                             │
         │ size: 16:9                                             │
         │ ...                                                    │
         │ ```                                                    │
         └────────────────────────────────────────────────────────┘
         
         💡 Consejos para tu exposición:
         - Tiempo estimado total: 7 minutos.
         - En la lámina 3, subraya el contraste del baseline antes de pasar a la métrica.
         - Para exportar a PDF: npx @marp-team/marp-cli presentacion.md --pdf"
```

> 🎯 **El botón de copiar hace lo que esperas:** Al pulsar el botón de copiar del bloque de código, obtienes **únicamente** el código fuente de las diapositivas. Sin saludos de chatbot, sin firmas personales y sin enlaces de contacto que tengas que borrar a mano.

---

## 🧭 3. ¿Por Qué Nace Este Proyecto?

Al trabajar con modelos de lenguaje aplicados a la investigación académica suelen surgir dos cuellos de botella:

1. **Gasto descontrolado de créditos:** Un agente al que se le dice *"investiga en la web y diseña una presentación"* entra con frecuencia en bucles de navegación sin rumbo, consumiendo entre 40 y 100 créditos por corrida. Esta suite resuelve ese problema mediante un **pipeline acotado en dos etapas** con costo fijo.
2. **Citas y cifras alucinadas:** Los modelos tienden a inflar porcentajes o inventar identificadores DOI inexistentes. Esta suite incorpora principios de calibración epistémica (**Protocolo Oyza C11–C16**): toda afirmación debe rastrearse a una sección concreta de la fuente analizada; de lo contrario, se cataloga como hipótesis abierta antes de llegar a la lámina final.

---

## 🗂️ 4. Estructura del Repositorio

```text
Gumloop/
├── LICENSE                             <- Licencia abierta MIT
├── ATTRIBUTION.md                      <- Reconocimiento transparente de fuentes e inspiraciones
├── README.md                           <- Guía amigable de uso y bienvenida
│
├── core/
│   └── OYZA_INTERACTION_PROTOCOL.md    <- Protocolo de identidad, certeza y límites C1–C16
│
├── skills/
│   ├── academic-literature-grounding/  <- Extracción de evidencia empírica y citas BibTeX
│   │   └── SKILL.md
│   ├── presentation-deck-architect/    <- Compilador de diapositivas Marp 16:9 con notas
│   │   └── SKILL.md
│   └── fact-audit-and-certainty/       <- Auditor adversarial de procedencia y sintaxis
│       └── SKILL.md
│
├── workflows/
│   ├── academic_research_pipeline.json <- Blueprint DAG v2.0 para Gumloop
│   └── custom_nodes/                   <- Extractores de arXiv (Cero créditos LLM)
│       ├── arxiv_semantic_fetcher.py   <- Para el nodo Python en la nube de Gumloop
│       └── arxiv_semantic_fetcher.cjs  <- Para pruebas y uso local con Node.js
│
├── tests/                              <- Pruebas automatizadas de integridad física
│   ├── suite_runner.cjs
│   └── test_humanize_and_marp.cjs
│
└── docs/
    ├── GUMLOOP_AGENT_ENGINEERING.md    <- Arquitectura, créditos y comparativa con otros frameworks
    └── NAMING_AND_ECOSYSTEM_SURVEY.md  <- Opciones de nomenclatura para GitHub
```

---

## 🛠️ 5. Resumen de las Tres Skills Académicas

| Skill | Qué Entrada Recibe | Qué Entrega al Usuario |
| :--- | :--- | :--- |
| **`academic-literature-grounding`** | Texto o PDF de artículos de investigación. | Matriz de datos medidos vs inferencias del autor, límites metodológicos y bloque de citación BibTeX listo para exportar. |
| **`presentation-deck-architect`** | Resumen estructurado del paper o notas. | Presentación panorámica (16:9) en Marp Markdown de 5 a 6 diapositivas, tema oscuro equilibrado y notas completas para el orador (`<!-- Speaker Notes -->`). |
| **`fact-audit-and-certainty`** | Las diapositivas generadas frente al documento original. | Dictamen de auditoría en cuatro compuertas (procedencia, exactitud de cifras, causalidad y límites de líneas) con reporte en Markdown y JSON. |

---

## 💰 6. Comparativa de Rendimiento y Consumo en Gumloop

| Paradigma de Agente | Pasos de Razonamiento | Riesgo de Citas Fantasma | Consumo Estimado |
| :--- | :---: | :---: | :---: |
| **Bucle Agéntico Abierto** | 12 a 25 iteraciones | Alto (citas no verificadas) | 40 a 100 créditos |
| **Pipeline Acotado en 2 Fases (Esta Suite)** | 3 nodos determinados | 0% en datos auditados (Oyza Gate) | **3 a 5 créditos** |

---

## 🤝 7. Licencia y Reconocimiento Comunitario

Este proyecto es software libre distribuido bajo los términos de la [Licencia MIT](LICENSE).

Reconocemos con gratitud a las comunidades y proyectos abiertos que sirvieron como cimientos:
- A la comunidad de [Marp](https://marp.app) y a **robonuggets** por sus patrones de diseño para presentaciones técnicas en Markdown.
- A **ngtiendong** por sus investigaciones sobre desconstrucción de literatura científica y prompt engineering.
- Al ecosistema **Axkern** y al protocolo **Oyza C1–C16** por las pautas de certeza epistémica y control estricto de recursos.

Consulta [`ATTRIBUTION.md`](ATTRIBUTION.md) para conocer el desglose detallado de autoría y las innovaciones originales introducidas en este trabajo. Si encuentras formas de mejorar estas herramientas, los aportes y sugerencias de la comunidad son bienvenidos.
