---
name: presentation-deck-architect
description: "Diseña y compila presentaciones académicas profesionales en Marp Markdown (16:9, notas de orador integradas, soporte KaTeX y diseño multi-columna). Opera en modo conversacional amigable o como nodo automatizado en Gumloop."
---

# Presentation Deck Architect (Marp Engine 2.1)

Hola. **Presentation Deck Architect** es tu colaborador para transformar artículos científicos, notas de investigación o resúmenes densos en presentaciones visualmente impecables usando **Marp Markdown**.

El objetivo es doble: ahorrarte tiempo de maquetación y asegurar que tu exposición ante un tribunal, congreso o equipo de trabajo tenga estructura sólida, ritmo medido y cero desbordamiento visual.

---

## 🤝 1. Cómo Interactúa Esta Skill Contigo

Esta skill está diseñada con un perfil cercano, amigable y flexible. Puede trabajar en dos modalidades:

### Modo A: Conversación Interactiva (Chat Directo)
Cuando le pides una presentación al agente en una conversación de chat, el flujo es colaborativo:
1. **Comprensión del contexto:** Si compartes un paper o un tema, el agente identifica la audiencia y el tiempo disponible.
2. **Propuesta ágil:** Si no especificas la duración, propone por defecto la **estructura académica estándar de 6 láminas**, pero te ofrece alternativas según tu necesidad:
   - **Charla Relámpago (Lightning Talk):** 3 a 4 diapositivas (3 a 5 minutos).
   - **Conferencia de Investigación:** 5 a 6 diapositivas (8 a 10 minutos).
   - **Seminario Técnico / Tesis:** 8 a 10 diapositivas (15 a 20 minutos).
3. **Entrega limpia:** Te presenta el código listo para proyectar y te explica brevemente qué decisiones de síntesis tomó.

### Modo B: Pipeline Automatizado (Nodo Gumloop)
Dentro de un flujo DAG de Gumloop, este nodo recibe el `structured_summary` de `academic-literature-grounding` y genera directamente el código Marp para el siguiente nodo de auditoría, consumiendo un único paso de modelo (1 a 2 créditos).

---

## 📦 2. El Contrato de Salida: Bloque Listo para Copiar

> 🎯 **Regla de Cero Fricción:** En cualquier cliente de chat o navegador, los bloques de código cuentan con un botón nativo de **"Copiar"**. 
> Para que no tengas que editar ni borrar nada antes de tu presentación, la salida del agente sigue estrictamente este orden:

```text
1. Saludo breve y contextualización (1 o 2 oraciones cálidas).
2. ┌────────────────────────────────────────────────────────┐
   │ ```markdown                                            │
   │ (SOLO el código puro de Marp Markdown)                 │
   │ (Frontmatter + Diapositivas + Speaker Notes)            │
   │ (Cero comentarios de chat, cero firmas ni enlaces)     │
   │ ```                                                    │
   └────────────────────────────────────────────────────────┘
3. Pie pedagógico (fuera del código):
   - Duración estimada de exposición.
   - 2 consejos prácticos para verbalizar las láminas.
   - Comando rápido para compilar a PDF o diapositivas HTML.
```

---

## 📐 3. Reglas de Arquitectura y Composición Visual

Para que las diapositivas no se recorten en pantalla ni fatiguen a la audiencia:

1. **Formato Panorámico Obligatorio (`size: 16:9`):** Todas las presentaciones se diseñan para pantallas anchas modernas y proyectores 1080p/4K.
2. **Presupuesto Tipográfico Máximo (18 Líneas):**
   En Marp 16:9, el espacio vertical utilizable equivale a unas 18 líneas de texto estándar. Para evitar desbordamientos:
   $$\text{Líneas Totales} = (\text{Viñetas} \times 2) + \text{Filas de Tabla} + \text{Líneas de Título} \le 18$$
   Si un concepto requiere más espacio, divídelo en dos láminas consecutivas (ej. *Metodología 1/2* y *Metodología 2/2*).
3. **Notas de Orador con Tiempo (`<!-- Speaker Notes -->`):**
   Cada lámina incluye notas con una estimación de tiempo (ej. `[⏱️ 45 segundos]`) y el mensaje clave que debes decir en voz alta, evitando leer literalmente lo proyectado.
