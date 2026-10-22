"""
ArXiv & Academic Metadata Fetcher para Gumloop Custom Python Node.

Propósito:
Consultar la API pública de arXiv y extraer metadatos estructurados (título, autores,
resumen, año, enlace directo al PDF, DOI y citas BibTeX) SIN consumir créditos de modelos de lenguaje (LLM).

Entradas de Gumloop:
- query (string): Término de búsqueda o identificador (ej: 'cs.AI' o 'transformer architecture')
- max_results (int): Número máximo de artículos (por defecto 3)

Salidas de Gumloop (Contrato DAG 2.0):
- papers_markdown (string): Bloque Markdown estructurado y listo para inyectar al agente de análisis
- raw_json (string): JSON canónico para almacenamiento o nodos posteriores
- bibtex (string): Bloque con todas las entradas BibTeX normalizadas y listas para exportar
"""

import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import json
import re
import unicodedata
from typing import Dict, Any, List

def clean_ascii_slug(text: str, fallback: str = "paper") -> str:
    """Extrae un slug seguro en ASCII a partir de un título."""
    if not text:
        return fallback
    normalized = unicodedata.normalize('NFKD', text)
    ascii_str = normalized.encode('ascii', 'ignore').decode('ascii')
    clean = re.sub(r'[^a-zA-Z0-9\s]', '', ascii_str).strip()
    words = [w for w in clean.split() if len(w) > 2]
    return words[0].lower() if words else fallback

def clean_author_lastname(author_name: str, fallback: str = "autor") -> str:
    """Extrae el apellido del autor limpio en ASCII."""
    if not author_name:
        return fallback
    parts = author_name.strip().split()
    raw_last = parts[-1] if parts else ""
    normalized = unicodedata.normalize('NFKD', raw_last)
    ascii_str = normalized.encode('ascii', 'ignore').decode('ascii')
    cleaned = re.sub(r'[^a-zA-Z0-9]', '', ascii_str).lower()
    return cleaned if cleaned else fallback

def generate_bibtex_entry(paper: Dict[str, Any]) -> str:
    """Genera una entrada BibTeX estándar y sanitizada para un artículo."""
    first_author_name = paper["authors"][0] if (paper.get("authors") and len(paper["authors"]) > 0) else ""
    first_author = clean_author_lastname(first_author_name, "autor")
    year = str(paper.get("year", "2026"))
    slug = clean_ascii_slug(paper.get("title", ""), "paper")
    
    cite_key = f"{first_author}_{year}_{slug}"
    authors_str = " and ".join(paper.get("authors", ["Anónimo"]))
    arxiv_id_clean = paper.get("arxiv_id", "").split("/")[-1]
    
    bib = [
        f"@article{{{cite_key},",
        f"  title     = {{{paper.get('title', 'Sin título')}}},",
        f"  author    = {{{authors_str}}},",
        f"  year      = {{{year}}},",
        f"  eprint    = {{{arxiv_id_clean}}},",
        f"  archivePrefix = {{arXiv}},",
        f"  primaryClass  = {{{paper.get('primary_category', 'cs.AI')}}},",
        f"  url       = {{{paper.get('arxiv_id', '')}}}"
    ]
    if paper.get("doi"):
        bib.append(f"  doi       = {{{paper['doi']}}},")
    bib.append("}")
    return "\n".join(bib)

