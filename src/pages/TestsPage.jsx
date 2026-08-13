import { Link } from 'react-router-dom'
import { HiArrowRight, HiClock, HiDocumentText } from 'react-icons/hi'
import { examSubjects } from '../utils/examGenerator'

export function TestsPage() {
  return <div className="space-y-6"><section className="hero-panel"><p className="eyebrow">Milliy Sertifikat formati</p><h1 className="page-title">Fanlar bo‘yicha sinov testlari</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-300">Har bir testda 20% oson, 50% o‘rta va 30% yuqori darajadagi savollar mavjud. Har yangi urinishda savollar va javob variantlari qayta aralashtiriladi.</p></section>
    <div className="grid gap-5 sm:grid-cols-2">{examSubjects.map(subject => <article key={subject.id} className="card-panel p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-xl text-blue-600 dark:bg-slate-800"><HiDocumentText/></span><h2 className="mt-5 text-xl font-black">{subject.title}</h2><p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><HiClock/> 20 savol · 30 daqiqa</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-bold"><span className="pill bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10">Oson 20%</span><span className="pill bg-amber-50 text-amber-700 dark:bg-amber-500/10">O‘rta 50%</span><span className="pill bg-red-50 text-red-700 dark:bg-red-500/10">Qiyin 30%</span></div><Link to={`/tests/${subject.id}`} className="btn-primary mt-6">Sinovni boshlash <HiArrowRight/></Link></article>)}</div>
  </div>
}
