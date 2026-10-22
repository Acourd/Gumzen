# Gumloop Academic & Presentation Agent Suite

Bienvenido a la **Suite Académica y de Presentaciones para Gumloop**. Este proyecto reúne agentes modulares, scripts ligeros y plantillas de diapositivas diseñados para investigar artículos científicos, extraer evidencia verificada y compilar presentaciones profesionales en **Marp Markdown**, cuidando al máximo el consumo de créditos.

Todo el material es abierto, transparente y utilizable tanto dentro de la plataforma **Gumloop** como de forma independiente en tu editor local (**VS Code + Marp**).

---

## ⚡ 1. Inicio Rápido (En 3 Pasos)

No necesitas configurar sistemas complejos para empezar a aprovechar estas herramientas:

### Opción A: Uso Local (Sin Gumloop, 100% Gratuito)
1. **Recupera artículos de arXiv:**  
   Ejecuta el extractor local con Node.js (cero dependencias):
   ```bash
   node workflows/custom_nodes/arxiv_semantic_fetcher.cjs
   ```
2. **Genera tus diapositivas:**  
   Copia el resumen o tu propio texto y usa la plantilla de [`skills/presentation-deck-architect/SKILL.md`](skills/presentation-deck-architect/SKILL.md) en cualquier modelo o editor.
3. **Previsualiza y exporta a PDF:**  
   Instala la extensión **Marp for VS Code** o compila desde la terminal:
   ```bash
   npx @marp-team/marp-cli presentacion.md --pdf
   ```

### Opción B: Despliegue en Gumloop (Pipeline DAG)
1. Inicia sesión en [Gumloop.com](https://www.gumloop.com).
2. Crea un nuevo flujo e importa el blueprint [`workflows/academic_research_pipeline.json`](workflows/academic_research_pipeline.json).
3. Conecta el script de Python en el nodo de código y las instrucciones de `skills/` en los nodos de agente.
4. Ejecuta el pipeline: el flujo completo consume entre **3 y 5 créditos**.

---

## 🧭 2. ¿Por Qué Nace Esta Suite?

Al construir flujos de investigación asistidos por inteligencia artificial suelen aparecer dos problemas habituales:

1. **Gasto desmedido de créditos:** Un agente autónomo al que se le pide *"investiga en internet y hazme unas diapositivas"* suele entrar en bucles de navegación iterativos, consumiendo entre 40 y 100 créditos por ejecución. Esta suite implementa un **pipeline acotado en dos fases** con presupuesto controlado.
2. **Alucinación de citas y cifras:** Es frecuente que los modelos inventen referencias o magnifiquen porcentajes. Esta suite incorpora principios de calibración epistémica (**Protocolo Oyza C11–C16**): toda cifra debe tener respaldo directo en el texto de origen; de lo contrario, se cataloga como hipótesis abierta antes de llegar a la presentación.

---

## 🗂️ 3. Estructura del Proyecto

```text
Gumloop/
├── LICENSE                             <- Licencia abierta MIT
├── ATTRIBUTION.md                      <- Reconocimiento de fuentes e inspiraciones
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
├── tests/                              <- Pruebas automatizadas de integridad
│   └── suite_runner.cjs
│
└── docs/
    ├── GUMLOOP_AGENT_ENGINEERING.md    <- Arquitectura, créditos y comparativa
    └── NAMING_AND_ECOSYSTEM_SURVEY.md  <- Opciones de nomenclatura para GitHub
```

---

## 🛠️ 4. Las Tres Skills Académicas

Cada skill está diseñada con un bloque de **Copiado Rápido** limpio, sin firmas personales invasivas ni enlaces de autopromoción:

| Skill | Qué Entrada Recibe | Qué Entrega al Usuario |
| :--- | :--- | :--- |
| **`academic-literature-grounding`** | Texto o PDF de artículos de investigación. | Matriz de datos medidos vs inferencias del autor, límites metodológicos y bloque de citación BibTeX listo para exportar. |
| **`presentation-deck-architect`** | Resumen estructurado del paper o notas. | Presentación panorámica (16:9) en Marp Markdown de 5 a 6 diapositivas, tema oscuro equilibrado y notas completas para el orador (`<!-- Speaker Notes -->`). |
| **`fact-audit-and-certainty`** | Las diapositivas generadas frente al documento original. | Dictamen de auditoría en cuatro compuertas (procedencia, exactitud de cifras, causalidad y límites de líneas) con reporte en Markdown y JSON. |

---

## 💰 5. Tabla de Rendimiento y Costo en Gumloop

| Paradigma | Pasos de Razonamiento | Riesgo de Alucinación | Consumo Estimado |
| :--- | :---: | :---: | :---: |
| **Agente Abierto Tradicional** | 12 a 25 iteraciones | Alto (citas inventadas sin auditar) | 40 a 100 créditos |
| **Pipeline Acotado en 2 Fases (Esta Suite)** | 3 nodos determinados | 0% en datos auditados (Oyza Gate) | **3 a 5 créditos** |

---

## 🤝 6. Licencia y Atribución

Este repositorio está disponible bajo la [Licencia MIT](LICENSE). 

Agradecemos a los proyectos que sirvieron de inspiración para esta entrega:
* Al ecosistema [Marp](https://marp.app) y a **robonuggets** por los patrones de diseño en presentaciones Markdown.
* A **ngtiendong** por los flujos de desconstrucción de papers y prompt engineering para investigación.
* A la suite **Axkern** y al protocolo **Oyza C1–C16** por el marco de gobernanza determinista y calibración epistémica.

Consulta [`ATTRIBUTION.md`](ATTRIBUTION.md) para conocer la historia completa y el desglose de componentes originales desarrollados aquí. ¡Las contribuciones y sugerencias son bienvenidas!
