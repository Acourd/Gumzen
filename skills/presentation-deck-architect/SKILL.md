---
name: presentation-deck-architect
description: "Diseña y compila presentaciones académicas profesionales en Marp Markdown (16:9, tema oscuro/claro, notas de orador integradas y soporte matemático), optimizadas para investigación y docencia."
---

# Presentation Deck Architect (Marp Engine)

Bienvenido a **Presentation Deck Architect**. Esta skill transforma notas de investigación, síntesis de artículos científicos o borradores técnicos en presentaciones académicas limpias, estructuradas y listas para proyectar usando **Marp Markdown**.

El formato generado es 100% estándar y compatible con:
- Extensión **Marp for VS Code** (vista previa y exportación con un clic a PDF, PPTX y HTML).
- **Marp CLI** (`npx @marp-team/marp-cli`).
- Plataformas de agentes como **Gumloop**, Dify o editores web compatibles con Marp/Slidev.

---

## 📋 1. Cómo Usar Esta Skill

Cuando interactúes con el agente o configures un nodo en Gumloop, sigue este flujo:

```
[Entrada: Texto o Resumen de Paper] 
                │
                ▼
  [Presentation Deck Architect]
                │
                ▼
┌────────────────────────────────────────────────────────┐
│  📦 BLOQUE DE COPIADO RÁPIDO (Marp Markdown Puro)       │
│  (Solo el código de diapositivas listo para tu editor) │
├────────────────────────────────────────────────────────┤
│  ℹ️ NOTAS PEDAGÓGICAS Y CONSEJOS PARA EL ORADOR         │
│  (Explicaciones complementarias y sugerencias de ritmo)│
└────────────────────────────────────────────────────────┘
```

> 💡 **Diseño sin fricción:** La salida siempre separa el bloque de código limpio del resto del mensaje. Así puedes pulsar el botón de copiar del bloque sin tener que borrar comentarios, enlaces promocionales ni firmas personales.

---

## 📐 2. Principios de Composición Visual

Para que una presentación académica sea clara y convincente ante un comité o audiencia:

1. **Una sola idea fuerza por diapositiva:** Evita párrafos densos. Cada lámina presenta una sola tesis, gráfico o tabla comparativa.
2. **Presupuesto de texto (Anti-desbordamiento):**
   - Máximo 5 o 6 viñetas por lámina.
   - Longitud por viñeta: entre 12 y 20 palabras.
   - Si un concepto requiere más espacio, divídelo en dos diapositivas consecutivas.
3. **Formato panorámico nativo (16:9):** Se incluye la directiva `size: 16:9` para pantallas modernas y proyectores actuales.
4. **Notas de orador con ritmo (`<!-- Speaker Notes -->`):** Cada diapositiva incluye notas con tiempo sugerido (ej. `[⏱️ 40 segundos]`) y puntos clave a verbalizar sin leer la pantalla.
5. **Paleta sobria y de alto contraste:** Tema oscuro balanceado por defecto (legible tanto en monitores como en salas iluminadas). Si prefieres fondo blanco, basta con cambiar un parámetro.

---

## 🗂️ 3. Las 6 Diapositivas Arquetípicas

Toda presentación técnica bien estructurada sigue este recorrido:

| N.º | Tipo de Diapositiva | Propósito |
| :---: | :--- | :--- |
| **1** | **Portada / Presentación** | Título, subtítulo, autor, afiliación y contexto de la sesión. |
| **2** | **Problema y Estado del Arte** | Qué fricción existe hoy y por qué importa resolverla. |
| **3** | **Metodología y Corpus** | Datos empíricos analizados, tamaño de muestra ($N$) y método. |
| **4** | **Hallazgos Clave y Métricas** | Resultados cuantitativos principales y comparación con baselines. |
| **5** | **Límites y Condiciones de Borde** | Honestidad metodológica: dónde falla el enfoque y qué queda abierto. |
| **6** | **Conclusiones y Próximos Pasos** | Síntesis final con tareas concretas y verificables. |

---

## 📦 4. Plantilla Maestra Copiable (Marp 16:9)

A continuación tienes la estructura exacta que el agente genera. Puedes copiarla directamente en un archivo con extensión `.md`:

