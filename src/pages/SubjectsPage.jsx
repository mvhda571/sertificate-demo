import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { HiArrowRight, HiBookOpen, HiLockClosed } from 'react-icons/hi'
import { SiLibreofficemath } from 'react-icons/si'
import { subjects } from '../data/curriculum'
import { useUserStore } from '../store/useUserStore'

export function SubjectsPage() {
  const grid = useRef(null)
  const selectedGrade = useUserStore(state => state.profile.grade?.match(/\d+/)?.[0])

  useEffect(() => {
    const context = gsap.context(() => gsap.fromTo('[data-subject-card]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: .07, duration: .5 }), grid)
    return () => context.revert()
  }, [])

  return <div className="space-y-8">
    <section className="hero-panel overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.13),transparent_36%)]">
      <p className="eyebrow">{selectedGrade ? `${selectedGrade}-sinf o‘quv dasturi` : 'Barcha sinflar o‘quv dasturi'}</p>
      <h1 className="page-title">Fanlar va darsliklar</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-300">{selectedGrade ? `${selectedGrade}-sinf darsliklari va mashg‘ulotlari.` : 'Barcha sinf darsliklari va mashg‘ulotlari.'} Har uch darsdan so‘ng aralash Progress Test ochiladi.</p>
    </section>
    <section ref={grid} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {subjects.map(subject => subject.active ? <Link data-subject-card key={subject.id} to={subject.id === 'matematika' ? '/subjects/matematika/grades' : `/subjects/${subject.id}`} className="group card-panel overflow-hidden p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${subject.color} text-white`}>
          {subject.id === 'matematika' ? <SiLibreofficemath className="h-6 w-6"/> : <HiBookOpen className="h-6 w-6"/>}
        </span>
        <h2 className="mt-5 text-xl font-bold">{subject.title}</h2>
        <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-300">{subject.short}</p>
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-emerald-600 dark:border-slate-800">Darslarni ochish <HiArrowRight/></div>
      </Link> : <div data-subject-card key={subject.id} aria-disabled="true" className="relative cursor-not-allowed overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="absolute inset-0 z-10 grid place-items-center bg-white/45 backdrop-blur-sm dark:bg-slate-950/45"><div className="text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900"><HiLockClosed/></span><b className="mt-3 block">Tez orada...</b></div></div>
        <div className="opacity-30"><HiBookOpen className="h-10 w-10"/><h2 className="mt-5 text-xl font-bold">{subject.title}</h2></div>
      </div>)}
    </section>
  </div>
}
