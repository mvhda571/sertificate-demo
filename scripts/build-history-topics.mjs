import fs from 'node:fs'
import path from 'node:path'

const sources = {
  6: ['qadimgi_dunyo_tarixi_6_uzb.txt', /M U N D A R I J A/i],
  7: ['ozbekiston_tarixi_7_uzb.txt', /M\s*UNDARIJA/i],
  9: ['ozbekiston_tarixi_9_uzb.txt', /m\s+U N D A R I J A/i],
  10: ['ozbekiston_tarixi_10_uzb.txt', /MUNDARIJA/i],
  11: ['ozbekiston_tarixi_11_uzb.txt', /MUNDARIJA/i],
}

const parseToc = (grade, file, marker) => {
  const raw = fs.readFileSync(path.resolve('tmp/pdfs', file), 'utf8')
  const matches = [...raw.matchAll(new RegExp(marker.source, 'gi'))]
  const start = matches.at(-1)?.index ?? 0
  const toc = raw.slice(start)
  const lines = toc.split(/\r?\n/).map(line => line.replace(/\s+/g, ' ').replace(/(?:\.\s*){2,}/g, '...').trim())
  const results = []
  let current = null
  for (const line of lines) {
    const found = line.match(/^(\d+)(?:\s*[–-]\s*\d+)?\s*-\s*(?:§|mavzu)\.?\s*(.*)$/i)
    if (found) {
      if (current) results.push(current)
      current = { id: Number(found[1]), raw: found[2] }
    } else if (current && line && !/^([IVX]+\s+)?(BOB|BO‘LIM)|^Kirish|^Xulosa|^O‘quv/i.test(line)) {
      current.raw += ` ${line}`
    }
    if (current && /\.{2,}\s*\d+\s*$/.test(current.raw)) {
      results.push(current); current = null
    }
  }
  if (current) results.push(current)
  return results.filter(item => item.id <= ({6:44,7:42,9:41,10:28,11:22}[grade])).map(item => {
    const page = Number(item.raw.match(/(\d+)\s*$/)?.[1]) || null
    const title = item.raw.replace(/\.{2,}.*$/, '').replace(/\s+\d+\s*$/, '').replace(/\s+([.,;:])$/, '$1').trim()
    return { id: item.id, title, page }
  }).filter((item, index, all) => all.findIndex(other => other.id === item.id) === index)
}

const grade8 = [
  [1,'Dashti Qipchoqdagi siyosiy vaziyat',5],[2,'Movarounnahr va Xurosondagi siyosiy vaziyat',8],[3,'Zahiriddin Muhammad Bobur va Muhammad Shayboniyxon munosabatlari',11],[4,'Movarounnahr va Xurosonda shayboniylar hukmronligining o‘rnatilishi',13],
  [5,'Buxoro xonligining tashkil topishi',17],[6,'Abdullaxon II davrida Buxoro xonligining yuksalishi',19],[7,'Buxoro xonligida ashtarxoniylar sulolasi hukmronligining o‘rnatilishi',21],[8,'Buxoro xonligida markaziy hokimiyatning zaiflashuvi',25],[9,'Buxoro xonligida davlat boshqaruvi',28],[10,'Buxoro xonligida harbiy ish',31],[11,'Buxoro xonligida ijtimoiy-iqtisodiy hayot',34],[12,'Buxoro xonligining tashqi siyosati',38],[13,'Buxoro xonligida madaniy hayot',43],[14,'Buxoro amirligining tashkil topishi',50],[15,'Amirlikda markaziy hokimiyatning mustahkamlanishi',55],[16,'Buxoro amirligida davlat boshqaruvi',57],[17,'Buxoro amirligida harbiy ish',61],[18,'Buxoro amirligida ijtimoiy-iqtisodiy hayot',65],[19,'Amirlik shaharlari. Ichki va tashqi savdo',68],[20,'Buxoro amirligining tashqi siyosati',71],[21,'Buxoro amirligida madaniy hayot',75],
  [22,'Xiva xonligining tashkil topishi',80],[23,'XVII-XVIII asrning birinchi yarmida xonlikdagi siyosiy ahvol',82],[24,'Xiva xonligida qo‘ng‘irotlar sulolasi hukmronligining o‘rnatilishi. XVIII asr oxiri - XIX asr birinchi yarmida xonlikning siyosiy ahvoli',86],[25,'Xiva xonligida davlat boshqaruvi',90],[26,'Xiva xonligida ijtimoiy-iqtisodiy hayot. Shaharlar hayoti',94],[27,'Xiva xonligining tashqi siyosati',99],[28,'Xiva xonligida madaniy hayot',103],[29,'Xiva xonligi tarixi bo‘yicha manbalar',106],[30,'XVI-XIX asrning birinchi yarmida qoraqalpoqlar',110],[31,'Qoraqalpoqlarda madaniy va ma’naviy hayot',113],
  [32,'Qo‘qon xonligining tashkil topishi',118],[33,'XVIII asrning ikkinchi yarmi - XIX asrning birinchi yarmida Qo‘qon xonligida siyosiy ahvol',120],[34,'Qo‘qon xonligida davlat boshqaruvi',126],[35,'Qo‘qon xonligida harbiy ish',129],[36,'Qo‘qon xonligida ijtimoiy-iqtisodiy hayot',133],[37,'Qo‘qon xonligining tashqi siyosati',137],[38,'Qo‘qon xonligida madaniy hayot',142],[39,'Qo‘qon xonligida ta’lim',147],[40,'O‘zbek davlatchiligi taraqqiyotda orqada qolish sabablari va oqibatlari',150],
].map(([id,title,page])=>({id,title,page}))

const output = { 8: grade8 }
for (const [grade, [file, marker]] of Object.entries(sources)) output[grade] = parseToc(grade, file, marker)
for (const grade of [6,7,8,9,10,11]) console.log(`${grade}-sinf: ${output[grade].length} mavzu`)
fs.writeFileSync(path.resolve('src/data/historyTopics.json'), JSON.stringify(output, null, 2))
