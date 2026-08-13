import fs from 'node:fs/promises';
import path from 'node:path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const inputs = process.argv.slice(2);
if (!inputs.length) throw new Error('PDF paths required');

const outDir = path.resolve('tmp/pdfs');
await fs.mkdir(outDir, { recursive: true });

for (const input of inputs) {
  const data = new Uint8Array(await fs.readFile(input));
  const doc = await pdfjsLib.getDocument({ data, disableFontFace: true }).promise;
  const pages = [];
  for (let pageNo = 1; pageNo <= doc.numPages; pageNo++) {
    const page = await doc.getPage(pageNo);
    const content = await page.getTextContent();
    let text = '';
    let lastY = null;
    for (const item of content.items) {
      if (!('str' in item)) continue;
      const y = item.transform?.[5] ?? 0;
      if (lastY !== null && Math.abs(y - lastY) > 2) text += '\n';
      else if (text && !text.endsWith('\n')) text += ' ';
      text += item.str;
      lastY = y;
    }
    pages.push(`\n\n===== PAGE ${pageNo} =====\n${text.trim()}`);
  }
  const base = path.basename(input, path.extname(input));
  await fs.writeFile(path.join(outDir, `${base}.txt`), pages.join(''), 'utf8');
  console.log(`${base}: ${doc.numPages} pages`);
}
