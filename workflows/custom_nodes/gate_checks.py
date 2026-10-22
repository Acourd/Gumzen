"""
Deterministic Gate Checks para Gumloop Custom Python Node.
Runtime: Python 3 nativo (solo biblioteca estándar). Cero dependencias externas.

Comprueba físicamente:
1. Directivas Marp 16:9 (marp: true, size: 16:9).
2. Presupuesto tipográfico: máximo 18 líneas visibles por diapositiva.
3. Cobertura de notas de orador (<!-- Speaker Notes: ... -->) con estimación de tiempo.
4. Procedencia numérica: cada cifra o porcentaje en las diapositivas debe existir en el texto primario.
5. Validación de citas: cada clave [@clave] debe existir en el registro BibTeX.
"""

import re
import json
from typing import Dict, Any, List

def check_marp_frontmatter(deck: str) -> Dict[str, Any]:
    has_marp = bool(re.search(r'^\s*marp:\s*true\b', deck, re.MULTILINE | re.IGNORECASE))
    has_16_9 = bool(re.search(r'^\s*size:\s*16:9\b', deck, re.MULTILINE | re.IGNORECASE))
    return {
        "valid": has_marp and has_16_9,
        "has_marp": has_marp,
        "has_16_9": has_16_9
    }

def split_slides(deck: str) -> List[str]:
    # Normalizar saltos de línea
    text = deck.strip()
    if text.startswith('---'):
        parts = re.split(r'\n---\s*\n', text)
        # La primera parte entre el primer y segundo --- es frontmatter
        if len(parts) > 1:
            return parts[1:]
        return []
    return re.split(r'\n---\s*\n', text)

def count_visible_lines(slide: str) -> int:
    # Eliminar notas de orador y estilos
    cleaned = re.sub(r'<!--[\s\S]*?-->', '', slide)
    cleaned = re.sub(r'<style>[\s\S]*?</style>', '', cleaned)
    lines = [line.strip() for line in cleaned.splitlines() if line.strip() and not line.strip().startswith('<!--')]
    return len(lines)

def check_slide_budgets(slides: List[str], max_allowed: int = 18) -> Dict[str, Any]:
    slide_details = []
    budget_passed = True
    notes_passed = True
    max_detected = 0

    for idx, slide in enumerate(slides, start=1):
        lines_count = count_visible_lines(slide)
        if lines_count > max_detected:
            max_detected = lines_count
        
        has_notes = bool(re.search(r'<!--\s*Speaker Notes:', slide, re.IGNORECASE))
        has_time = bool(re.search(r'\[⏱️[^\]]+\]', slide))

        if lines_count > max_allowed:
            budget_passed = False
        if not (has_notes and has_time):
            notes_passed = False

        slide_details.append({
            "slide_index": idx,
            "visible_lines": lines_count,
            "lines_passed": lines_count <= max_allowed,
            "has_notes": has_notes,
            "has_time_estimate": has_time
        })

    return {
        "budget_passed": budget_passed,
        "notes_passed": notes_passed,
        "max_lines": max_detected,
        "slides_count": len(slides),
        "details": slide_details
    }

def check_numeric_provenance(deck: str, primary_text: str) -> List[str]:
    if not primary_text:
        return []

    # Extraer porcentajes, decimales y enteros mayores o iguales a 10
    # Excluyendo el formato 16:9 de Marp y años canónicos comunes si no están en disputa
    raw_tokens = re.findall(r'\b(?:\d+(?:\.\d+)?%|\d+\.\d+\b|\d{2,}\b)', deck)
    
    # Filtrar tokens de sintaxis de Marp (16, 9)
    filtered = []
    for token in set(raw_tokens):
        if token in ("16", "9"):
            continue
        # Comprobar si el token numérico existe como subcadena en el texto primario
        if token not in primary_text:
            filtered.append(token)

    return sorted(filtered)

