import { Link } from 'react-router-dom'
import { HiArrowLeft, HiArrowRight, HiBookOpen } from 'react-icons/hi'
import grades from '../data/uzbekCurriculum.json'

export function UzbekGradesPage() {
  return <div className="space-y-7">
    <Link to="/subjects" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500"><HiArrowLeft/> Fanlarga qaytish</Link>
    <section className="hero-panel bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,.15),transparent_35%)]">
      <p className="eyebrow text-violet-600">Ona tili</p><h1 className="page-title">Sinfni tanlang</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-300">6-11-sinf darsliklaridagi haqiqiy mavzular, aralash Progress Testlar va yakuniy Mock Exam.</p>
    </section>
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{Object.entries(grades).map(([grade, data]) => <Link key={grade} to={`/subjects/ona-tili/grade/${grade}`} className="group card-panel p-6 transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10"><HiBookOpen className="h-6 w-6"/></span>
      <p className="mt-5 text-xs font-bold uppercase tracking-widest text-violet-500">{data.lessons.length} mavzu</p><h2 className="mt-2 text-2xl font-black">{grade}-sinf</h2><p className="mt-2 min-h-10 text-sm text-slate-500">{data.period}. {data.note}.</p>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-violet-600 dark:border-slate-800">Darslarni ochish <HiArrowRight/></div>
    </Link>)}</section>
  </div>
}
