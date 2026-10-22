---
name: academic-literature-grounding
description: "Analiza literatura científica y papers técnicos extrayendo evidencia empírica verificada, metodología, límites reconocidos y citas BibTeX estándar."
---

# Academic Literature Grounding & Evidence Extraction

Bienvenido a **Academic Literature Grounding**. Esta skill ayuda a investigadores, estudiantes y desarrolladores a desmenuzar artículos científicos con rigor metodológico. Separa lo que un estudio realmente midió de las deducciones teóricas del autor, erradicando citas inventadas o datos distorsionados.

---

## 🎯 1. Principio Fundamental: Rigor Epistémico (Oyza C11–C12)

Todo análisis bajo esta skill opera bajo una regla no negociable:
* **Tolerancia Cero a Citas Fantasma:** Si una afirmación no tiene respaldo identificable en el texto analizado (o un identificador DOI/arXiv real), se cataloga de forma explícita como `[HIPÓTESIS PENDIENTE]` o `[FUENTE NO VERIFICADA EN EL CONTEXTO]`.
* **Hechos vs. Opiniones:** Un dato medido en laboratorio o en producción no es equivalente a una conjetura del autor en la sección de discusión. El análisis debe preservar esa distinción.

---

## 🧭 2. El Flujo de Trabajo en 4 Pasos

Cuando el agente procesa un artículo o conjunto de papers (por ejemplo, desde el extractor de arXiv o un PDF cargado), ejecuta esta secuencia en una sola pasada para ahorrar créditos y tokens:

```
[Paper / Texto de Entrada]
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ 1. Anclaje de Metadatos: Título, autores, año, DOI/ID  │
├────────────────────────────────────────────────────────┤
│ 2. Fricción y Tesis: Problema que ataca y propuesta    │
├────────────────────────────────────────────────────────┤
│ 3. Matriz de Evidencia: Observación vs Inferencia      │
├────────────────────────────────────────────────────────┤
│ 4. Registro BibTeX y Límites: Citación lista y sesgos  │
└────────────────────────────────────────────────────────┘
```

### Categorías de la Matriz de Evidencia:
- **Observación Directa:** Cifras medidas, porcentajes de mejora, tamaños de muestra ($N$), benchmarks con nombres de dataset concretos y comparaciones directas.
- **Inferencia del Autor:** Razonamientos lógicos o extrapolaciones defendidas por el investigador que aún no cuentan con medición empírica directa.
- **Condiciones de Borde y Límites:** Supuestos bajo los cuales el método falla, restricciones de hardware o sesgos en el corpus analizado.

---

## 📦 3. Formato de Salida: Bloque Listo para Copiar

El agente debe estructurar su respuesta en un bloque delimitado limpio para que puedas copiar la síntesis completa con un solo clic o conectarla directamente al nodo de presentaciones:

```markdown
# [SÍNTESIS ACADÉMICA EVIDENCIADA]

## 1. Identificación y Metadatos
- **Título del Trabajo:** <Título completo y exacto>
- **Autores Principales:** <Autor 1, Autor 2 et al.>
- **Identificador:** <Enlace DOI o arXiv ID verificado / 'No disponible en el texto'>
- **Año y Sede:** <Año, Congreso / Revista o pre-print>

## 2. Pregunta de Investigación y Propuesta
- **El Problema:** <Qué cuello de botella o vacío teórico motiva el trabajo (2 oraciones directas)>
- **La Solución Propuesta:** <Enfoque técnico o metodológico planteado>

## 3. Matriz de Certeza Empírica
| Nivel Epistémico | Hallazgo o Afirmación Clave | Métrica / Soporte en el Texto |
| :--- | :--- | :--- |
| **Observación** | <Resultado cuantitativo medido> | <Párrafo, tabla o sección> |
| **Inferencia** | <Interpretación teórica del autor> | <Discusión / Conclusiones> |
| **Límite Declarado** | <Escenario donde el método decae> | <Sección de limitaciones> |

## 4. Corpus y Metodología
- **Tamaño de muestra / Corpus:** <ej. N = 15,000 imágenes, 42 repositorios>
- **Líneas de base (Baselines):** <Modelos o métodos contra los que se comparó>
- **Hardware o Costo Reportado:** <Tiempos de cómputo o presupuesto de recursos>

## 5. Entrada BibTeX (Copia Directa)
```bibtex
@article{clave_citacion_2026,
  title     = {<Título>},
  author    = {<Autores separados por 'and'>},
  year      = {<Año>},
  journal   = {<Sede o arXiv>},
  url       = {<URL verificada>}
}
```

## 6. Puntos Fuertes para una Presentación (Marp)
- [Diapositiva 2 - Problema]: <Frase concisa con el problema>
- [Diapositiva 3 - Metodología]: <Resumen de la muestra y el baseline>
- [Diapositiva 4 - Hallazgo]: <La métrica de mayor impacto>
- [Diapositiva 5 - Límites]: <La condición de contorno más relevante>
```

---

## 💡 4. Consejos Prácticos para Investigadores

1. **Lectura Crítica Rápida:** Si tienes prisa, ve directamente a la sección *Matriz de Certeza Empírica*. Allí sabrás de inmediato si el paper ofrece evidencia replicable o si sus conclusiones dependen de supuestos frágiles.
2. **Uso con Varios Papers (Síntesis Comparativa):** Si proporcionas dos o más artículos, el agente generará una matriz combinada donde cada fila contrasta los hallazgos de cada autor respecto a la misma pregunta.
3. **Integración con Gestores Bibliográficos:** El bloque BibTeX generado es compatible con Zotero, Mendeley y documentos LaTeX en Overleaf sin requerir limpieza manual.

---

## 🤖 5. Configuración en Gumloop

Al crear un flujo en Gumloop:
1. Conecta la salida de tu nodo de búsqueda (por ejemplo, el script `arxiv_semantic_fetcher.py`).
2. Configura un **Agent Node** con el prompt:
   > *"Eres el especialista de Academic Literature Grounding. Procesa la literatura recibida, clasifica las afirmaciones en la matriz de certeza empírica, genera la entrada BibTeX y entrega el resultado usando el formato estándar listo para copiar."*
3. Pasa la salida generada directamente al agente de presentaciones `presentation-deck-architect`.