def check_bibtex_citations(deck: str, bibtex: str) -> List[str]:
    if not bibtex:
        return []

    # Extraer claves de la forma [@clave]
    cite_keys = re.findall(r'\[@([a-zA-Z0-9_\-]+)\]', deck)
    missing = []
    for key in set(cite_keys):
        pattern = rf'@\w+\{{\s*{re.escape(key)}\s*,'
        if not re.search(pattern, bibtex, re.IGNORECASE):
            missing.append(key)

    return sorted(missing)

def run_gate_checks(slides_markdown: str, primary_text: str = "", bibtex: str = "") -> Dict[str, Any]:
    frontmatter = check_marp_frontmatter(slides_markdown)
    slides = split_slides(slides_markdown)
    slide_eval = check_slide_budgets(slides, max_allowed=18)
    unverified_numbers = check_numeric_provenance(slides_markdown, primary_text)
    unverified_citations = check_bibtex_citations(slides_markdown, bibtex)

    overall_passed = (
        frontmatter["valid"] and
        slide_eval["budget_passed"] and
        slide_eval["notes_passed"] and
        len(unverified_numbers) == 0 and
        len(unverified_citations) == 0
    )

    # Construir reporte en Markdown para consumo humano
    md_lines = ["## 🛡️ Reporte Determinista del Gate (Exit Code 0 Verification)\n"]
    md_lines.append(f"- **Veredicto General:** {'✅ APROBADO' if overall_passed else '❌ CORRECCIONES REQUERIDAS'}")
    md_lines.append(f"- **Directivas Marp 16:9:** {'✅ Válido' if frontmatter['valid'] else '❌ Faltan directivas marp: true o size: 16:9'}")
    md_lines.append(f"- **Presupuesto Tipográfico:** {'✅ Pasó' if slide_eval['budget_passed'] else '❌ Diapositivas superan 18 líneas'} (Máximo detectado: {slide_eval['max_lines']} líneas)")
    md_lines.append(f"- **Cobertura de Notas de Orador:** {'✅ 100% con tiempo' if slide_eval['notes_passed'] else '❌ Faltan notas o estimación [⏱️] en diapositivas'}")
    
    if unverified_numbers:
        md_lines.append(f"- **⚠️ Cifras sin Procedencia en Texto Primario ({len(unverified_numbers)}):** {', '.join(unverified_numbers)}")
    else:
        md_lines.append("- **Procedencia Numérica:** ✅ 100% de cifras presentes en el texto primario.")

    if unverified_citations:
        md_lines.append(f"- **⚠️ Citas sin Entrada en BibTeX ({len(unverified_citations)}):** {', '.join(unverified_citations)}")
    else:
        md_lines.append("- **Registro de Citas:** ✅ Todas las citas cuentan con entrada BibTeX.")

    gate_report_md = "\n".join(md_lines)

    result = {
        "gate_passed": overall_passed,
        "marp_valid": frontmatter["valid"],
        "line_budget_passed": slide_eval["budget_passed"],
        "max_lines": slide_eval["max_lines"],
        "notes_passed": slide_eval["notes_passed"],
        "slides_count": slide_eval["slides_count"],
        "unverified_numbers": unverified_numbers,
        "unverified_citations": unverified_citations,
        "gate_report_markdown": gate_report_md,
        "gate_report_json": json.dumps({
            "gate_passed": overall_passed,
            "marp_valid": frontmatter["valid"],
            "line_budget_passed": slide_eval["budget_passed"],
            "max_lines": slide_eval["max_lines"],
            "notes_passed": slide_eval["notes_passed"],
            "unverified_numbers_count": len(unverified_numbers),
            "unverified_citations_count": len(unverified_citations)
        }, indent=2)
    }

    return result

# Punto de entrada estándar para Gumloop Python Node
def main(slides_markdown: str, primary_text: str = "", bibtex: str = "") -> Dict[str, Any]:
    return run_gate_checks(slides_markdown, primary_text, bibtex)

if __name__ == "__main__":
    sample_deck = """---
marp: true
size: 16:9
theme: gaia
---
# Test Slide
- Point 1 with 42%
- Point 2
<!-- Speaker Notes: [⏱️ 45s] Say this loud. -->
"""
    res = main(sample_deck, primary_text="Baseline improved by 42% in trials.")
    print(res["gate_report_markdown"])
