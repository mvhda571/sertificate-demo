import { BarChart3, BookOpenCheck, Clock as Clock3, Target } from '../components/AppIcons'
import { PremiumCertificateIcon } from '../components/PremiumCertificateIcon'
import { SubjectProgressCharts } from '../components/SubjectProgressCharts'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTestStore } from '../store/useTestStore'
import { useUserStore } from '../store/useUserStore'
import { useLearningStore } from '../store/useLearningStore'

const gradeFor = percent => percent >= 93 ? 'A+' : percent >= 86 ? 'A' : percent >= 78 ? 'B+' : percent >= 70 ? 'B' : percent >= 62 ? 'C+' : percent >= 55 ? 'C' : 'O‘tmadi'

export function ResultsPage() {
  const { t, i18n } = useTranslation()
  const attempts = useTestStore(state => state.attempts)
  const completed = useLearningStore(state => state.completed)
  const { profile, points } = useUserStore()
  const latestThree = attempts.slice(0, 3)
  const average = latestThree.length ? Math.round(latestThree.reduce((sum,item)=>sum+item.percent,0)/latestThree.length) : 0
  const forecast = gradeFor(average)
  const lessonCount = Object.keys(completed).length
  const locale = i18n.language === 'ru' ? 'ru-RU' : i18n.language === 'en' ? 'en-US' : 'uz-UZ'
  const cards = [[BarChart3,t('resultsPage.averageTest'),`${average}%`],[BookOpenCheck,t('resultsPage.completedLessons'),lessonCount],[PremiumCertificateIcon,t('resultsPage.certificateForecast'),forecast],[Target,t('resultsPage.totalXp'),points]]
  return <div className="space-y-6">
    <section className="hero-panel"><p className="eyebrow">{t('resultsPage.cabinet')}</p><h1 className="page-title">{t('resultsPage.welcome',{name:profile.name.split(' ')[0]})}</h1><p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{t('resultsPage.averageCertificate')}: <b className="text-emerald-600">{average}% · {forecast}</b></p><p className="mt-1 text-xs text-slate-400">{t('resultsPage.lastThreeHint',{count:latestThree.length})}</p></section>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([Icon,label,value])=><div key={label} className="card-panel p-5"><Icon className={label===t('resultsPage.certificateForecast')?'':'h-5 w-5 text-blue-600'}/><p className="mt-5 text-sm text-slate-500 dark:text-slate-300">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></div>)}</div>
    <SubjectProgressCharts/>
    <section className="card-panel overflow-hidden"><div className="border-b border-slate-100 p-6 dark:border-slate-800"><h2 className="text-xl font-bold">{t('resultsPage.history')}</h2></div>{attempts.length?<div className="divide-y divide-slate-100 dark:divide-slate-800">{attempts.map(attempt=><div key={attempt.id} className="flex flex-wrap items-center justify-between gap-4 p-5"><div><p className="font-semibold">{attempt.title||attempt.testId}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-400"><Clock3 className="h-3 w-3"/>{new Date(attempt.id).toLocaleDateString(locale)}</p></div><div className="text-right"><b className="text-xl">{attempt.percent}%</b><span className="ml-3 pill bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10">{attempt.certificateLevel||gradeFor(attempt.percent)}</span></div></div>)}</div>:<div className="p-12 text-center"><BookOpenCheck className="mx-auto h-10 w-10 text-slate-300"/><h3 className="mt-4 font-bold">{t('resultsPage.empty')}</h3><p className="mt-2 text-sm text-slate-500">{t('resultsPage.emptyHint')}</p><Link to="/tests" className="btn-primary mt-5">{t('resultsPage.startTest')}</Link></div>}</section>
  </div>
}
