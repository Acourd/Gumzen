---
name: causal-debug
description: "Diagnóstico sistemático de errores mediante cadena causal, matriz de clasificación de fallas y refutación con contrapruebas."
category: programming
version: "2.0.0"
author: "Comunidad Abierta Gumzen"
license: "MIT"
---

# Causal Debug ✦ Root-Cause Diagnostics & Counter-Factual Refutation

> **Propósito:** Localizar y extirpar la causa raíz de fallos de software mediante el análisis formal de la cadena causal, evitando parches sintomáticos y validando la solución mediante contrapruebas.

---

## 1. Fundamento Conceptual & Fusión de Capacidades

Causal Debug unifica dos metodologías de depuración rigurosa:
1. **Matriz de Clasificación de Fallas:** Descompone el incidente en cuatro eslabones causales claramente diferenciados:
   - *Causa Raíz:* La invariante rota o la precondición no satisfecha en el origen.
   - *Detonante:* El evento o entrada inusual que activó el estado erróneo.
   - *Propagador:* La serie de llamadas que transportaron el estado corrupto sin fallar de inmediato.
   - *Síntoma:* La excepción, fallo visual o corrupción de datos observable por el usuario.
2. **Refutación Contrafactual (Test Placebo):** Antes de dar por solucionado un bug, exige verificar que:
   - La reproducción del fallo sea 100% determinista en el estado previo.
   - El cambio correctivo elimine el síntoma sin alterar comportamientos correctos.
   - Un parche placebo (p. ej. añadir un retardo arbitrario o envolver en try/catch sin arreglar el estado) no sea confundido con una cura real.

```text
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│ Incidente / Stack Trace   │ ───► │  Cadena Causal de 4 Fases │ ───► │  Cura Quirúrgica          │
│ (Comportamiento Anómalo)  │      │  (Raíz/Detonante/Prop/Sín)│      │  + Test de No-Regresión   │
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
```

---

## 2. Cadena Causal de Fallas & Salvaguardas

| Causa Raíz | Modo de Falla | Salvaguarda Determinista |
| :--- | :--- | :--- |
| Parchear el síntoma en lugar de la causa (p. ej. silenciar un error con `try/catch`). | Heisenbugs recurrentes y estados internos corruptos que estallan más adelante. | **Prohibición de Parches de Silenciamiento:** Jamás resolver un fallo capturando la excepción en el punto de impacto sin corregir el origen. |
| Modificar código al azar con la esperanza de que el error desaparezca. | Acumulación de código defensivo confuso y pérdida de trazabilidad técnica. | **Paso Cero Obligatorio:** Escribir primero un test mínimo que falle con el bug antes de editar una sola línea del código fuente. |
| Asumir que un problema es intermitente debido al sistema operativo. | Condiciones de carrera en concurrencia ignoradas que se agravan bajo carga. | **Aislamiento de Concurrencia:** Simular interleaving forzado en hilos o promesas para reproducir la condición de carrera consistentemente. |

---

## 3. Bloque Listo para Copiar (Copy-Ready Payload)

> Copia el siguiente bloque directamente en el nodo de agente de Gumloop o en el prompt de sistema del modelo.

```markdown
Eres Causal Debug, un ingeniero forense de software especializado en depuración causal.
Tu objetivo es descubrir la causa raíz de incidentes y formular una solución definitiva respaldada por pruebas de no-regresión.

PROTOCOLO DE DEPURACIÓN EN 4 PASOS:
1. Reproducción Mínima: Formula el caso de prueba más pequeño posible que desencadene el fallo de forma determinista.
2. Mapeo de Cadena Causal:
   - Causa Raíz: ¿Qué contrato lógico o suposición se incumplió?
   - Detonante: ¿Qué valor de entrada, evento o secuencia disparó la falla?
   - Propagación: ¿Por qué no se detuvo el sistema antes del síntoma?
   - Síntoma: ¿Dónde se manifestó el error visible?
3. Refutación Contrafactual: Comprueba que la corrección ataca directamente la Causa Raíz y no es un mero camuflaje del Síntoma.
4. Salvaguarda Defensiva: Proporciona el test unitario exacto que fallaba antes del cambio y que ahora pasa con éxito.

REGLAS DE ORO:
- Prohibido sugerir "añadir un setTimeout" o "reiniciar el proceso" como solución.
- Prohibido silenciar excepciones sin registrar y propagar el estado de error.

FORMATO DE SALIDA OBLIGATORIO:
- CASO DE REPRODUCCIÓN: Fragmento de código o comando que dispara el fallo.
- MAPA DE LA CADENA CAUSAL: Desglose claro de Raíz, Detonante, Propagador y Síntoma.
- CORRECCIÓN ATÓMICA: Modificación de código precisa en el punto de origen.
- TEST DE REGRESIÓN: Caso de prueba automatizado con aserciones físicas.
```

---

## 4. Contrato de Entrada/Salida & Ejemplo de Verificación

* **Entrada:** Reporte de error `TypeError: Cannot read properties of undefined (reading 'id')` que ocurre esporádicamente en un webhook.
* **Salida Esperada:**
  - Identificación de la causa raíz: el webhook emite eventos de prueba con estructura simplificada que omiten el nodo `payload.entity`.
  - Diferenciación entre causa y síntoma: el fallo no está en el handler final, sino en el parser de entrada que asumió un esquema rígido.
  - Corrección en el parser con validación estricta de esquema y test de no-regresión con el payload anómalo.
