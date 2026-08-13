import { Link } from 'react-router-dom'
import { FiArrowRight, FiBookOpen, FiCheckCircle, FiClock, FiTarget, FiTrendingUp } from 'react-icons/fi'
import { useUserStore } from '../store/useUserStore'

const highlights = [
  [FiClock, 'Haqiqiy imtihon muhiti', 'Taymerli testlar orqali vaqtni to‘g‘ri boshqarishni o‘rganing.'],
  [FiTrendingUp, 'Aniq progress', 'Yakunlangan darslar va natijalarni bir joyda kuzating.'],
  [FiTarget, 'Aralash nazorat', 'Har uch darsdan keyin avvalgi mavzularni ham qamragan test ishlang.'],
]

export function HomePage() {
  const name = useUserStore((state) => state.profile.name.split(' ')[0])
  return <div className="space-y-8">
    <section className="relative overflow-hidden rounded-[32px] bg-slate-950 px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16"><div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl"/><div className="absolute bottom-0 right-1/3 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"/><div className="relative max-w-3xl"><span className="pill bg-white/10 text-emerald-300">Milliy Sertifikat Tayyorgarlik Tizimi</span><h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">Xush kelibsiz, {name}!</h1><p className="mt-4 text-xl font-semibold text-slate-100">Bugun qaysi fandan tayyorgarlik ko‘ramiz?</p><p className="mt-3 max-w-2xl leading-7 text-slate-300">Bilimdonlar maydonida qisqa konspekt, progress test va yakuniy imtihonlar orqali bilimlaringizni tizimli mustahkamlang.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/subjects" className="btn-primary px-6">Fanni tanlash <FiArrowRight/></Link><Link to="/results" className="btn-secondary bg-white/10 text-white hover:bg-white/20">Natijalarim</Link></div><div className="mt-9 flex flex-wrap gap-7 text-sm text-slate-300">{['Faol fanlar','Har 3 darsda test','Yakuniy Mock Exam'].map(item=><span key={item} className="flex items-center gap-2"><FiCheckCircle className="text-emerald-400"/>{item}</span>)}</div></div></section>
    <section><div className="flex items-end justify-between"><div><p className="eyebrow">O‘qishni boshlang</p><h2 className="mt-2 text-2xl font-black">Darslikdan imtihongacha</h2></div><Link to="/subjects" className="hidden items-center gap-2 text-sm font-bold text-emerald-600 sm:flex">Barcha fanlar <FiArrowRight/></Link></div><div className="mt-5 grid gap-5 md:grid-cols-3">{highlights.map(([Icon,title,text])=><article key={title} className="card-panel p-6"><span className="icon-box bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"><Icon/></span><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></article>)}</div></section>
    <section className="rounded-[32px] bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white sm:flex sm:items-center sm:justify-between"><div><FiBookOpen className="h-9 w-9 text-emerald-100"/><h2 className="mt-4 text-2xl font-black">Birinchi darsga tayyormisiz?</h2><p className="mt-2 text-emerald-50">Fanni tanlang, qisqa nazariyani o‘qing va progressingizni saqlang.</p></div><Link to="/subjects" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-emerald-700 sm:mt-0">Boshlash <FiArrowRight/></Link></section>
  </div>
}
