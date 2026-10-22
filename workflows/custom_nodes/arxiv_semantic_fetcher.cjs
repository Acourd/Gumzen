/**
 * arXiv & Academic Metadata Fetcher en Node.js nativo (Cero dependencias).
 * 
 * Propósito:
 * Permite probar localmente la extracción de arXiv sin costo de tokens,
 * generando resúmenes en Markdown y citas BibTeX válidas.
 * Compatible con Node.js >= 18.
 */

const https = require('https');

function generateBibtex(paper) {
  const firstAuthor = (paper.authors && paper.authors.length > 0)
    ? paper.authors[0].split(/\s+/).pop().replace(/[^a-zA-Z]/g, '').toLowerCase()
    : 'anon';
  
  const year = paper.year || '2026';
  const cleanTitleWords = (paper.title || '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3);
  const slug = (cleanTitleWords[0] || 'paper').toLowerCase();
  const citeKey = `${firstAuthor}_${year}_${slug}`;
  const authorsStr = (paper.authors && paper.authors.length > 0)
    ? paper.authors.join(' and ')
    : 'Anónimo';
  const arxivIdClean = (paper.id || '').split('/').pop();

  let lines = [
    `@article{${citeKey},`,
    `  title     = {${paper.title || 'Sin título'}},`,
    `  author    = {${authorsStr}},`,
    `  year      = {${year}},`,
    `  eprint    = {${arxivIdClean}},`,
    `  archivePrefix = {arXiv},`,
    `  primaryClass  = {${paper.primaryCategory || 'cs.AI'}},`,
    `  url       = {${paper.id || ''}}`
  ];
  if (paper.doi) {
    lines.push(`  doi       = {${paper.doi}},`);
  }
  lines.push('}');
  return lines.join('\n');
}

function fetchArxiv(query, maxResults = 3) {
  return new Promise((resolve, reject) => {
    const cleanQuery = (query || '').trim();
    if (!cleanQuery) {
      return resolve({
        success: false,
        error: 'La consulta no puede estar vacía.',
        count: 0,
        papers: [],
        markdown: 'Por favor proporciona una consulta válida.',
        bibtex: ''
      });
    }

    const searchPrefix = /^(all|ti|au|abs|cat):/.test(cleanQuery) ? '' : 'all:';
    const encodedQuery = encodeURIComponent(`${searchPrefix}${cleanQuery}`);
    const url = `https://export.arxiv.org/api/query?search_query=${encodedQuery}&start=0&max_results=${maxResults}&sortBy=relevance&sortOrder=descending`;

    const options = {
      headers: {
        'User-Agent': 'Gumloop-Academic-Fetcher/2.0 (open academic workflow; Node.js)'
      }
    };

    https.get(url, options, (res) => {
      let rawData = '';
      res.on('data', chunk => { rawData += chunk; });
      res.on('end', () => {
        try {
          const entryMatches = rawData.match(/<entry>[\s\S]*?<\/entry>/g) || [];
          const papers = [];
          const bibtexEntries = [];
          const markdownLines = [`## 📚 Artículos Recuperados de arXiv para: *${cleanQuery}*\n`];

          for (const entry of entryMatches) {
            const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
            const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : 'Sin título';

            const summaryMatch = entry.match(/<summary>([\s\S]*?)<\/summary>/);
            const summary = summaryMatch ? summaryMatch[1].replace(/\s+/g, ' ').trim() : 'Sin resumen';

            const publishedMatch = entry.match(/<published>([\s\S]*?)<\/published>/);
            const published = publishedMatch ? publishedMatch[1].trim() : '';
            const year = published.slice(0, 4) || '2026';

            const idMatch = entry.match(/<id>([\s\S]*?)<\/id>/);
            const id = idMatch ? idMatch[1].trim() : '';

            const doiMatch = entry.match(/<arxiv:doi[^>]*>([\s\S]*?)<\/arxiv:doi>/);
            const doi = doiMatch ? doiMatch[1].trim() : '';

            const catMatch = entry.match(/<arxiv:primary_category[^>]*term="([^"]*)"/);
            const primaryCategory = catMatch ? catMatch[1] : 'cs.AI';

            const authorMatches = entry.matchAll(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>[\s\S]*?<\/author>/g);
            const authors = [];
            for (const am of authorMatches) {
              if (am[1]) authors.push(am[1].trim());
            }

            const pdfMatch = entry.match(/<link[^>]*title="pdf"[^>]*href="([^"]*)"/) ||
                             entry.match(/<link[^>]*href="([^"]*)"[^>]*type="application\/pdf"/);
            const pdf = pdfMatch ? pdfMatch[1] : '';

            const paperInfo = {
              title,
              authors,
              year,
              id,
              doi,
              primaryCategory,
              pdf,
              summary
            };
            papers.push(paperInfo);

            const bib = generateBibtex(paperInfo);
            bibtexEntries.push(bib);

            const authorDisplay = authors.slice(0, 4).join(', ') + (authors.length > 4 ? ' et al.' : '');
            markdownLines.push(`### 📄 ${title} (${year})`);
            markdownLines.push(`- **Autores:** ${authorDisplay || 'No declarados'}`);
            markdownLines.push(`- **Categoría:** \`${primaryCategory}\``);
            if (doi) markdownLines.push(`- **DOI:** [${doi}](https://doi.org/${doi})`);
            markdownLines.push(`- **arXiv ID:** [${id}](${id})`);
            if (pdf) markdownLines.push(`- **PDF:** [Descargar documento completo](${pdf})`);
            markdownLines.push(`- **Resumen:** ${summary.slice(0, 420)}...\n`);
          }

          resolve({
            success: true,
            count: papers.length,
            papers,
            markdown: markdownLines.join('\n'),
            bibtex: bibtexEntries.join('\n\n')
          });
        } catch (parseErr) {
          reject(new Error(`Fallo procesando XML de arXiv: ${parseErr.message}`));
        }
      });
    }).on('error', err => {
      resolve({
        success: false,
        error: `Error de red consultando arXiv: ${err.message}`,
        count: 0,
        papers: [],
        markdown: `No se pudo conectar a arXiv (${err.message})`,
        bibtex: ''
      });
    });
  });
}

if (require.main === module) {
  fetchArxiv('deterministic agentic governance', 2).then(res => {
    console.log(`\n=== Se recuperaron ${res.count} artículos de arXiv ===\n`);
    console.log(res.markdown);
    console.log('\n--- CITAS BIBTEX ---\n');
    console.log(res.bibtex);
  }).catch(err => {
    console.error('Error fatal:', err.message);
  });
}

module.exports = { fetchArxiv, generateBibtex };
