# Reconocimiento y Fuentes de Inspiración (Attribution & Provenance)

Este repositorio nace con el propósito de aportar herramientas abiertas, transparentes y útiles a la comunidad de investigadores, estudiantes y desarrolladores de automatizaciones agénticas.

Para garantizar total transparencia sobre el origen del código y las ideas, detallamos a continuación las fuentes primarias de inspiración, los proyectos de referencia y los aportes originales implementados en esta suite.

---

## 1. Proyectos y Autores de Referencia

### A. Ecosistema Marp y Patrones de Diapositivas
* **Proyecto Marp** ([marp.app](https://marp.app)) — Creado por Yuki Hattori bajo licencia MIT. Provee el compilador base de Markdown a presentaciones interactivas y documentos PDF.
* **robonuggets** — Por sus patrones abiertos de diseño para presentaciones técnicas en Marp y la estructuración de notas de orador integradas en las diapositivas.

### B. Síntesis y Grounding de Literatura Académica
* **ngtiendong** — Por sus flujos de trabajo sobre desconstrucción de artículos científicos y metodologías de investigación asistida por modelos de lenguaje.

### C. Gobernanza Epistémica y Arquitectura Determinista
* **Axkern Sovereign Suite & Protocolo Oyza Core** — Por el marco de calibración epistémica y certeza portable:
  - Distinción rigurosa entre **observación directa** (datos medidos) e **inferencia** (conclusiones del autor).
  - Tolerancia cero a citas inventadas o identificadores DOI alucinados.
  - Presupuesto estricto de recursos con contención de bucles abiertos.

---

## 2. Aportes Originales y Nuevas Capacidades Desarrolladas Aquí

A partir de los cimientos anteriores, este proyecto introduce innovaciones técnicas concretas para el ecosistema Gumloop y la comunidad abierta:

1. **Catálogo de 15 Habilidades de Alta Densidad (Copy-Ready):**
   Estructura 15 skills divididas en 3 familias (Programación, Comunicación y Comunicación Visual, e Investigación Epistémica) con bloques directamente copiables a nodos de agente.
2. **Pipeline en 2 Fases con Costo Predecible:**
   Sustituye los bucles agénticos abiertos por un flujo DAG predecible en dos etapas.
3. **Nodos de Extracción sin Consumo de LLM (`arxiv_semantic_fetcher`):**
   Scripts en Python y Node.js que consultan la API pública de arXiv, extraen metadatos verificados, generan citas BibTeX estándar con soporte para caracteres no latinos y preparan el corpus para los agentes con **cero costo de tokens**.
4. **Compuerta de Auditoría Epistémica Operacional (`epistemic-auditor`):**
   Un auditor adversarial que verifica cuatro dimensiones críticas antes de emitir una presentación: procedencia de datos, precisión numérica, límites causales y presupuesto tipográfico para evitar desbordamientos en pantalla (máximo 18 líneas por lámina 16:9).
5. **Formato "Copy-Ready Payload" (Copiado Rápido Limpio):**
   Plantillas modulares libres de enlaces promocionales o firmas personales invasivas, diseñadas para que cualquier usuario copie el resultado esencial en un solo clic y lo use directamente en sus conferencias o flujos de trabajo.

---

## 3. Licencia y Uso Comunitario

Todo el código y la documentación en este repositorio se distribuyen bajo la [Licencia MIT](LICENSE). Eres libre de usar, estudiar, adaptar y redistribuir este material en tus propios proyectos académicos, comerciales o de investigación.
