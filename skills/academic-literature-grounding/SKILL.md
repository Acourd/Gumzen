---
name: academic-literature-grounding
description: "Analiza literatura científica y pre-prints extrayendo evidencia empírica verificada, metodología, límites reconocidos y citas BibTeX estándar. Compatible con artículos empíricos, teóricos y revisiones sistemáticas."
---

# Academic Literature Grounding & Evidence Extraction (v2.1)

Hola. **Academic Literature Grounding** es tu asistente especializado en desmenuzar artículos de investigación, pre-prints y reportes técnicos con rigor metodológico y calibración epistémica.

Su propósito fundamental es separar lo que un estudio midió directamente de las interpretaciones teóricas de sus autores, asegurando que tus presentaciones, revisiones de literatura o informes de investigación estén anclados en hechos verificables.

---

## 🧭 1. Cómo Opera Esta Skill

Esta herramienta se adapta según el canal en el que te encuentres:

### Modo Conversacional (Chat con el Usuario)
Al compartir uno o varios artículos (en texto, resumen o enlace de arXiv), el agente te ofrece tres formas de procesar la información:
1. **Síntesis Ejecutiva con Matriz de Certeza:** Para conocer rápidamente los hallazgos duros y sus límites.
2. **Matriz Comparativa Multi-Paper:** Si envías 2 o 3 artículos, contrasta sus enfoques metodológicos en una sola tabla.
3. **Alimentador para Diapositivas (Marp Feeder):** Extrae directamente los contenidos que alimentarán las 6 láminas de `presentation-deck-architect`.

### Modo Automatizado (Nodo Gumloop)
Recibe la entrada `papers_markdown` del nodo extractor (`arxiv_semantic_fetcher`), construye la síntesis certificada y emite `structured_summary` y `bibtex_registry` para el siguiente nodo del pipeline.

---

## 🎯 2. Principio Epistémico Fundamental (Oyza C11–C12)

La skill aplica tres reglas estrictas de calibración:

- **Tolerancia Cero a Citas Alucinadas:** Si un dato o afirmación no tiene respaldo explícito en el texto analizado (o un identificador DOI/arXiv verificable), se marca con la etiqueta `[HIPÓTESIS PENDIENTE DE FUENTE]`.
- **Nivel Epistémico Diferenciado:**
  - **Observación Directa:** Cifras experimentales, tamaños de muestra ($N$), porcentajes medidos y benchmarks cuantitativos.
  - **Inferencia del Autor:** Conclusiones, deducciones lógicas o perspectivas del autor en la sección de discusión que no han sido medidas de forma aislada.
  - **Límites y Condiciones de Borde:** Supuestos de partida, hardware empleado, sesgos de datos o escenarios donde el método pierde efectividad.
- **Tipología del Artículo:**
  - Si el estudio es **empírico**, se auditan muestras y métricas.
  - Si es **teórico o algorítmico**, se auditan teoremas, complejidades computacionales ($O(n)$) e invariantes lógicas.
  - Si es una **revisión o survey**, se auditan taxonomías y puntos de consenso frente a debates abiertos.

---

## 📦 3. El Contrato de Salida: Bloque Listo para Copiar

> 💡 **Formato Limpio:** Para que puedas copiar la síntesis completa con el botón del bloque de código y pegarla en tu gestor de notas (Obsidian, Notion, Logseq) o en tu editor LaTeX:

```text
1. Breve introducción amigable (1 o 2 oraciones).
2. ┌────────────────────────────────────────────────────────┐
   │ ```markdown                                            │
   │ # SÍNTESIS ACADÉMICA EVIDENCIADA                       │
   │ (Metadatos + Matriz de Certeza + Corpus + BibTeX)      │
   │ (Feeder para diapositivas 1 a 6)                       │
   │ ```                                                    │
   └────────────────────────────────────────────────────────┘
3. Pie pedagógico (fuera del código):
   - 2 sugerencias de lectura crítica sobre las debilidades del paper.
   - Enlace o recordatorio de compatibilidad con Zotero/Overleaf.
```

---

