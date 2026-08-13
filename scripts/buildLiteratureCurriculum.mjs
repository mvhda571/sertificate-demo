import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises'

const sourceDir = 'C:/Users/Muslima/Downloads/Telegram Desktop'
const configs = {
  6: ['adabiyot_1qism_6_uzb', 'adabiyot_2qism_6_uzb'],
  7: ['adabiyot_7_uzb'],
  9: ['adabiyot_9_uzb'],
  10: ['adabiyot_10_uzb', 'adabiyot_2qism_10_uzb'],
  11: ['adabiyot_1qism_11_uzb', 'adabiyot_2qism_11_uzb'],
}

const clean = value => value.replace(/\s+/g, ' ').replace(/[.\s]+$/, '').trim()
const excluded = /mundarija|foydalanilgan adabiyot|ijaraga berilgan|xulosa|savol va topshiriq/i
const theoryPattern = /nazariy|san['’]at|vazn|janr|pafos|lirikas?i|adabiyot haqida|xalq qo['’]shiqlari/i
const workPattern = /[«“„].+[»”]|roman|qissa|hikoya|doston|g['’]azal|ruboiy|she['’]r|komediya|fojia|drama|maqol|ertak|qo['’]shiq/i

function parseToc(text, part) {
  const index = Math.max(text.lastIndexOf('MUNDARIJA'), text.lastIndexOf('M U N D A R I J A'), text.lastIndexOf('MUNDARIjA'))
  if (index < 0) return []
  const lines = text.slice(index).replace(/\r/g, '').split('\n').map(clean).filter(Boolean)
  const records = []; let pending = ''
  for (const line of lines.slice(1)) {
    if (/^[IVX]+\s+(BOB|FASL|BO‘LIM)|^[A-ZА-Я‘’\s-]{9,}$/.test(line) && !/\.{2,}/.test(line)) continue
    pending = clean(`${pending} ${line}`)
    const match = pending.match(/^(.+?)\.{2,}\s*(\d+)$/)
    if (!match) continue
    const title = clean(match[1]).replace(/^\d+(?:\s*[–-]\s*\d+)?\s*[-.]\s*(?:dars(?:lar)?|mavzu)\s*[.:]?\s*/i, '')
    pending = ''
    if (!title || excluded.test(title)) continue
    records.push({ title, pages: `${part}-qism, ${match[2]}-sahifa`, part })
  }
  return records
}

function sourceFacts(title, text) {
  const plain = title.replace(/[«»“”„]/g, '').slice(0, 45)
  const index = text.toLocaleLowerCase('uz').indexOf(plain.toLocaleLowerCase('uz'))
  const excerpt = index >= 0 ? clean(text.slice(index, index + 3500)) : ''
  const dates = [...new Set(excerpt.match(/\b(?:1[0-9]{3}|20[0-2][0-9])(?:-yil(?:da|i)?)?\b/g) || [])].slice(0, 4)
  return { excerpt, dates }
}

function lessonContent(title, text) {
  const { excerpt, dates } = sourceFacts(title, text)
  if (theoryPattern.test(title)) return {
    summary: `${title} adabiy matnning shakli va mazmunini tahlil qilishga yordam beradigan nazariy tushunchadir. Uni aniqlashda matndagi ifoda vositasi, ritm, qofiya, obraz va muallif maqsadi birgalikda tekshiriladi. Milliy Sertifikatda atamani ta’rifdan tanish bilan cheklanmay, parchada qanday vazifa bajarayotganini izohlash talab qilinadi.`,
    points: ['Nazariya: badiiy vosita matndagi aniq dalil orqali aniqlanadi.', 'Tahlil: shakl, mazmun va muallif maqsadi o‘zaro bog‘lab izohlanadi.', `Manba sanalari: ${dates.join(', ') || 'mavzu matnida alohida sana asosiy mezon emas'}.`],
    analysis: 'Masalan, “yuzing oydek” birikmasida -dek vositasi orqali o‘xshatish yuzaga keladi; bu tashbehdir. Qarama-qarshi tushunchalarning yonma-yon kelishi tazod hosil qiladi.',
  }
  if (workPattern.test(title)) return {
    summary: `${title} mavzusini o‘rganishda voqealarni qayta hikoya qilishning o‘zi yetarli emas. Asardagi tugun, qahramon qarori, konflikt va yakun o‘rtasidagi sabab-oqibat bog‘lanishi aniqlanadi. Yetakchi obrazning maqsadi va o‘zgarishi asarning asosiy g‘oyasini ochadi. Parcha savollarida badiiy detal, muallif munosabati va obraz nutqiga alohida e’tibor bering.`,
    points: ['Asosiy obrazlar: asar voqeasini harakatga keltiruvchi yetakchi va yordamchi qahramonlar.', 'Nazariya: syujet, konflikt, badiiy detal va muallif pozitsiyasi.', `Muhim sana yoki davr: ${dates.join(', ') || 'PDFdagi ijodkor tarjimayi holi bilan birga o‘rganiladi'}.`],
    analysis: 'Tahlilda parcha ichidagi harakat yoki dialog qahramon xarakteriga dalil qilib olinadi. Xulosa faqat matnda ko‘rinadigan dalil bilan asoslanishi kerak.',
  }
  return {
    summary: `${title} ijodini o‘rganishda adibning tarjimayi holi, yashagan davri va asarlari o‘rtasidagi bog‘lanish muhim. Ijodkor hayotidagi voqealar asar mazmunini bevosita takrorlamaydi, ammo mavzu, obraz va uslub tanloviga ta’sir qiladi. Imtihonda muallif-asar-janr mosligini hamda ijodkorning adabiyot tarixidagi o‘rnini aniq farqlash kerak.`,
    points: [`Muhim sanalar: ${dates.join(', ') || 'PDFdagi tarjimayi hol bo‘limidan aniqlanadi'}.`, `Asarlar ro‘yxati: ${excerpt.match(/[«“„][^»”]{2,70}[»”]/g)?.slice(0, 3).join(', ') || 'mavzu bilan bog‘langan keyingi asar bo‘limlari'}.`, 'Tahlil: ijodkor uslubi davr, mavzu va badiiy obrazlar bilan bog‘lanadi.'],
    analysis: 'Muallif haqidagi savolda sana, asar va janrni bitta tizimda yodlash foydali: ijodkor → asar → janr → asosiy g‘oya.',
  }
}

function makeQuestion(lesson, index) {
  const answer = lesson.points[0]
  const options = [answer, 'Asarni matndan dalilsiz baholash kerak.', 'Janr va badiiy vosita bir tushunchadir.', 'Muallif hayoti asar tahliliga aloqasiz.']
  const shift = index % 4; const rotated = [...options.slice(shift), ...options.slice(0, shift)]
  return { text: `${lesson.title} bo‘yicha to‘g‘ri tahliliy fikrni belgilang.`, options: rotated, answer: rotated.indexOf(answer) }
}

await mkdir(new URL('../public/textbooks/', import.meta.url), { recursive: true })
const output = {
  8: { period: 'Adabiyot', note: 'PDF fayli shikastlangan: qayta yuklash talab etiladi', available: false, pdfs: [], lessons: [], mock: [] },
}
for (const [grade, names] of Object.entries(configs)) {
  const lessons = []; const pdfs = []
  for (let index = 0; index < names.length; index++) {
    const name = names[index]; const text = await readFile(new URL(`../tmp/pdfs/${name}.txt`, import.meta.url), 'utf8')
    const part = names.length > 1 ? index + 1 : 1
    const pdfName = `adabiyot-${grade}${names.length > 1 ? `-${part}` : ''}.pdf`
    pdfs.push({ title: names.length > 1 ? `${part}-qism` : `${grade}-sinf darsligi`, url: `/textbooks/${pdfName}` })
    for (const item of parseToc(text, part)) lessons.push({ ...item, pdf: `/textbooks/${pdfName}`, ...lessonContent(item.title, text) })
    await copyFile(`${sourceDir}/${name}.pdf`, new URL(`../public/textbooks/${pdfName}`, import.meta.url))
  }
  const unique = lessons.filter((item, index) => !lessons.slice(0, index).some(old => old.title === item.title && old.part === item.part)).map((item, index) => ({ ...item, id: index + 1, quickQuestions: [`${item.title} mavzusining Milliy Sertifikat uchun eng muhim jihatini ayting.`, 'Mavzu bo‘yicha matndan bitta dalil keltirib, xulosangizni asoslang.'] }))
  unique.forEach((item, index) => { if ((index + 1) % 3 === 0) item.test = Array.from({length:5},(_,q)=>makeQuestion(unique[(index + q * 2) % (index + 1)],q)) })
  output[grade] = { period: 'Adabiyot', note: `${names.length} qism asosida`, available: true, pdfs, lessons: unique, mock: Array.from({length:10},(_,i)=>makeQuestion(unique[(i*7)%unique.length],i)) }
}
await writeFile(new URL('../src/data/literatureCurriculum.json', import.meta.url), JSON.stringify(output, null, 2), 'utf8')
console.log(Object.fromEntries(Object.entries(output).map(([grade,data])=>[grade,data.lessons.length])))
