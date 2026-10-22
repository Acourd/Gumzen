# Ingeniería de Agentes en Gumloop: Arquitectura, Equivalencias y Optimización por Créditos

> **Ubicación:** `docs/GUMLOOP_AGENT_ENGINEERING.md`  
> **Ámbito:** Guía técnica para desplegar agentes e instrucciones modulares en Gumloop minimizando consumo de créditos y garantizando fidelidad epistémica.

---

## 1. ¿Qué es Gumloop y Cómo Funciona su Arquitectura?

Gumloop es una plataforma híbrida de automatización basada en grafos acíclicos dirigidos (DAGs) diseñada específicamente para la era agéntica. A diferencia de plataformas iPaaS tradicionales como Zapier o Make (que dependen de reglas rígidas *if-this-then-that*), Gumloop combina dos paradigmas:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PARADIGMAS DE GUMLOOP                           │
├───────────────────────────────────┬────────────────────────────────────┤
│      1. WORKFLOWS (Flujos DAG)    │        2. AI AGENTS (Nodos Agente) │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Nodos deterministas fijos.      │ • Bucle iterativo con objetivo.    │
│ • Entradas -> Transformación ->   │ • Selección dinámica de tools.     │
│   Salida estructurada.            │ • Razonamiento contextual multi-   │
│ • Costo de créditos predecible.   │   paso guiado por instrucciones.   │
└───────────────────────────────────┴────────────────────────────────────┘
```

### Componentes Clave:
1. **Nodos Estándar y Scraping:** Nodos preconfigurados para web scraping (Firecrawl, Gumloop Browser), extracción de PDFs, YouTube Transcripts, y conectores a servicios (Google Drive, Slack, Notion).
2. **Nodos Custom Python:** Capacidad de ejecutar scripts Python en un entorno cerrado para parsing, formateo matemático o normalización de datos sin gastar llamadas de LLM.
3. **Soporte Nativo MCP (Model Context Protocol):** Integración mediante el estándar abierto MCP (`gumloop/gumloop-mcp`), permitiendo que el agente invoque servidores de herramientas externos con esquemas JSON normalizados.
4. **Instrucciones / Skills del Agente:** Los agentes operan bajo directivas en formato Markdown (`.md`). Aunque la interfaz del agente no ejecuta scripts locales dentro del prompt directamente, utiliza el Markdown como contrato de comportamiento estricto.

---

## 2. Comparativa y Equivalencias en el Ecosistema

| Característica | **Gumloop** | **Grok / Bots de X** | **Dify.ai / Coze** | **Relevance AI** |
| :--- | :--- | :--- | :--- | :--- |
| **Naturaleza** | Automatización DAG + Nodos Agente | Chatbot conversacional con herramientas | Orquestador de flujos y chatbots | Fuerza laboral de agentes B2B |
| **Control de Herramientas** | Granular (Browser, MCP, Python, APIs) | Automático opaco (Web search + Code interp) | Plugins y herramientas OpenAPI | Nodos de acción y herramientas visuales |
| **Modelo de Cobro** | **Créditos por nodo y paso** | Suscripción plana (X Premium+) | Auto-alojado o créditos SaaS | Créditos por ejecución de tarea |
| **Soporte de Código** | Nodos Python nativos con librerías | Sandbox Python temporal | Nodos de código Python/JS | Transformaciones de datos |
| **Inyección de Skills** | Bloques de instrucciones en Markdown | System prompt estático o Custom Instructions | YAML/DSL con Prompts estructurados | Instrucciones de agente y bases de datos |

### Equivalencia con Grok:
Los bots de Grok son esencialmente una interfaz de chat con un *system prompt* continuo y acceso heurístico a la búsqueda de X y la web. En cambio, Gumloop permite **desacoplar** la investigación del formateo final: puedes forzar a que el agente primero busque fuentes, valide DOIs mediante un nodo Python y solo entonces genere las diapositivas o el informe.

---

## 3. El Dilema del Consumo de Créditos: Por qué Evitar Bucles Agénticos Infinitos

En Gumloop, **cada paso de razonamiento de un agente, cada acción en el navegador y cada invocación a modelos frontera (Claude 3.5 Sonnet, GPT-4o) descuenta créditos**.

* **Antipatrón de Alto Costo:** Un agente autónomo con un objetivo abierto como *"investiga a fondo este tema en internet hasta encontrar 10 papers y haz una presentación"*. 
  * Puede ejecutar 15-25 iteraciones.
  * Consumirá entre 40 y 100 créditos por corrida.
  * Riesgo de atascarse en páginas irrelevantes o alucinar fuentes.

* **Patrón de Bajo Costo (Pipeline Determinista en 2 Fases):**

```
┌────────────────────────────────────────────────────────────────────────┐
│                   PIPELINE ÓPTIMO EN GUMLOOP (3-5 CRÉDITOS)            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    [Fase 1: Ingesta Determinista Sin Coste LLM]
    • Nodo 1: Input del Usuario (Tema o Enlace)
    • Nodo 2: Custom Python/Node Extractor de arXiv (0 créditos LLM, genera BibTeX)
                                    │
                                    ▼
    [Fase 2: Síntesis Epistémica y Presentación]
    • Nodo 3: LLM con "paper-deconstructor" (1 llamada)
    • Nodo 4: LLM con "presentation-architect" (1 llamada)
    • Nodo 5: LLM con "epistemic-auditor" (Compuerta adversarial final)
                                    │
                                    ▼
    [Salida]: Presentación Marp 16:9 + Dictamen de Certeza + Registro BibTeX
```

---

## 4. Estructura de Skills para Gumloop (`.md`)

Para que el modelo se adhiera fielmente a las directivas sin requerir ejecución local de scripts:

1. **Frontmatter Claro:** Propósito, entradas requeridas y formato exacto de salida.
2. **Invariantes Fail-Closed (Heredadas de Axkern/Oyza):** Prohibición explícita de citas ficticias; si un dato no tiene DOI o URL real verificable en el contexto recibido, se etiqueta como `[HIPÓTESIS / VERIFICACIÓN PENDIENTE]` (Principio de Certeza y Evidencia de Oyza Core).
3. **Estructura de Delimitadores:** Exigir respuestas en bloques delimitados (ej. ````marp ... ```` o JSON estructurado) para facilitar que los siguientes nodos del flujo consuman la información sin errores sintácticos.
