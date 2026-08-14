import { useEffect } from 'react'
import { HiLockClosed, HiPlay } from 'react-icons/hi'
import { toast } from 'sonner'
import { generateMilestoneQuestions } from '../utils/milestoneTests'

export function MilestoneTests({ subjectKey, lessons, completedCount, completedLessonIds = [], courseCompleted = false, onOpen, accent = 'emerald' }) {
  const halfLessonCount = Math.ceil(lessons.length / 2)
  const firstHalf = lessons.slice(0, halfLessonCount)
  const halfCompletedCount = firstHalf.filter(lesson => completedLessonIds.includes(lesson.id)).length
  const halfUnlocked = halfCompletedCount >= halfLessonCount
  const finalUnlocked = completedCount >= lessons.length
  const colors = { emerald:'bg-emerald-600', orange:'bg-orange-500', violet:'bg-violet-600', rose:'bg-rose-600', blue:'bg-blue-600' }

  useEffect(() => {
    const notifyOnce = (stage, message) => {
      const key = `milestone-unlocked:${subjectKey}:${stage}`
      if (!localStorage.getItem(key)) { localStorage.setItem(key, '1'); toast.success(message, { duration: 4000 }) }
    }
    if (halfUnlocked) notifyOnce('half', '50% bosqich yakunlandi — 30 savollik oraliq test ochildi!')
    if (finalUnlocked) notifyOnce('final', '100% bosqich yakunlandi — 60 savollik yakuniy test ochildi!')
  }, [finalUnlocked, halfUnlocked, subjectKey])

  const openHalf = () => onOpen({ title: '50% Oraliq Test · 30 savol', type: 'midterm', questions: generateMilestoneQuestions(firstHalf, 30) })
  const openFinal = () => onOpen({ title: '100% Yakuniy Test · 60 savol', type: 'final', questions: generateMilestoneQuestions(lessons, 60) })
  return <section className="card-panel p-4"><p className="px-1 text-xs font-black uppercase tracking-widest text-slate-400">Bosqich testlari</p><div className="mt-3 grid gap-3 sm:grid-cols-2"><button disabled={!halfUnlocked} onClick={openHalf} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white ${halfUnlocked ? colors[accent] : 'cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800'}`}>{halfUnlocked ? <HiPlay/> : <HiLockClosed/>} Oraliq test (30)</button><button disabled={!finalUnlocked} onClick={openFinal} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white ${finalUnlocked ? 'bg-slate-950 dark:bg-amber-500' : 'cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800'}`}>{finalUnlocked ? <HiPlay/> : <HiLockClosed/>} Yakuniy test (60)</button></div><p className="mt-3 px-1 text-xs text-slate-500">Oraliq: {halfCompletedCount}/{halfLessonCount} · Yakuniy: {completedCount}/{lessons.length}{courseCompleted ? ' · Sinf muvaffaqiyatli yakunlangan' : ''}</p></section>
}
