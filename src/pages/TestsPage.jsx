import { Link } from 'react-router-dom'
import { HiArrowRight, HiClock, HiDocumentText } from 'react-icons/hi'
import { examSubjects } from '../utils/examGenerator'
import mathMockData from '../data/mathMockQuestions.json'

const math8001710Count = mathMockData.filter(question => question.variantId === '8001710' && !question.isSourceError && Number.isInteger(question.correctOption)).length

export function TestsPage() {
  return <div className="space-y-6"><section className="hero-panel"><p className="eyebrow">Milliy Sertifikat formati</p><h1 className="page-title">Fanlar bo‘yicha sinov testlari</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-300">Har bir testda 20% oson, 50% o‘rta va 30% yuqori darajadagi savollar mavjud. Har yangi urinishda savollar va javob variantlari qayta aralashtiriladi.</p></section>
    <Link to="/tests/mock" className="group block rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider">Yangi · 2025</span><h2 className="mt-4 text-2xl font-black sm:text-3xl">DTM / UZBMB variantlari Mock Exam</h2><p className="mt-2 text-sm text-blue-100">Matematika · Variant 8001710 · {math8001710Count} ta tekshirilgan savol</p></div><span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-blue-700">Variantlarni ochish <HiArrowRight className="transition group-hover:translate-x-1"/></span></div></Link>
    <div className="grid gap-5 sm:grid-cols-2">{examSubjects.map(subject => <article key={subject.id} className="card-panel p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-xl text-blue-600 dark:bg-slate-800"><HiDocumentText/></span><h2 className="mt-5 text-xl font-black">{subject.title}</h2><p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><HiClock/> 20 savol · 30 daqiqa</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-bold"><span className="pill bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10">Oson 20%</span><span className="pill bg-amber-50 text-amber-700 dark:bg-amber-500/10">O‘rta 50%</span><span className="pill bg-red-50 text-red-700 dark:bg-red-500/10">Qiyin 30%</span></div><Link to={`/tests/${subject.id}`} className="btn-primary mt-6">Sinovni boshlash <HiArrowRight/></Link></article>)}</div>
  </div>
}
