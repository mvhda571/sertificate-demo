/**
 * Collects the public 2025 mathematics variant catalogue and structured question
 * blocks when the source exposes them as HTML. PDF-only variants are retained as
 * source records and deliberately not OCR'd. Respect the site's terms/robots.txt.
 * Run: node scripts/scrape-test-uz-math.mjs --pages=3
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const ORIGIN = 'https://www.test-uz.ru'
const pages = Number(process.argv.find(arg => arg.startsWith('--pages='))?.split('=')[1] || 3)
const output = resolve('src/data/imported/testUzMath2025.json')
const clean = value => value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const absolute = value => new URL(value, ORIGIN).href

async function get(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'CertificateAcademyImporter/1.0 (+educational, low-rate)' } })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`)
  return response.text()
}

function catalogueEntries(html) {
  const entries = []
  const linkPattern = /<a[^>]+href=["']([^"']*uzbmb_uz\.php\?id=\d+)["'][^>]*>([\s\S]*?)<\/a>/gi
  for (const match of html.matchAll(linkPattern)) {
    const nearby = html.slice(match.index, match.index + 700)
    if (!/Matematika/i.test(nearby) || !/2025/.test(nearby)) continue
    entries.push({ title: clean(match[2]), detailUrl: absolute(match[1]), subject: 'Matematika', year: 2025 })
  }
  return entries
}

function structuredQuestions(html, sourceUrl) {
  const blocks = [...html.matchAll(/<(?:article|div)[^>]+(?:class|data-question)=["'][^"']*(?:question|test)[^"']*["'][^>]*>([\s\S]*?)<\/(?:article|div)>/gi)]
  return blocks.map(([, block], index) => {
    const options = [...block.matchAll(/<(?:label|li|button)[^>]*>([\s\S]*?)<\/(?:label|li|button)>/gi)].map(item => clean(item[1])).filter(Boolean).slice(0, 4)
    const correct = block.match(/data-correct=["']([A-D0-3])["']/i)?.[1]
    const image = block.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1]
    return { id: `test-uz-${index + 1}`, question: clean(block.split(/<(?:label|li|button)/i)[0]), questionImageUrl: image ? absolute(image) : null, options, correctOption: /^[A-D]$/i.test(correct || '') ? correct.toUpperCase().charCodeAt(0) - 65 : Number(correct), subject: 'Matematika', year: 2025, sourceUrl }
  }).filter(item => item.question && item.options.length === 4 && Number.isInteger(item.correctOption))
}

const variants = []
for (let page = 1; page <= pages; page += 1) {
  const html = await get(`${ORIGIN}/uzbmb_uz.php?cat=10&p=${page}`)
  variants.push(...catalogueEntries(html))
  if (page < pages) await new Promise(resolveDelay => setTimeout(resolveDelay, 800))
}

const unique = [...new Map(variants.map(item => [item.detailUrl, item])).values()]
for (const variant of unique) {
  const html = await get(variant.detailUrl)
  variant.pdfUrl = html.match(/href=["']([^"']+\.pdf(?:\?[^"']*)?)["']/i)?.[1] ? absolute(html.match(/href=["']([^"']+\.pdf(?:\?[^"']*)?)["']/i)[1]) : null
  variant.questions = structuredQuestions(html, variant.detailUrl)
  await new Promise(resolveDelay => setTimeout(resolveDelay, 800))
}

await mkdir(resolve('src/data/imported'), { recursive: true })
await writeFile(output, `${JSON.stringify({ generatedAt: new Date().toISOString(), source: `${ORIGIN}/uzbmb_uz.php?cat=10`, variants: unique }, null, 2)}\n`)
console.log(`Saved ${unique.length} variants to ${output}`)