4. **Soporte Matemático Nativo con KaTeX:**
   Marp soporta fórmulas matemáticas con `$formula$` (en línea) y `$$\text{ecuación}$$` (en bloque).

---

## 🎨 4. Paletas de Color Disponibles

Puedes pedirle al agente cualquiera de estos tres temas según el entorno de tu charla:

### Opción 1: Dark Tech (Por defecto)
Ideal para conferencias técnicas, salas con poca luz y lecturas prolongadas.
```yaml
backgroundColor: #0f141c
color: #e6edf3
```

### Opción 2: Minimalist White (Para imprimir o salas muy iluminadas)
```yaml
backgroundColor: #ffffff
color: #1f2328
```
Ajusta los títulos `h1, h2` a `#0969da` y los bordes de tabla a `#d0d7de`.

### Opción 3: Academic Slate (Azul institucional)
```yaml
backgroundColor: #0d1b2a
color: #e0e1dd
```
Ajusta los títulos a `#415a77` y resaltados a `#778da9`.

---

## 🗂️ 5. Las 6 Diapositivas Arquetípicas (Estructura de Conferencia)

| Lámina | Nombre | Contenido Clave | Duración Sugerida |
| :---: | :--- | :--- | :---: |
| **1** | **Portada** | Título conciso, subtítulo, autor, afiliación y fecha. | 30 s |
| **2** | **Problema y Fricción** | Qué falla hoy en el estado del arte y por qué importa. | 60 s |
| **3** | **Metodología y Corpus** | Datos empíricos, tamaño de muestra ($N$) y baseline de comparación. | 60 s |
| **4** | **Resultados y Hallazgos** | Métricas cuantitativas de mejora y contrastes clave. | 75 s |
| **5** | **Límites Epistémicos** | Dónde decae el método, supuestos y preguntas abiertas. | 60 s |
| **6** | **Conclusiones y Síntesis** | Takeaway principal y próximos pasos verificables. | 45 s |

---

## 💻 6. Plantilla Maestra Ejecutable (16:9 con Soporte KaTeX y Multi-Columna)

