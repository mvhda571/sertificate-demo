import { ArrowRight, Award, BarChart3, Brain, CheckCircle2, Clock3, Sparkles, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { DailyChallenge } from '../components/DailyChallenge'
import { ScoreCalculator } from '../components/ScoreCalculator'

const subjects = [
  { name: 'Matematika', description: 'Algebra, geometriya va mantiq', icon: '∑', color: 'from-blue-500 to-blue-700', progress: 68 },
  { name: 'Ona tili', description: 'Grammatika va adabiyot', icon: 'Aa', color: 'from-violet-500 to-violet-700', progress: 54 },
  { name: 'Tarix', description: 'O‘zbekiston va jahon tarixi', icon: '⌛', color: 'from-orange-400 to-orange-600', progress: 41 },
  { name: 'Ingliz tili', description: 'Grammar, reading va vocabulary', icon: 'EN', color: 'from-emerald-500 to-emerald-700', progress: 26 },
]

const benefits = [
  { icon: Clock3, title: 'Haqiqiy imtihon muhiti', text: 'BMBA formatidagi taymerli testlar bilan vaqtni boshqarishni o‘rganing.' },
  { icon: BarChart3, title: 'Chuqur natijalar tahlili', text: 'Har bir urinish, mavzu va xatoni tushunarli statistikada kuzating.' },
  { icon: Brain, title: 'Aqlli takrorlash', text: 'Flashcard va xatolar banki bilimlarni uzoq muddatga mustahkamlaydi.' },
]

export function HomePage() {
  const { t } = useTranslation()
  return <div className="space-y-8">
    <motion.section initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="relative overflow-hidden rounded-[32px] bg-slate-950 px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl"/><div className="absolute bottom-0 right-1/3 h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl"/>
      <div className="relative max-w-3xl"><span className="pill bg-white/10 text-emerald-300"><Sparkles className="mr-1 inline h-3 w-3"/> Milliy sertifikat uchun yagona platforma</span><h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Bilimingizni natijaga aylantiring.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{t('homeSubtitle')}</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/tests" className="btn-primary px-6">Bepul testni boshlash <ArrowRight/></Link><Link to="/results" className="btn-secondary bg-white/10 text-white hover:bg-white/20">Natijalarim</Link></div><div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-300">{['2 500+ savol','12 000+ o‘quvchi','92% muvaffaqiyat'].map(v=><span key={v} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/>{v}</span>)}</div></div>
    </motion.section>
    <section><div className="flex items-end justify-between"><div><p className="eyebrow">Fanlar katalogi</p><h2 className="mt-2 text-2xl font-black">Maqsadingizni tanlang</h2></div><Link to="/subjects" className="hidden text-sm font-bold text-blue-600 sm:block">Barchasini ko‘rish →</Link></div><div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{subjects.map((s)=><motion.article whileHover={{y:-5}} transition={{duration:.2}} key={s.name} className="card-panel p-5"><span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${s.color} font-black text-white`}>{s.icon}</span><h3 className="mt-5 font-bold">{s.name}</h3><p className="mt-1 text-sm text-slate-500">{s.description}</p><div className="mt-5 flex justify-between text-xs"><span className="text-slate-400">Progress</span><b>{s.progress}%</b></div><div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-emerald-500" style={{width:`${s.progress}%`}}/></div></motion.article>)}</div></section>
    <section className="grid gap-6 xl:grid-cols-2"><DailyChallenge/><ScoreCalculator/></section>
    <section className="py-4"><div className="text-center"><p className="eyebrow">Nega biz?</p><h2 className="mt-2 text-2xl font-black">Tayyorgarlikning samarali yo‘li</h2></div><div className="mt-7 grid gap-5 md:grid-cols-3">{benefits.map(({icon:Icon,title,text})=><div key={title} className="card-panel p-6"><span className="icon-box bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"><Icon/></span><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>)}</div></section>
    <section className="rounded-[32px] bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white sm:flex sm:items-center sm:justify-between"><div><Award className="h-9 w-9 text-blue-200"/><h2 className="mt-4 text-2xl font-black">Sertifikatga tayyormisiz?</h2><p className="mt-2 text-blue-100">Bugun diagnostik test topshiring va darajangizni biling.</p></div><Link to="/tests" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-blue-700 sm:mt-0"><Target className="h-4 w-4"/> Boshlash</Link></section>
  </div>
}