def fetch_arxiv_papers(query: str, max_results: int = 3) -> Dict[str, Any]:
    """Consulta la API de arXiv y procesa los resultados estructurados."""
    clean_query = (query or "").strip()
    if not clean_query:
        return {
            "success": False,
            "error": "La consulta de búsqueda no puede estar vacía.",
            "count": 0,
            "papers": [],
            "papers_markdown": "Por favor especifica un tema de búsqueda válido.",
            "markdown": "Por favor especifica un tema de búsqueda válido.",
            "raw_json": "[]",
            "bibtex": ""
        }

    # Si no tiene prefijo específico (ti:, au:, etc.), buscar en todos los campos
    search_prefix = "" if any(clean_query.startswith(p) for p in ["all:", "ti:", "au:", "abs:", "cat:"]) else "all:"
    encoded_query = urllib.parse.quote(f"{search_prefix}{clean_query}")
    
    url = (
        f"https://export.arxiv.org/api/query?"
        f"search_query={encoded_query}&start=0&max_results={max_results}"
        f"&sortBy=relevance&sortOrder=descending"
    )
    
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Gumloop-Academic-Fetcher/2.1 (open academic workflow; contact: community)"}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=12) as response:
            xml_data = response.read().decode('utf-8')
    except Exception as e:
        err_msg = f"No se pudieron recuperar artículos para '{query}'. Detalle técnico: {str(e)}"
        return {
            "success": False,
            "error": f"Error conectando con la API de arXiv: {str(e)}",
            "count": 0,
            "papers": [],
            "papers_markdown": err_msg,
            "markdown": err_msg,
            "raw_json": "[]",
            "bibtex": ""
        }

    # Parseo del feed Atom con soporte para nodos mixtos itertext
    try:
        root = ET.fromstring(xml_data)
    except ET.ParseError as pe:
        return {
            "success": False,
            "error": f"Error al parsear respuesta XML de arXiv: {str(pe)}",
            "count": 0,
            "papers": [],
            "papers_markdown": "Respuesta XML no válida de arXiv.",
            "markdown": "Respuesta XML no válida de arXiv.",
            "raw_json": "[]",
            "bibtex": ""
        }

    namespace = {
        'atom': 'http://www.w3.org/2005/Atom',
        'arxiv': 'http://arxiv.org/schemas/atom'
    }
    
    papers: List[Dict[str, Any]] = []
    markdown_output = [f"## 📚 Artículos Recuperados de arXiv para: *{clean_query}*\n"]
    bibtex_entries = []

    for entry in root.findall('atom:entry', namespace):
        title_elem = entry.find('atom:title', namespace)
        title_raw = "".join(title_elem.itertext()) if title_elem is not None else ""
        title = re.sub(r'\s+', ' ', title_raw).strip() if title_raw else "Sin título"
        
        summary_elem = entry.find('atom:summary', namespace)
        summary_raw = "".join(summary_elem.itertext()) if summary_elem is not None else ""
        summary = re.sub(r'\s+', ' ', summary_raw).strip() if summary_raw else "Sin resumen disponible"
        
        published_elem = entry.find('atom:published', namespace)
        published = published_elem.text.strip() if (published_elem is not None and published_elem.text) else ""
        year = published[:4] if published else "2026"
        
        id_elem = entry.find('atom:id', namespace)
        arxiv_id = id_elem.text.strip() if (id_elem is not None and id_elem.text) else ""
        
        doi_elem = entry.find('arxiv:doi', namespace)
        doi = doi_elem.text.strip() if (doi_elem is not None and doi_elem.text) else ""
        
        category_elem = entry.find('arxiv:primary_category', namespace)
        primary_cat = category_elem.attrib.get('term', 'cs.AI') if category_elem is not None else 'cs.AI'

        authors = []
        for author in entry.findall('atom:author', namespace):
            name_elem = author.find('atom:name', namespace)
            if name_elem is not None and name_elem.text:
                authors.append(name_elem.text.strip())
        
        pdf_link = ""
        for link in entry.findall('atom:link', namespace):
            if link.attrib.get('title') == 'pdf' or link.attrib.get('type') == 'application/pdf':
                pdf_link = link.attrib.get('href', '')
                break
        
        paper_info = {
            "title": title,
            "authors": authors,
            "year": year,
            "arxiv_id": arxiv_id,
            "doi": doi,
            "pdf_link": pdf_link,
            "primary_category": primary_cat,
            "summary": summary
        }
        papers.append(paper_info)
        
        bib_entry = generate_bibtex_entry(paper_info)
        bibtex_entries.append(bib_entry)
        
        markdown_output.append(f"### 📄 {title} ({year})")
        author_display = ', '.join(authors[:4]) + (' et al.' if len(authors) > 4 else '')
        markdown_output.append(f"- **Autores:** {author_display if authors else 'No declarados'}")
        markdown_output.append(f"- **Categoría:** `{primary_cat}`")
        if doi:
            markdown_output.append(f"- **DOI:** [{doi}](https://doi.org/{doi})")
        markdown_output.append(f"- **arXiv ID:** [{arxiv_id}]({arxiv_id})")
        if pdf_link:
            markdown_output.append(f"- **Acceso PDF:** [Descargar documento completo]({pdf_link})")
        markdown_output.append(f"- **Síntesis del Resumen:** {summary[:420]}...\n")

    markdown_final = "\n".join(markdown_output)
    bibtex_final = "\n\n".join(bibtex_entries)
    raw_json_str = json.dumps(papers, indent=2, ensure_ascii=False)

    return {
        "success": True,
        "count": len(papers),
        "papers": papers,
        "papers_markdown": markdown_final,
        "raw_json": raw_json_str,
        "bibtex": bibtex_final,
        "markdown": markdown_final # compatibilidad hacia atrás
    }

def main(query: str, max_results: int = 3) -> Dict[str, Any]:
    """Punto de entrada estándar para el ejecutor de nodos Custom Python de Gumloop."""
    return fetch_arxiv_papers(query=query, max_results=max_results)

if __name__ == "__main__":
    result = main("multi-agent governance architecture", max_results=2)
    print(result["papers_markdown"])
    print("\n--- BIBTEX ---\n")
    print(result["bibtex"])