## 📄 4. Plantilla Estándar Copiable (Formato Unificado)

```markdown
# Síntesis Académica y Matriz de Certeza

## 1. Identificación y Procedencia
- **Título:** <Título completo del artículo>
- **Autores:** <Primer autor et al. o lista completa>
- **Identificador:** <arXiv ID o DOI con enlace verificable / 'No declarado'>
- **Año y Sede:** <Año de publicación, revista, congreso o pre-print>
- **Tipo de Trabajo:** [Empírico Experimental | Teórico Algorítmico | Revisión Sistemática]

## 2. Pregunta de Investigación y Tesis
- **Problema de origen:** <Qué fricción o vacío metodológico busca resolver el trabajo>
- **Solución planteada:** <Aporte técnico central introducido por los autores>

## 3. Matriz de Certeza Epistémica
| Nivel | Afirmación / Hallazgo Central | Respaldo en el Texto (Sección / Tabla) |
| :--- | :--- | :--- |
| **Observación** | <Resultado cuantitativo o experimento medido> | <Sección 4, Tabla 2> |
| **Inferencia** | <Interpretación teórica o extrapolación del autor> | <Sección 5, Discusión> |
| **Límite Declarado** | <Escenario donde el enfoque falla o decae> | <Sección 6, Limitaciones> |

## 4. Corpus, Baselines y Recursos
- **Muestra o Dataset ($N$):** <ej. N = 10,000 pares de secuencias, 5 benchmarks abiertos>
- **Modelos de Control (Baselines):** <Sistemas contra los cuales se compara>
- **Presupuesto Computacional:** <Hardware reportado, tiempo de cómputo o consumo>

## 5. Registro BibTeX (Normalizado)
```bibtex
@article{autor_2026_slug,
  title     = {<Título del Artículo>},
  author    = {<Autor 1 and Autor 2>},
  year      = {<Año>},
  eprint    = {<arXiv ID>},
  archivePrefix = {arXiv},
  primaryClass  = {<cs.AI>},
  url       = {<URL>}
}
```

## 6. Puntos Clave para Presentación (Marp Slide Feeder)
- **[Lámina 2 - Problema]:** <Frase directa resumiendo la fricción para la diapositiva 2>
- **[Lámina 3 - Metodología]:** <Resumen del corpus y baseline para la diapositiva 3>
- **[Lámina 4 - Resultados]:** <La métrica cuantitativa de mayor impacto para la diapositiva 4>
- **[Lámina 5 - Límites]:** <La condición de contorno más honesta para la diapositiva 5>
- **[Lámina 6 - Conclusión]:** <La síntesis final en una sola frase para la diapositiva 6>
```

---

## 📊 5. Plantilla para Análisis Comparativo Multi-Paper

Cuando procesas varios artículos sobre un mismo tema, el agente genera esta matriz combinada:

| Artículo y Año | Enfoque Metodológico | Corpus / Tamaño de Muestra | Métrica Central | Límite Reconocido |
| :--- | :--- | :--- | :--- | :--- |
| **Paper A (2025)** | Pipeline de 2 etapas | $N = 1,200$ ejecuciones | Error: **2.1%** | Solo texto en UTF-8 |
| **Paper B (2024)** | Agente iterativo abierto | $N = 400$ muestras | Consumo: **68 créditos** | Bucles no acotados |
| **Paper C (2026)** | Heurística híbrida | $N = 2,500$ registros | F1: **0.91** | Depende de API externa |

---

## 🛠️ 6. Recomendaciones para el Investigador

1. **Atención a la Matriz de Certeza:** Revisa siempre la fila de *Límite Declarado*. Ahí sabrás qué supuestos no están cubiertos por los autores antes de citar el trabajo en tu tesis o proyecto.
2. **Exportación Inmediata a Zotero o LaTeX:** El bloque BibTeX está pre-escapado y limpio de caracteres raros, listo para añadirse a tu archivo `.bib` sin generar errores de compilación.
3. **Flujo Natural hacia Diapositivas:** Los campos de la sección 6 conectan directamente con las láminas de `presentation-deck-architect`.
