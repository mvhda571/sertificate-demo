import { HiLockClosed, HiSparkles } from 'react-icons/hi'

export function TutorPage() {
  return <div className="relative mx-auto min-h-[650px] max-w-4xl overflow-hidden rounded-3xl">
    <div className="space-y-6 opacity-55"><section className="hero-panel"><p className="eyebrow">Sun’iy intellekt yordamchisi</p><h1 className="page-title">AI Tutor</h1></section><div className="card-panel min-h-[540px] p-6"><div className="h-20 max-w-md rounded-2xl bg-slate-100 dark:bg-slate-800"/><div className="ml-auto mt-5 h-16 max-w-sm rounded-2xl bg-emerald-100 dark:bg-emerald-500/10"/><div className="mt-72 h-14 rounded-xl bg-slate-100 dark:bg-slate-800"/></div></div>
    <div className="absolute inset-0 z-10 grid place-items-center bg-white/45 p-4 backdrop-blur-md dark:bg-slate-950/50"><div className="max-w-md rounded-3xl border border-white/50 bg-white/90 p-8 text-center shadow-2xl dark:border-slate-700 dark:bg-slate-900/90"><span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300"><HiLockClosed className="h-8 w-8"/></span><HiSparkles className="mx-auto mt-5 text-violet-500"/><h2 className="mt-2 text-2xl font-black">AI Tutor tez orada ishga tushadi...</h2><p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-300">Shaxsiy tushuntirish va savol-javob funksiyalari tayyorlanmoqda.</p></div></div>
  </div>
}
