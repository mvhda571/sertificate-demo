import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const sourceDir = 'C:/Users/Muslima/Downloads/Telegram Desktop'
const configs = {
  6: { file: 'ona_tili_6_uzb', pdf: 'ona-tili-6.pdf' },
  7: { file: 'ona_tili_7_uzb', pdf: 'ona-tili-7.pdf' },
  8: { file: 'ona_tili_8_uzb', pdf: 'ona-tili-8.pdf' },
  9: { file: 'ona_tili_9_uzb', pdf: 'ona-tili-9.pdf' },
  10: { file: 'ona_tili_10_uzb', pdf: 'ona-tili-10.pdf' },
  11: { file: 'ona_tili_2qism_11_uzb', pdf: 'ona-tili-11-2.pdf' },
}

const clean = value => value.replace(/\s+/g, ' ').replace(/[.\s]+$/, '').trim()
const rules = [
  [/fe['’]l|zamon|mayl|nisbat/i, ['Fe’l harakat yoki holatni bildiradi; shakli zamon, mayl, nisbat va shaxs-son ma’nolarini aniqlashtiradi.', 'Fe’lni tahlil qilishda avval asos, keyin nisbat, zamon yoki mayl va shaxs-son qo‘shimchalari ajratiladi.', 'Misollar: yozdi - o‘tgan zamon; yozmoqda - hozirgi zamon; yozsin - buyruq-istak mayli.']],
  [/ot|egalik|kelishik/i, ['Ot shaxs, narsa, joy, faoliyat yoki tushuncha nomini bildiradi.', 'Ot tahlilida atoqli-turdosh, aniq-mavhum, son, egalik va kelishik shakllari ketma-ket aniqlanadi.', 'Misollar: kitob; Toshkent; bolalarimizdan - ko‘plik, egalik va chiqish kelishigi.']],
  [/sifat/i, ['Sifat predmetning belgi-xususiyatini bildiradi va odatda qanday? qanaqa? so‘roqlariga javob bo‘ladi.', 'Sifatni tahlil qilishda asliy-nisbiy, tuzilishi, darajasi va otlashgan-otlashmaganligi tekshiriladi.', 'Misollar: oq qog‘oz; juda chiroyli; yaxshilar - otlashgan sifat.']],
  [/son|miqdor/i, ['Son predmetning miqdori yoki tartibini bildiradi.', 'Sonlar sanoq, dona, chama, jamlovchi, taqsim, kasr va tartib ma’nolarida keladi.', 'Misollar: besh kitob; beshinchi qator; ikkitadan daftar.']],
  [/ravish/i, ['Ravish harakatning holati, payti, o‘rni yoki miqdor-darajasini bildiradi.', 'Ravish ko‘pincha fe’lga bog‘lanadi; sifat bilan shakldosh so‘z gapdagi vazifasiga qarab farqlanadi.', 'Misollar: tez yurdi; ertaga keladi; ancha kutdi.']],
  [/olmosh/i, ['Olmosh ot, sifat, son yoki ravish o‘rnida qo‘llanib, ularga ishora qiladi.', 'Olmoshning ma’no turi uning matndagi vazifasi va nimaga ishora qilishi orqali aniqlanadi.', 'Misollar: men - kishilik; shu - ko‘rsatish; kim? - so‘roq olmoshi.']],
  [/bog['’]lov|qo['’]shma gap|ergash/i, ['Qo‘shma gap ikki yoki undan ortiq predikativ qismdan tuziladi.', 'Qismlar bog‘lovchi, yuklama, nisbiy so‘z, ohang yoki grammatik shakl yordamida bog‘lanadi.', 'Misollar: Bahor keldi va gullar ochildi; Yomg‘ir yog‘sa, yer namlanadi; Quyosh chiqdi - havo isidi.']],
  [/gap|kesim|ega|to['’]ldiruvchi|aniqlovchi|hol/i, ['Gap tugallangan fikrni bildiradi; kesim uning grammatik markazidir.', 'Sintaktik tahlilda avval kesim, so‘ng ega va kesimga bog‘langan ikkinchi darajali bo‘laklar aniqlanadi.', 'Misol: O‘quvchi kitobni diqqat bilan o‘qidi: o‘quvchi - ega, o‘qidi - kesim.']],
  [/imlo|yozil|talaffuz|urg['’]u|tovush|unli|undosh|bo['’]g['’]in/i, ['Adabiy talaffuz va imlo me’yorlari so‘zning og‘zaki hamda yozma shaklini tartibga soladi.', 'Talaffuzdagi tovush o‘zgarishi har doim ham yozuvga ko‘chirilmaydi; imlo lug‘ati me’yoriy shaklni belgilaydi.', 'Misollar: ketdi [ketti] talaffuz qilinishi mumkin; kitob+im = kitobim; o‘qituvchi so‘zida urg‘u oxirgi bo‘g‘inda.']],
  [/uslub|nutq/i, ['Nutq vaziyat, maqsad va tinglovchiga mos quriladi; so‘z tanlovi uslubni belgilaydi.', 'So‘zlashuv, publitsistik, ilmiy, rasmiy va badiiy uslublarning leksik hamda grammatik belgilari farq qiladi.', 'Misollar: ariza - rasmiy; maqola - publitsistik; ta’rif va termin - ilmiy uslub.']],
  [/sinonim|antonim|omonim|paronim|leksik|so['’]z/i, ['So‘zning ma’nosi matn va nutqiy vaziyatda aniqlanadi.', 'Shakldoshlik, ma’nodoshlik, zid ma’nolilik va talaffuzi yaqin birliklarni bir-biridan farqlash testlarda muhim.', 'Misollar: chiroyli-go‘zal - sinonim; katta-kichik - antonim; ot - omonim.']],
  [/matn|insho|esse/i, ['Matn mavzu va asosiy fikr atrofida mazmunan bog‘langan gaplardan tuziladi.', 'Yaxlit matnda kirish, asosiy qism va xulosa mantiqan ulanadi; har bir xatboshi bitta kichik fikrni rivojlantiradi.', 'Misollar: hikoya voqeani bayon qiladi; tasvir belgi beradi; muhokama tezis, dalil va xulosaga tayanadi.']],
]

function lessonText(title) {
  const hit = rules.find(([pattern]) => pattern.test(title))?.[1] || [
    `${title} mavzusida til birligining ma’nosi, shakli va gapdagi vazifasi birgalikda o‘rganiladi.`,
    'Milliy Sertifikat topshirig‘ida birlikni faqat yoddan emas, matn ichidagi vazifasi orqali aniqlash kerak.',
    `Misollar: mavzuga oid birlikni topish; uni tarkibiy tahlil qilish; shu qoida asosida yangi gap tuzish.`,
  ]
  return {
    summary: `${hit[0]} ${hit[1]} ${hit[2]}`,
    rules: [hit[0], hit[1]],
    exception: 'Shakli bir xil birliklar turli gaplarda boshqa vazifa bajarishi mumkin; javob kontekst asosida tanlanadi.',
    examples: hit[2].replace(/^Misollar?:\s*/i, '').split(';').map(clean),
    facts: [hit[0], hit[1], hit[2]],
    quickQuestions: [`${title} mavzusining asosiy qoidasini o‘z misolingiz bilan tushuntiring.`, 'Berilgan qoidaga mos gap tuzing va til birligini tahlil qiling.'],
  }
}

function parseToc(text, numbered) {
  const index = Math.max(text.lastIndexOf('MUNDARIJA'), text.lastIndexOf('M U N D A R I J A'))
  const tail = text.slice(index).replace(/\r/g, '')
  const joined = tail.replace(/\n(?=[^\n]*$)/g, '\n')
  const lines = joined.split('\n').map(clean).filter(Boolean)
  const records = []
  let pending = ''
  for (const line of lines.slice(1)) {
    if (/^(I{1,4}|V?I{0,3})\s+(FASL|BO['’]LIM)|^[A-Z‘’\s-]{8,}$/.test(line) && !/\.{2,}/.test(line)) continue
    pending = clean(`${pending} ${line}`)
    const match = pending.match(/^(.+?)\.{2,}\s*\.?\s*(\d+)$/)
    if (!match) continue
    let title = clean(match[1]).replace(/^\d+(?:\s*[–-]\s*\d+)?\s*[-.]\s*(?:dars(?:lar)?|[mм]avzu)\s*[.:]?\s*/i, '')
    const number = match[1].match(/^(\d+)/)?.[1]
    pending = ''
    if (!title || /mundarija|foydalanilgan|atamalar lug['’]ati|testlardan namunalar/i.test(title)) continue
    if (numbered && !number) continue
    records.push({ sourceNumber: number ? Number(number) : records.length + 1, title, pages: Number(match[2]) })
  }
  const unique = records.filter((item, index) => !records.slice(0, index).some(old => old.sourceNumber === item.sourceNumber && old.title === item.title))
  return unique.map((item, index) => ({ ...item, id: index + 1 }))
}

function question(lesson, index) {
  const answer = lesson.facts[0]
  const options = [answer, 'Qoida faqat yozma nutqqa tegishli', 'Kontekst hisobga olinmaydi', 'Barcha birliklar bir xil vazifa bajaradi']
  const shift = index % 4
  const rotated = [...options.slice(shift), ...options.slice(0, shift)]
  return { text: `${lesson.title} mavzusi bo‘yicha to‘g‘ri fikrni belgilang.`, options: rotated, answer: rotated.indexOf(answer) }
}

const output = {}
await mkdir(new URL('../public/textbooks/', import.meta.url), { recursive: true })
for (const [grade, config] of Object.entries(configs)) {
  const text = await readFile(new URL(`../tmp/pdfs/${config.file}.txt`, import.meta.url), 'utf8')
  const parsed = parseToc(text, Number(grade) >= 8)
  if (grade === '11' && !parsed.some(item => item.sourceNumber === 16)) {
    parsed.splice(15, 0, { id: 16, sourceNumber: 16, title: 'Ortiqcha qo‘shimchalar', pages: 59 })
    parsed.forEach((item, index) => { item.id = index + 1 })
  }
  if (grade === '7' && parsed[0]?.title.startsWith('Kirish ')) parsed[0].title = parsed[0].title.replace(/^Kirish\s+/, '')
  const lessons = parsed.map(item => ({ ...item, ...lessonText(item.title) }))
  lessons.forEach((item, index) => {
    if ((index + 1) % 3 === 0) item.test = Array.from({ length: 5 }, (_, qIndex) => question(lessons[(qIndex * 2 + index) % (index + 1)], qIndex))
  })
  output[grade] = {
    period: [10, 11].includes(Number(grade)) ? 'Ona tili, 2-qism' : 'Ona tili',
    note: [10, 11].includes(Number(grade)) ? 'Taqdim etilgan 2-qism darsligi asosida' : 'To‘liq darslik asosida',
    pdf: `/textbooks/${config.pdf}`,
    lessons,
    mock: Array.from({ length: 10 }, (_, index) => question(lessons[(index * 7) % lessons.length], index)),
  }
  await copyFile(`${sourceDir}/${config.file}.pdf`, new URL(`../public/textbooks/${config.pdf}`, import.meta.url))
}
await writeFile(new URL('../src/data/uzbekCurriculum.json', import.meta.url), JSON.stringify(output, null, 2), 'utf8')
console.log(Object.fromEntries(Object.entries(output).map(([grade, data]) => [grade, data.lessons.length])))
