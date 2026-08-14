import { HiExclamation, HiLightBulb } from 'react-icons/hi'

const advice = {
  tarix: lesson => ({ essence: lesson.facts?.[0] || lesson.summary, trap: 'Sana va shaxsni alohida yodlashdan ko‘ra, voqeaning sababi → jarayoni → natijasi zanjirini tiklang.', practical: `“${lesson.title}” mavzusidagi har bir qaror keyingi siyosiy yoki ijtimoiy oqibat bilan bog‘lanadi.` }),
  matematika: lesson => ({ essence: lesson.formulas?.[0] || lesson.summary, trap: 'Formulani shartlarini tekshirmasdan qo‘llash, ishora va o‘lchov birligini yo‘qotish eng ko‘p uchraydigan xatodir.', practical: lesson.example || 'Berilganlarni yozing, formulani tanlang, qiymatlarni qo‘ying va javobni teskari amal bilan tekshiring.' }),
  'ona-tili': lesson => ({ essence: lesson.rules?.[0] || lesson.summary, trap: lesson.exception || 'Shakldosh birlikni faqat tashqi ko‘rinishiga qarab emas, gapdagi vazifasiga qarab aniqlang.', practical: lesson.examples?.[0] || 'Qoidani kundalik nutqdagi bitta gapga qo‘llab, birlikni tarkibiy tahlil qiling.' }),
  adabiyot: lesson => ({ essence: lesson.points?.[0] || lesson.summary, trap: 'Asar mazmunini bilishning o‘zi yetarli emas: obraz, konflikt va muallif g‘oyasini matndagi dalil bilan bog‘lang.', practical: lesson.analysis || 'Qahramonning bir qarorini tanlab, uning sababini va asar yakuniga ta’sirini tushuntiring.' }),
}

export function TeacherAdvice({ subject, lesson }) {
  const hasPdfAdvice = subject === 'tarix' && lesson.teacherAdvice
  const hasMathAdvice = subject === 'matematika' && lesson.teacherAdvice
  const content = lesson.teacherAdvice || (advice[subject] || advice.tarix)(lesson)
  const labels = hasPdfAdvice
    ? ['Xotira ilgagi', 'Imtihon tuzog‘i', 'Mantiqiy zanjir']
    : hasMathAdvice
      ? ['Eslab qol', 'Qisqa layfhak', 'Amaliy qo‘llash']
    : ['Mavzuning mag‘zi', 'Ko‘p uchraydigan tuzoq', 'Amaliy bog‘lanish']

  return <section className="mt-7 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/60 dark:border-amber-500/20 dark:bg-amber-500/5">
    <div className="flex items-center gap-2 border-b border-amber-200 px-5 py-4 font-black text-amber-800 dark:border-amber-500/20 dark:text-amber-300"><HiLightBulb/> Ustoz maslahati</div>
    <div className="grid gap-4 p-5 text-sm leading-6 sm:grid-cols-3">
      <div><b className="block text-slate-950 dark:text-white">{labels[0]}</b><p className="mt-1 text-slate-600 dark:text-slate-300">{content.essence}</p></div>
      <div><b className="flex items-center gap-1 text-slate-950 dark:text-white"><HiExclamation className="text-amber-600"/> {labels[1]}</b><p className="mt-1 text-slate-600 dark:text-slate-300">{content.trap}</p></div>
      <div><b className="block text-slate-950 dark:text-white">{labels[2]}</b><p className="mt-1 text-slate-600 dark:text-slate-300">{content.practical}</p></div>
    </div>
  </section>
}
