import { readFile, writeFile, mkdir } from 'node:fs/promises'

const sources = {
  6: [{ name:'matematika_6_uzb', track:'Matematika' }],
  7: [{ name:'algebra_7_uzb', track:'Algebra' }, { name:'geometriya_7_uzb', track:'Geometriya' }],
  8: [{ name:'geometriya_8_uzb', track:'Geometriya' }],
  9: [{ name:'geometriya_9_uzb', track:'Geometriya' }],
  11: [{ name:'matematika_2qism_11_uzb', track:'Matematika' }],
}
const clean=value=>value.replace(/\s+/g,' ').replace(/[.\s]+$/,'').trim()
const excluded=/mundarija|javoblar|mashqlar|testlar|nazorat ishi|tarixiy ma['’]lumot|takrorlash|foydalanilgan/i

function parseTopics(text, track) {
  const tocIndex=Math.max(text.lastIndexOf('MUNDARIJA'),text.lastIndexOf('M U N D A R I J A'))
  const tocText=tocIndex>=0?text.slice(Math.max(0,tocIndex-30000)):text
  const lines=tocText.replace(/\r/g,'').split('\n').map(clean).filter(Boolean); const found=[]; let pending=''
  for(const line of lines){
    pending=clean(`${pending} ${line}`)
    if(pending.length>300) pending=line
    const match=pending.match(/^(.+?)\.{2,}\s*(\d+)$/)
    if(!match) continue
    const raw=clean(match[1]); pending=''
    const numbered=raw.match(/^(?:\d+\s*[-.]?\s*(?:§|mavzu)?\s*[.:]?\s*)(.+)$/i)
    if(!numbered) continue
    const title=clean(numbered[1])
    if(!title||excluded.test(title)||title.length>140||!/[A-Za-zÀ-žА-Яа-я]/.test(title)) continue
    found.push({title,track,pages:`${match[2]}-sahifa`})
  }
  return found.filter((item,index)=>!found.slice(0,index).some(old=>old.title===item.title))
}

const formulaRules=[
  [/kvadrat tenglama|diskriminant/i,['\\(D=b^2-4ac\\), \\(x_{1,2}=\\frac{-b\\pm\\sqrt D}{2a}\\)','Masala: \\(x^2-5x+6=0\\). \\(D=25-24=1\\); \\(x_1=2\\), \\(x_2=3\\).']],
  [/funksiya|grafik/i,['\\(y=f(x)\\); chiziqli funksiya: \\(y=kx+b\\)','Masala: \\(y=2x+1\\) da \\(x=3\\). Yechim: \\(y=2\\cdot3+1=7\\).']],
  [/daraja|ko['’]rsatkich/i,['\\(a^m\\cdot a^n=a^{m+n}\\), \\(a^m/a^n=a^{m-n}\\)','Masala: \\(2^3\\cdot2^4=2^7=128\\).']],
  [/ildiz/i,['\\(\\sqrt{ab}=\\sqrt a\\sqrt b\\), \\(\\sqrt{a^2}=|a|\\)','Masala: \\(\\sqrt{72}=\\sqrt{36\\cdot2}=6\\sqrt2\\).']],
  [/progressiya/i,['\\(a_n=a_1+(n-1)d\\), \\(S_n=\\frac n2(2a_1+(n-1)d)\\)','Masala: \\(a_1=3,d=2,n=5\\). \\(a_5=3+4\\cdot2=11\\).']],
  [/ehtimol/i,['\\(P(A)=\\frac{m}{n}\\)','Masala: kubikda juft son tushishi: \\(P=3/6=1/2\\).']],
  [/kombinator|o['’]rin almashtirish/i,['\\(P_n=n!\\), \\(C_n^k=\\frac{n!}{k!(n-k)!}\\)','Masala: 4 elementni tartiblash soni \\(4!=24\\).']],
  [/uchburchak|pifagor/i,['\\(a+b>c\\), to‘g‘ri uchburchakda \\(c^2=a^2+b^2\\)','Masala: katetlar 3 va 4. \\(c=\\sqrt{3^2+4^2}=5\\).']],
  [/aylana|doira/i,['\\(L=2\\pi r\\), \\(S=\\pi r^2\\)','Masala: \\(r=3\\). \\(L=6\\pi\\), \\(S=9\\pi\\).']],
  [/vektor/i,['\\(\\vec a+\\vec b=(a_x+b_x;a_y+b_y)\\), \\(\\vec a\\cdot\\vec b=a_xb_x+a_yb_y\\)','Masala: \\((1;2)+(3;-1)=(4;1)\\).']],
  [/piramida/i,['\\(V=\\frac13S_{asos}h\\)','Masala: \\(S_{asos}=12,h=6\\). \\(V=12\\cdot6/3=24\\).']],
  [/konus/i,['\\(V=\\frac13\\pi r^2h\\), \\(S_{yon}=\\pi rl\\)','Masala: \\(r=3,h=4\\). \\(V=12\\pi\\).']],
  [/shar|sfera/i,['\\(V=\\frac43\\pi r^3\\), \\(S=4\\pi r^2\\)','Masala: \\(r=3\\). \\(V=36\\pi\\), \\(S=36\\pi\\).']],
  [/foiz|protsent/i,['\\(p\\%=\\frac p{100}\\), yangi qiymat \\(=a(1\\pm p/100)\\)','Masala: 200 ning 15 foizi \\(200\\cdot0.15=30\\).']],
  [/kasr/i,['\\(\\frac ab+\\frac cd=\\frac{ad+bc}{bd}\\)','Masala: \\(1/3+1/6=2/6+1/6=1/2\\).']],
]
function content(title,track){const hit=formulaRules.find(([p])=>p.test(title))?.[1]||['\\(a=b\\) tenglikdagi har bir amal ikki tomonga bir xil qo‘llanadi.','Masala: berilganlarni belgilang, formulani tanlang, qiymatlarni qo‘ying va natijani shart bilan tekshiring.'];return{summary:`${title} mavzusida avval berilgan va topilishi kerak bo‘lgan kattaliklar ajratiladi. ${track} masalalarida formulani yodlashdan oldin uning qaysi shartlarda ishlashini tushunish muhim. Yechim ketma-ketligi: shartni matematik yozuvga o‘tkazish, mos qoida yoki teoremani tanlash, hisoblash va natijani tekshirish.`,formulas:[hit[0]],example:hit[1],quickQuestions:[`${title} uchun asosiy formulani yozing va undagi belgilarni izohlang.`,'Shu qoida asosida sonli misol tuzing va bosqichma-bosqich yeching.']}}
function question(lesson,index){const answer=lesson.formulas[0];const options=[answer,'\\(a/0=0\\)','Formulani shartsiz qo‘llash mumkin.','Natijani tekshirish talab qilinmaydi.'];const shift=index%4;const rotated=[...options.slice(shift),...options.slice(0,shift)];return{text:`${lesson.title} [${lesson.track}] uchun to‘g‘ri formulani belgilang.`,options:rotated,answer:rotated.indexOf(answer)}}

await mkdir(new URL('../public/textbooks/',import.meta.url),{recursive:true})
const output={5:{available:false,note:'5-sinf PDF darsligi taqdim etilmagan',pdfs:[],lessons:[],mock:[]},10:{available:false,note:'10-sinf PDF fayllari 0 bayt, qayta yuklash kerak',pdfs:[],lessons:[],mock:[]}}
for(const [grade,items] of Object.entries(sources)){
  const groups=[];const pdfs=[]
  for(const item of items){const text=await readFile(new URL(`../tmp/pdfs/${item.name}.txt`,import.meta.url),'utf8');const pdfName=`${item.name.replaceAll('_','-')}.pdf`;pdfs.push({title:item.track,url:`/textbooks/${pdfName}`});groups.push(parseTopics(text,item.track).map(topic=>({...topic,pdf:`/textbooks/${pdfName}`,...content(topic.title,item.track)})))}
  let globalId=0
  const lessons=groups.flatMap(group=>group.map((item,trackIndex)=>{
    const trackId=trackIndex+1
    const bookTitle=item.title.replaceAll('','‘').replaceAll('','’')
    return {...item,id:++globalId,trackId,bookTitle,title:`[${item.track} | ${trackId}-dars] ${bookTitle}`}
  }))
  for(const group of groups){
    group.forEach((_,index)=>{
      if((index+1)%3!==0)return
      const target=lessons.find(item=>item.track===group[index].track&&item.trackId===index+1)
      const passed=lessons.filter(item=>item.track===target.track&&item.trackId<=target.trackId)
      target.test=Array.from({length:5},(_,q)=>question(passed[(q*2+index)%passed.length],q))
    })
  }
  const missing=[]
  if(grade==='8')missing.push('Algebra PDF matn qatlami o‘qilmadi')
  if(grade==='9')missing.push('Algebra PDF fayli 0 bayt')
  if(grade==='11')missing.push('1-qism PDF fayli 0 bayt')
  output[grade]={available:lessons.length>0,note:missing.length?missing.join('; '):`${groups.length>1?'Algebra va Geometriya':'Matematika'} to‘liq kursi`,pdfs,lessons,mock:Array.from({length:10},(_,i)=>question(lessons[(i*7)%lessons.length],i))}
}
await writeFile(new URL('../src/data/mathCurriculum.json',import.meta.url),JSON.stringify(output,null,2),'utf8')
console.log(Object.fromEntries(Object.entries(output).map(([g,d])=>[g,d.lessons.length])))