Esta es la plantilla base que el agente compila y adapta a tu tema. Puedes copiarla y probarla de inmediato en VS Code:

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
    padding: 38px 56px;
  }
  h1 {
    color: #58a6ff;
    font-size: 1.8em;
  }
  h2 {
    color: #79c0ff;
    font-size: 1.3em;
    border-bottom: 1px solid #30363d;
    padding-bottom: 6px;
  }
  strong {
    color: #ffffff;
  }
  table {
    font-size: 0.72em;
    width: 100%;
    margin-top: 8px;
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
    padding: 8px 14px;
    margin: 10px 0;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
  .tag {
    background: #1f6feb33;
    color: #58a6ff;
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 0.78em;
  }
  .metric {
    font-size: 1.4em;
    font-weight: bold;
    color: #3fb950;
  }
---

# Título del Estudio Científico
### Pregunta Central o Subtítulo Descriptivo

**Ponente:** [Nombre del Autor o Expositor]  
**Institución:** [Universidad, Laboratorio o Grupo de Estudio]  
**Sede / Fecha:** [Evento Académico, 2026]

<!-- Speaker Notes:
[⏱️ 30 segundos]
Presenta el trabajo en una sola frase orientada al impacto. Menciona qué problema concreto aborda la investigación y por qué la respuesta beneficia a la comunidad.
-->

---

## 1. El Problema en el Estado del Arte

- **Vacío identificado:** Los modelos actuales asumen consistencia completa en entradas no estructuradas.
- **Fricción empírica:** El 64% de las fallas en inferencia se originan en ambigüedades del preprocesamiento.
- **Pregunta de investigación:** ¿Es posible garantizar convergencia sin aumentar exponencialmente el costo computacional?
- **Objetivo de la sesión:** Examinar resultados sobre un corpus verificado de 1,200 ejecuciones.

<!-- Speaker Notes:
[⏱️ 60 segundos]
Enfoca la atención en la cifra del 64%. Explica que la motivación no es teórica sino un cuello de botella observable en sistemas en producción.
-->

---

## 2. Metodología y Muestra Evaluada

| Parámetro | Configuración Experimental | Grupo de Control |
| :--- | :--- | :--- |
| **Corpus analizado** | 1,200 registros estructurados | 400 muestras abiertas |
| **Arquitectura** | Pipeline acotado en dos fases | Agente iterativo estándar |
| **Métrica principal** | Tasa de error en recuperación ($E_{rec}$) | Latencia y consumo de créditos |
| **Presupuesto** | 3 a 5 créditos por ejecución | 40 a 100 créditos libres |

> Criterio de inclusión: Fuentes con código abierto y metadatos verificables publicadas entre 2024 y 2026.

<!-- Speaker Notes:
[⏱️ 50 segundos]
Subraya el contraste entre el grupo de control y la arquitectura evaluada. Aclara que las condiciones de prueba fueron idénticas para ambos grupos.
-->

---

## 3. Hallazgos Cuantitativos Principales

<div class="columns">
<div>

### Reducción de Error
- Tasa inicial: **14.2%**
- Con pipeline determinista: <span class="metric">2.1%</span>
- Reducción relativa: **85.2%** ($p < 0.01$)
- Comportamiento consistente en réplicas.

</div>
<div>

### Eficiencia Operativa
- Consumo medio: **4.2 créditos**
- Ahorro de recursos: **~90%** frente al baseline
- Tiempo medio de respuesta: **1.8 s**
- Formulación: $\mathcal{L}_{cost} = \alpha \cdot \text{tokens} + \beta \cdot \text{calls}$

</div>
</div>

<!-- Speaker Notes:
[⏱️ 75 segundos]
Esta es la lámina clave. Dirige la mirada de la audiencia a la columna izquierda con el 2.1% de error y luego a la derecha con el ahorro del 90%. Destaca que la ganancia viene del diseño del flujo, no de un modelo más caro.
-->

---

## 4. Límites Reconocidos y Casos de Borde

- **Restricción de idioma:** Las pruebas actuales evalúan textos en español e inglés; alfabetos no latinos requieren normalización previa.
- **Dependencia de la fuente:** Si la API del repositorio presenta alta latencia o cortes de red, el flujo debe degradar con caché local.
- **Área abierta:** Comportamiento del sistema ante colecciones que superan los 50 documentos simultáneos.

> *"La solidez metodológica reside en delimitar con exactitud dónde termina la evidencia y dónde inician los supuestos."*

<!-- Speaker Notes:
[⏱️ 60 segundos]
Expón las limitaciones con total naturalidad. Mostrar los bordes del método genera confianza ante evaluadores y abre la puerta a colaboraciones.
-->

---

## 5. Conclusiones y Próximos Pasos

- [x] **Hipótesis demostrada:** El control determinista de entradas reduce la varianza sin perjudicar la riqueza analítica.
- [x] **Herramienta disponible:** Repositorio público con plantillas y scripts reproducibles.
- [ ] **Siguiente etapa:** Evaluación con grafos de conocimiento distribuidos y pruebas de estrés concurrentes.

### Síntesis para Recordar
> La estructura previa al modelo aporta más certidumbre que diez iteraciones sin restricciones.

<!-- Speaker Notes:
[⏱️ 45 segundos]
Lee la síntesis final de forma pausada y abre formalmente el turno de preguntas del auditorio.
-->
```

---

## 🚀 7. Guía Práctica de Exportación y Proyección

Una vez que tengas tu archivo de diapositivas guardado (por ejemplo, `presentacion.md`):

1. **Previsualizar en VS Code:**
   Instala la extensión **Marp for VS Code**. Al abrir el archivo Markdown verás el botón de vista previa de diapositivas en la esquina superior derecha (`Ctrl + K, V`).
2. **Exportar a PDF con un clic:**
   Abre la paleta de comandos (`Ctrl + Shift + P`), escribe `Marp: Export Slide Deck...` y selecciona **PDF Document**.
3. **Exportar desde la terminal (Node.js):**
   ```bash
   npx @marp-team/marp-cli presentacion.md --pdf --allow-local-files
   ```
4. **Exportar a presentación web interactiva (HTML):**
   ```bash
   npx @marp-team/marp-cli presentacion.md -o index.html
   ```