```markdown
---
marp: true
theme: gaia
_class: lead
paginate: true
size: 16:9
backgroundColor: #0f141c
color: #e6edf3
style: |
  section {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    padding: 40px 60px;
  }
  h1 {
    color: #58a6ff;
    font-size: 1.85em;
  }
  h2 {
    color: #79c0ff;
    font-size: 1.35em;
    border-bottom: 1px solid #30363d;
    padding-bottom: 8px;
  }
  strong {
    color: #ffffff;
  }
  table {
    font-size: 0.72em;
    width: 100%;
    margin-top: 10px;
  }
  th {
    background-color: #161b22;
    color: #58a6ff;
  }
  td {
    border-color: #30363d;
  }
  blockquote {
    background: #161b22;
    border-left: 4px solid #58a6ff;
    color: #8b949e;
    font-style: italic;
    padding: 10px 16px;
    margin: 12px 0;
  }
  .tag {
    background: #1f6feb33;
    color: #58a6ff;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8em;
  }
  .alert {
    background: #d2992222;
    color: #d29922;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8em;
  }
---

# Título de la Investigación
### Subtítulo Descriptivo o Pregunta Central

**Ponente:** [Nombre del Autor / Ponente]  
**Institución:** [Universidad, Laboratorio o Equipo]  
**Fecha:** [Mes, Año]

<!-- Speaker Notes: 
[⏱️ 30 segundos]
Presenta el título de forma directa. Menciona en una frase qué motivó este estudio y qué responderemos en los próximos 10 minutos. Evita leer los créditos; enfócate en la relevancia de la pregunta.
-->

---

## 1. El Problema de Investigación

- **Contexto actual:** Los enfoques tradicionales asumen condiciones ideales que rara vez ocurren en entornos de producción.
- **Fricción observada:** El 68% de las fallas reportadas provienen de supuestos no verificados en la fase de ingesta.
- **Pregunta central:** ¿Es posible reducir la incertidumbre sin incrementar el costo computacional de manera exponencial?
- **Objetivo de la sesión:** Examinar la evidencia empírica obtenida tras 1,200 ejecuciones controladas.

<!-- Speaker Notes:
[⏱️ 60 segundos]
Deténte en la fricción observada. Explica por qué este cuello de botella afecta a la disciplina y cómo la pregunta central orienta todo el trabajo siguiente.
-->

---

## 2. Metodología y Fuentes Analizadas

| Fuente / Referencia | Enfoque Metodológico | Corpus / Muestra ($N$) | Métrica Principal |
| :--- | :--- | :---: | :--- |
| **Estudio Base (2025)** | Análisis observacional directo | $N = 1,200$ casos | Tasa de error bruto |
| **Modelo Propuesto** | Pipeline de doble compuerta | $N = 1,200$ casos | Precisión y costo |
| **Baseline de Control** | Heurística estándar abierta | $N = 400$ réplicas | Consumo de créditos |

> Criterio de selección: Artículos con código reproducible y datos abiertos publicados entre 2024 y 2026.

<!-- Speaker Notes:
[⏱️ 50 segundos]
Resalta el balance de la muestra. Aclara que no se seleccionaron casos favorables de forma arbitraria, sino un conjunto homogéneo y auditado.
-->

---

## 3. Hallazgos Empíricos Principales

1. **Reducción de Varianza <span class="tag">Observación</span>**
   - La tasa de falsos positivos disminuyó del **14.2% al 2.1%** ($p < 0.01$).
2. **Eficiencia de Recursos <span class="tag">Medición</span>**
   - El consumo medio pasó de 42 tokens/registro a **8.4 tokens/registro**.
3. **Punto de Inflexión Metodológico <span class="alert">Hallazgo</span>**
   - El filtrado determinista previo al LLM aportó el 80% de la ganancia de estabilidad.

<!-- Speaker Notes:
[⏱️ 75 segundos]
Esta es la diapositiva central de resultados. Dirige la mirada de la audiencia a la cifra del 2.1%. Explica que la mejora no vino de un modelo más grande, sino de estructurar mejor la entrada.
-->

---

## 4. Límites Epistémicos y Condiciones de Borde

- **Dependencia de la calidad del corpus:** El método asume textos en UTF-8 con marcado semántico; el rendimiento decae con escaneos OCR ruidosos.
- **Ventana temporal evaluada:** Las pruebas cubren literatura reciente; la extrapolación a textos históricos requiere calibración de vocabulario.
- **Cuestión abierta:** ¿Cómo escala la arquitectura cuando el número de fuentes simultáneas supera las 50 referencias?

> *"Reconocer con honestidad los límites del método es lo que otorga solidez a los resultados demostrados."*

<!-- Speaker Notes:
[⏱️ 60 segundos]
Presenta las limitaciones con total transparencia. Esto genera enorme credibilidad ante evaluadores y comités técnicos.
-->

---

## 5. Conclusiones y Próximos Pasos

- [x] **Hipótesis confirmada:** El pipeline determinista reduce costo y varianza sin degradar fidelidad.
- [x] **Entregable disponible:** Repositorio abierto con especificaciones y scripts reproducibles.
- [ ] **Validación en curso:** Pruebas de estrés en plataformas distribuidas con alta concurrencia.

### Síntesis para el Auditorio
> Una arquitectura bien acotada supera a un modelo sobredimensionado sin reglas de contención.

<!-- Speaker Notes:
[⏱️ 45 segundos]
Cierra con la frase de síntesis final y da paso a preguntas.
-->
```

---

## 🛠️ 5. Cómo Personalizar tu Presentación

### Cambiar a Tema Claro (Para imprimir o salas muy iluminadas)
En el bloque inicial de directivas, cambia las dos líneas de color:
```markdown
backgroundColor: #ffffff
color: #1f2328
```
Y ajusta el color de encabezados `h1, h2` a `#0969da`.

### Exportar a PDF o Diapositivas HTML
Si usas la extensión de VS Code:
1. Abre tu archivo `.md`.
2. Presiona `Ctrl + Shift + P` (o `Cmd + Shift + P` en Mac).
3. Escribe `Marp: Export Slide Deck...` y elige **PDF** o **HTML**.

Si usas la terminal con Node.js:
```bash
npx @marp-team/marp-cli presentacion.md --pdf --allow-local-files
```

---

## 🤖 6. Configuración en Nodos de Gumloop

Si integras esta skill en un agente de Gumloop:
- **Entrada:** Conecta la salida estructurada de `academic-literature-grounding`.
- **Instrucción de Sistema del Nodo:**
  > *"Actúa como Presentation Deck Architect. Transforma el resumen académico recibido en exactamente 5 a 6 diapositivas en Marp Markdown panorámico (16:9). Genera primero el bloque de copiado rápido con el código limpio de diapositivas y coloca al final las notas pedagógicas para el orador."*
- **Costo:** 1 sola llamada de modelo (1 a 2 créditos), manteniendo el flujo eficiente y económico.
