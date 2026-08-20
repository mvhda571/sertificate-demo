import fs from 'node:fs/promises'
import path from 'node:path'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import { createCanvas } from '@napi-rs/canvas'

const [input, ...pageArgs] = process.argv.slice(2)
const pages = pageArgs.map(Number)
const scale = Number(process.env.PDF_RENDER_SCALE || 2)
const data = new Uint8Array(await fs.readFile(input))
const doc = await pdfjsLib.getDocument({ data }).promise
const outDir = path.resolve('tmp/pdfs/rendered')
await fs.mkdir(outDir, { recursive: true })
for (const pageNo of pages) {
  const page = await doc.getPage(pageNo)
  const viewport = page.getViewport({ scale })
  const canvas = createCanvas(viewport.width, viewport.height)
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
  const out = path.join(outDir, `${path.basename(input, '.pdf')}-${pageNo}.png`)
  await fs.writeFile(out, canvas.toBuffer('image/png'))
  console.log(out)
}
