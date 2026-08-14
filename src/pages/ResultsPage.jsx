import { BarChart3, BookOpenCheck, Clock as Clock3, Target } from '../components/AppIcons'
import { PremiumCertificateIcon } from '../components/PremiumCertificateIcon'
import { SubjectProgressCharts } from '../components/SubjectProgressCharts'
import { Link } from 'react-router-dom'
import { useTestStore } from '../store/useTestStore'
import { useUserStore } from '../store/useUserStore'
import { useLearningStore } from '../store/useLearningStore'

const gradeFor = percent => percent >= 90 ? 'A+' : percent >= 80 ? 'A' : percent >= 70 ? 'B+' : 'B'

export function ResultsPage() {
  const attempts = useTestStore(state => state.attempts)
  const completed = useLearningStore(state => state.completed)
  const { profile, points } = useUserStore()
  const average = attempts.length ? Math.round(attempts.reduce((sum,item)=>sum+item.percent,0)/attempts.length) : 0
  const mockAttempts = attempts.filter(item => /mock/i.test(item.title || ''))
  const forecastPercent = mockAttempts[0]?.percent ?? average
  const forecast = gradeFor(forecastPercent)
  const lessonCount = Object.keys(completed).length
  return <div className="space-y-6">
    <SubjectProgressCharts/>
    <section className="hero-panel"><p className="eyebrow">O‘quvchi kabineti</p><h1 className="page-title">Salom, {profile.name.split(' ')[0]}!</h1><p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Taxminiy Milliy Sertifikat darajangiz: <b className="text-emerald-600">{forecast}</b></p></section>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[[BarChart3,'O‘rtacha test natijasi',`${average}%`],[BookOpenCheck,'Yakunlangan darslar',lessonCount],[PremiumCertificateIcon,'Sertifikat prognozi',forecast],[Target,'Jamlangan XP',points]].map(([Icon,label,value])=><div key={label} className="card-panel p-5"><Icon className={label === 'Sertifikat prognozi' ? '' : 'h-5 w-5 text-blue-600'}/><p className="mt-5 text-sm text-slate-500 dark:text-slate-300">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></div>)}</div>
    <section className="card-panel overflow-hidden"><div className="border-b border-slate-100 p-6 dark:border-slate-800"><h2 className="text-xl font-bold">Testlar tarixi</h2></div>{attempts.length?<div className="divide-y divide-slate-100 dark:divide-slate-800">{attempts.map(attempt=><div key={attempt.id} className="flex flex-wrap items-center justify-between gap-4 p-5"><div><p className="font-semibold">{attempt.title||attempt.testId}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-400"><Clock3 className="h-3 w-3"/>{new Date(attempt.id).toLocaleDateString()}</p></div><div className="text-right"><b className="text-xl">{attempt.percent}%</b><span className="ml-3 pill bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10">{gradeFor(attempt.percent)}</span></div></div>)}</div>:<div className="p-12 text-center"><BookOpenCheck className="mx-auto h-10 w-10 text-slate-300"/><h3 className="mt-4 font-bold">Hali natijalar yo‘q</h3><p className="mt-2 text-sm text-slate-500">Birinchi testingizni yechib, prognozni shakllantiring.</p><Link to="/tests" className="btn-primary mt-5">Testni boshlash</Link></div>}</section>
  </div>
}
