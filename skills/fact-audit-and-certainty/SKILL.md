---
name: fact-audit-and-certainty
description: "Auditor epistémico y técnico para presentaciones y síntesis académicas. Comprueba procedencia de datos, precisión numérica, límites causales y presupuesto de líneas en Marp antes de la entrega final."
---

# Fact Audit & Epistemic Certainty Gate (v2.1)

Hola. **Fact Audit & Certainty Gate** actúa como tu revisor técnico de confianza. Su labor es someter cualquier presentación o borrador académico a una auditoría rigurosa pero constructiva antes de que lo expongas ante un comité, congreso o clase.

La meta no es señalar errores por el simple hecho de criticar, sino garantizar que cada cifra, cada cita y cada lámina proyectada sea defendible con evidencia empírica sólida y sin riesgo de desbordamientos visuales.

---

## 🛡️ 1. Las 4 Compuertas de Auditoría Operacional

El auditor compara el borrador final contra el material original a través de cuatro compuertas independientes:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   LAS 4 COMPUERTAS DE AUDITORÍA EPISTÉMICA             │
├────────────────────────────────────────────────────────────────────────┤
│ 1. PROCEDENCIA Y ATRIBUCIÓN : ¿Cada afirmación existe en la fuente?    │
│ 2. PRECISIÓN NUMÉRICA       : ¿Los porcentajes y métricas son exactos? │
│ 3. LÍMITES CAUSALES (C11)   : ¿Se confunde correlación con causa?      │
│ 4. PRESUPUESTO MARP (16:9)  : ¿Compila el código sin recortar texto?   │
└────────────────────────────────────────────────────────────────────────┘
```

### Reglas Técnicas por Compuerta:

1. **Compuerta 1: Procedencia y Atribución:**
   - Detecta citas inventadas, autores alucinados o enlaces rotos.
   - Si una afirmación no está en el corpus proporcionado, se cataloga como `[Fuente requerida]` o se retira de la diapositiva.
2. **Compuerta 2: Exactitud Numérica:**
   - **Coincidencia exacta:** Si el paper indica "reducción del 14.2% al 2.1%", la diapositiva no puede generalizar a "desaparición casi total".
   - **Tolerancia:** Redondeos razonables (ej. "85% de reducción relativa") son aceptados siempre que se conserve el valor base exacto entre paréntesis.
3. **Compuerta 3: Límites Causales (Protocolo Oyza C11):**
   - Una correlación estadística o precedencia temporal no demuestra causalidad a menos que el estudio cuente con un diseño experimental con grupo de control.
   - Si no hay prueba causal directa, se corrige la redacción a términos correlacionales (*"se asocia con"*, *"se observa simultáneamente"*).
4. **Compuerta 4: Presupuesto Tipográfico Marp (Anti-Desbordamiento en 16:9):**
   - En una lámina panorámica con fuente estándar, el espacio vertical utilizable es de aproximadamente 18 líneas.
   - **Fórmula de verificación:**
     $$\text{Carga} = (\text{Viñetas} \times 2) + \text{Filas de Tabla} + \text{Encabezados} \le 18$$
   - Si la carga supera 18 líneas, la compuerta prescribe dividir el contenido en dos diapositivas consecutivas.
   - Verifica la presencia obligatoria de: `size: 16:9`, `paginate: true` y notas de orador con tiempo (`<!-- Speaker Notes: [⏱️ Xs] -->`).

---

## 🚦 2. Clasificación de Hallazgos y Acciones Correctivas

| Nivel de Riesgo | Problema Detectado | Acción del Auditor |
| :---: | :--- | :--- |
| 🚨 **Bloqueante** | Cita o DOI inexistente en la fuente | Se suprime la cita y se marca para revisión humana. |
| 🚨 **Bloqueante** | Cifra inflada o muestra distorsionada | Se reemplaza por el valor numérico exacto de la fuente. |
| ⚠️ **Advertencia** | Afirmación causal sin control experimental | Se suaviza a redacción correlacional o hipótesis. |
| ⚠️ **Advertencia** | Lámina que supera el presupuesto de 18 líneas | Se divide el contenido en Lámina A y Lámina B. |
| ℹ️ **Sugerencia** | Falta de notas de orador o tiempo estimado | Se añade la propuesta de notas con minutos sugeridos. |

---

## 📦 3. El Contrato de Salida: Bloque Listo para Copiar

> 💡 **Formato Limpio:** Para que el usuario o el flujo de Gumloop pueda consumir el resultado de inmediato:
> - Si se solicitó certificar la presentación, se entrega el bloque Markdown corregido y listo para proyectar.
> - A continuación se incluye el dictamen para el usuario y el JSON para el sistema.

### A. Dictamen Humano (Legible y Amigable)

```markdown
### 📋 Dictamen de Auditoría y Certificación

- **Resultado Global:** ✅ APROBADO (Exit Code 0)
- **Afirmaciones Auditadas:** 12 afirmaciones contra el corpus original.
- **Conformidad de Fuentes:** 100% de métricas trazables a datos de origen.
- **Presupuesto Tipográfico Marp:** Cumplido (máximo 14 líneas por lámina, 16:9).
- **Notas de Orador:** Presentes en el 100% de las láminas con tiempos sugeridos.

#### Ajustes Aplicados:
1. **Lámina 3:** Se corrigió la frase "eliminación completa de fallas" por el dato medido exacto: "reducción del 14.2% al 2.1%".
2. **Lámina 4:** Se dividió una viñeta densa en dos puntos claros para evitar desbordamiento visual.
```

### B. Salida JSON Estructurada (Para Nodos Condicionales en Gumloop)

```json
{
  "audit_passed": true,
  "exit_code": 0,
  "verdict": "CERTIFIED",
  "epistemic_score": 1.0,
  "checks": {
    "provenance_and_citations": { "passed": true, "violations": [] },
    "numerical_accuracy": { "passed": true, "violations": [] },
    "causality_boundaries": { "passed": true, "violations": [] },
    "marp_line_budget": { "passed": true, "max_lines_observed": 14, "limit": 18 },
    "speaker_notes_complete": { "passed": true, "coverage_percent": 100 }
  },
  "corrections_applied_count": 2
}
```

---

## 🤖 4. Integración en el Pipeline DAG de Gumloop

En el flujo `academic_research_pipeline.json`, este nodo se ubica al final:
- **Entrada 1 (`source_data`):** La síntesis estructurada de `academic-literature-grounding`.
- **Entrada 2 (`generated_slides`):** Las diapositivas generadas por `presentation-deck-architect`.
- **Salidas Emitidas:**
  - `final_certified_slides`: El código Marp listo para descargar o proyectar.
  - `audit_report`: El informe legible para el usuario.
  - `json_verdict`: El objeto JSON para validación programática.
