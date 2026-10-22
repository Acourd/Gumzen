---
name: fact-audit-and-certainty
description: "Auditor epistémico y técnico para presentaciones y síntesis académicas. Verifica trazabilidad de datos, precisión numérica y sintaxis Marp antes de la entrega final."
---

# Fact Audit & Epistemic Certainty Gate (Oyza C11–C16)

Bienvenido a **Fact Audit & Certainty Gate**. Esta skill actúa como un control de calidad riguroso y constructivo. Antes de que expongas una presentación ante profesores, un congreso o tu equipo de trabajo, esta compuerta revisa cada dato, porcentaje y autor para asegurar que todo esté respaldado por los documentos de origen.

---

## 🛡️ 1. Las 4 Compuertas de Auditoría

El auditor compara el borrador final (las diapositivas en Marp o el informe) contra el material de referencia original a través de cuatro filtros independientes:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   COMPUERTAS DE AUDITORÍA ADVERSARIAL                  │
├────────────────────────────────────────────────────────────────────────┤
│ 1. PROCEDENCIA Y CITAS: ¿Toda afirmación existe en la fuente base?     │
│ 2. PRECISIÓN NUMÉRICA: ¿Los porcentajes y métricas son exactos?        │
│ 3. CAUSALIDAD VS CORRELACIÓN: ¿Se confunden hipótesis con hechos?      │
│ 4. INTEGRIDAD MARP: ¿Compila el código sin desbordar la pantalla?      │
└────────────────────────────────────────────────────────────────────────┘
```

### Detalle de cada compuerta:

1. **Procedencia y Atribución:** Detecta si el modelo inventó un autor, un paper inexistente o un enlace DOI roto. Si algo no está en las fuentes provistas, debe retirarse o marcarse como hipótesis abierta.
2. **Precisión Numérica:** Impide la inflación de datos (por ejemplo, transformar "58% de mejora" en "más del 80%" o calificar una muestra pequeña de 20 casos como "estudio masivo").
3. **Causalidad (Oyza C11):** Si dos eventos ocurrieron de forma simultánea, no se permite afirmar que uno causó el otro a menos que el estudio lo haya demostrado experimentalmente con grupo de control.
4. **Sintaxis y Límites Visuales en Marp:** Verifica que las diapositivas incluyan `size: 16:9`, que no superen las 6 viñetas por lámina y que cada diapositiva cuente con notas de orador (`<!-- Speaker Notes -->`).

---

## 🚦 2. Clasificación de Hallazgos y Acciones Correctivas

| Severidad | Tipo de Problema | Acción Automática |
| :---: | :--- | :--- |
| 🚨 **Bloqueante** | Cita inventada o autor alucinado | Se retira la cita y se marca `[Fuente requerida]`. |
| 🚨 **Bloqueante** | Cifra o porcentaje sin respaldo | Se corrige al valor exacto del texto base. |
| ⚠️ **Advertencia** | Afirmación causal no demostrada | Se suaviza a redacción correlacional o hipótesis. |
| ⚠️ **Advertencia** | Diapositiva con exceso de texto | Se sugiere dividir el contenido en dos láminas. |
| ℹ️ **Sugerencia** | Falta de notas de orador | Se añade propuesta de notas con tiempo estimado. |

---

## 📦 3. Formato de Entrega: Dictamen Listo para Copiar

El auditor entrega un informe ordenado con dos secciones: una legible para personas y otra en JSON para flujos automatizados de Gumloop.

### A. Dictamen Humano (Aprobado o Con Observaciones)

```markdown
### 📋 DICTAMEN DE AUDITORÍA EPISTÉMICA

- **Estado:** ✅ APROBADO (Exit Code 0)  *(o ⚠️ OBSERVACIONES DETECTADAS)*
- **Afirmaciones Auditadas:** 14 afirmaciones independientes.
- **Trazabilidad a Fuentes:** 100% de datos respaldados en el corpus.
- **Integridad Sintáctica Marp:** Conforme a especificación 16:9.

#### Resumen de Verificaciones:
- [x] Sin citas fantasma ni DOIs inventados.
- [x] Métricas numéricas coinciden exactamente con las fuentes base.
- [x] Distinción clara entre hechos observados e hipótesis teóricas.
- [x] Notas de orador incluidas en todas las diapositivas con tiempos estimados.

#### Correcciones Aplicadas (si hubo alguna):
1. **Diapositiva 3:** La métrica original indicaba "reducción del 14.2% al 2.1%". Se corrigió una redacción previa que generalizaba a "eliminación casi total".
```

### B. Salida JSON Estructurada (Para Nodos de Gumloop)

```json
{
  "audit_passed": true,
  "exit_code": 0,
  "metrics_audited": 14,
  "violations_found": 0,
  "corrections": [],
  "marp_syntax_valid": true,
  "speaker_notes_complete": true
}
```

---

## 🤖 4. Uso en Gumloop y Pipelines DAG

En un flujo de Gumloop, este nodo se coloca como compuerta final entre el generador de presentaciones (`presentation-deck-architect`) y la entrega al usuario:
- **Entrada 1 (`source_data`):** La síntesis de `academic-literature-grounding`.
- **Entrada 2 (`generated_slides`):** El código Markdown de `presentation-deck-architect`.
- **Comportamiento:** Si `audit_passed == true`, se entrega la presentación final lista para proyectar. Si es `false`, el flujo puede reinyectar las correcciones sugeridas para un ajuste inmediato.
