import { useEffect, useMemo, useState } from 'react'
import { Flag, Play, RefreshCcw } from '../components/AppIcons'
import { useTestStore } from '../store/useTestStore'
import mathMockData from '../data/mathMockQuestions.json'
import { Link } from 'react-router-dom'
import { examSubjects } from '../utils/examGenerator'
import { ExamProctorModals, useExamProctor } from '../hooks/useExamProctor'

const DURATION = 90 * 60
const verifiedQuestions = mathMockData.filter(question => !question.isSourceError && Number.isInteger(question.correctOption))
const availableVariants = [...new Set(mathMockData.map(question => question.variantId))]
const certificateLevel = percent => {
  if (percent >= 86) return { grade: percent >= 93 ? 'A+' : 'A', label: 'Maksimal natija', tone: 'from-emerald-500 to-teal-600' }
  if (percent >= 70) return { grade: percent >= 78 ? 'B+' : 'B', label: 'Yaxshi natija', tone: 'from-blue-500 to-indigo-600' }
  if (percent >= 55) return { grade: percent >= 62 ? 'C+' : 'C', label: 'Qoniqarli natija', tone: 'from-amber-400 to-orange-500' }
  return { grade: 'O‘tmadi', label: 'Sertifikat berilmaydi', tone: 'from-red-500 to-rose-700' }
}

export function MockTestPage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flags, setFlags] = useState({})
  const [remaining, setRemaining] = useState(DURATION)
  const [submitted, setSubmitted] = useState(false)
  const [view, setView] = useState('catalog')
  const [selectedVariant, setSelectedVariant] = useState(availableVariants[0] || null)
  const proctor = useExamProctor(() => { setSubmitted(false); setView('catalog'); setAnswers({}); setFlags({}); setRemaining(DURATION) })
  const completeTest = useTestStore(state => state.completeTest)
  const questions = useMemo(() => verifiedQuestions.filter(question => question.variantId === selectedVariant).map((question, index) => ({ ...question, number: index + 1 })), [selectedVariant])
  const active = questions[current]

  const result = useMemo(() => {
    const details = questions.map(question => ({ ...question, selectedOption: answers[question.id], correct: answers[question.id] === question.correctOption }))
    const correct = details.filter(item => item.correct).length
    return { details, correct, wrong: questions.length - correct, percent: Math.round(correct / questions.length * 100) }
  }, [answers, questions])

  const submit = () => {
    if (submitted) return
    setSubmitted(true)
    void proctor.finishExam()
    completeTest({ id: Date.now(), testId: `math-uzbmb-${selectedVariant}`, variantId: selectedVariant, type: 'mock', title: `Matematika UZBMB ${selectedVariant}`, score: result.correct, total: questions.length, percent: result.percent, certificateLevel: certificateLevel(result.percent).grade, errors: result.details.filter(item => !item.correct).map(item => ({ ...item, front: item.question, back: item.options[item.correctOption] })) })
  }

  useEffect(() => {
    if (submitted || view !== 'exam') return undefined
    const timer = window.setInterval(() => setRemaining(value => {
      if (value <= 1) { window.clearInterval(timer); window.queueMicrotask(() => setSubmitted(true)); return 0 }
      return value - 1
    }), 1000)
    return () => window.clearInterval(timer)
  }, [submitted, view])

  const reset = () => { setCurrent(0); setAnswers({}); setFlags({}); setRemaining(DURATION); setSubmitted(false) }
  const time = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`
  const certificate = certificateLevel(result.percent)

  if (view === 'catalog') return <div className="space-y-6"><section className="hero-panel"><p className="eyebrow">Mock imtihonlar</p><h1 className="page-title">Test turini tanlang</h1><p className="mt-3 text-sm text-slate-500">Platforma testlari yoki 2025-yil DTM / UZBMB variantlari bo‘yicha bilimlaringizni sinang.</p></section><div className="grid gap-5 md:grid-cols-2"><button onClick={() => setView('platform-subjects')} className="card-panel p-7 text-left transition hover:-translate-y-1 hover:border-emerald-400"><p className="eyebrow">Platforma</p><h2 className="mt-3 text-2xl font-black">Website-ning o‘zidan Mock Exam</h2><p className="mt-2 text-sm text-slate-500">4 ta fan bo‘yicha standart platforma testlari.</p></button><button onClick={() => setView('subjects')} className="card-panel p-7 text-left transition hover:-translate-y-1 hover:border-blue-400"><p className="eyebrow text-blue-600">2025</p><h2 className="mt-3 text-2xl font-black">DTM / UZBMB variantlari Mock Exam</h2><p className="mt-2 text-sm text-slate-500">Yuklangan variantlar bo‘yicha fan tanlang.</p></button></div></div>

  if (view === 'platform-subjects') return <div className="space-y-6"><button onClick={() => setView('catalog')} className="btn-secondary">← Orqaga</button><section className="hero-panel"><p className="eyebrow">Platforma Mock Exam</p><h1 className="page-title">Fanni tanlang</h1><p className="mt-3 text-sm text-slate-500">Har bir testda 20 ta aralashtirilgan savol mavjud.</p></section><div className="grid gap-5 sm:grid-cols-2">{examSubjects.map(subject => <Link key={subject.id} to={`/tests/${subject.id}`} className="card-panel p-6 transition hover:-translate-y-1 hover:border-emerald-400"><h2 className="text-xl font-black">{subject.title}</h2><p className="mt-2 text-sm text-slate-500">20 savol · Platforma testi</p><span className="btn-primary mt-5">Testni ochish</span></Link>)}</div></div>

  if (view === 'subjects') return <div className="space-y-6"><button onClick={() => setView('catalog')} className="btn-secondary">← Orqaga</button><section className="hero-panel"><p className="eyebrow">2025-yil DTM / UZBMB</p><h1 className="page-title">Fanni tanlang</h1></section><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><button onClick={() => setView('variants')} className="card-panel border-blue-200 p-6 text-left hover:border-blue-500"><b className="text-xl">Matematika</b><p className="mt-2 text-sm text-emerald-600">Faol · {availableVariants.length} ta variant</p></button>{['Fizika','Ona tili va adabiyot','Ingliz tili','Tarix','Biologiya'].map(subject => <button key={subject} onClick={() => window.alert('Tez kunda...')} className="card-panel cursor-not-allowed bg-slate-100 p-6 text-left opacity-60 dark:bg-slate-900"><b>{subject}</b><p className="mt-2 text-sm">Tez kunda...</p></button>)}</div></div>

  if (view === 'variants') return <div className="space-y-6"><ExamProctorModals proctor={proctor}/><button onClick={() => setView('subjects')} className="btn-secondary">← Fanlarga qaytish</button><section className="hero-panel"><p className="eyebrow text-blue-600">Matematika · 2025</p><h1 className="page-title">DTM / UZBMB variantini tanlang</h1><p className="mt-3 text-sm text-slate-500">Faqat matematik tekshiruvdan o‘tgan savollar imtihonga kiritiladi.</p></section>{availableVariants.length===0?<div role="status" className="card-panel p-8 text-center"><p className="font-bold">Variantlar yuklanmoqda...</p></div>:<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{availableVariants.map(variantId => { const validCount=verifiedQuestions.filter(question=>question.variantId===variantId).length; return <button key={variantId} onClick={() => proctor.askStart(() => { setSelectedVariant(variantId); setCurrent(0); setAnswers({}); setFlags({}); setRemaining(DURATION); setSubmitted(false); setView('exam') })} className="card-panel p-6 text-left transition hover:-translate-y-1 hover:border-blue-500"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">2025</span><h2 className="mt-4 text-2xl font-black">Variant {variantId} - {validCount} ta savol</h2><span className="btn-primary mt-5">Testni boshlash</span></button>})}</div>}</div>

  if (!questions.length) return <section className="card-panel p-10 text-center"><h1 className="text-2xl font-black">Savollar import qilinmagan</h1><p className="mt-2 text-slate-500">Avval matematika savollari JSON bazasini to‘ldiring.</p></section>

  return <div className="space-y-6">
    <ExamProctorModals proctor={proctor}/>
    {!submitted && <div className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">Savol ID: {active.id}</div>}
    {submitted && <section className={`rounded-3xl bg-gradient-to-br ${certificate.tone} p-7 text-center text-white shadow-xl`}><p className="text-xs font-bold uppercase tracking-[.25em] opacity-80">Taxminiy sertifikat darajasi</p><b className="mt-3 block text-5xl">{certificate.grade}</b><p className="mt-2 font-semibold">{certificate.label} · {result.percent}%</p></section>}
    <section className="hero-panel flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">2025-yil DTM / UZBMB formati</p><h1 className="page-title">Matematika Mock Test</h1><p className="mt-3 text-sm text-slate-500">{questions.length} savol · 90 daqiqa · har bir savolda 4 ta variant</p></div><div className={`rounded-2xl px-6 py-4 text-center ${remaining < 600 ? 'bg-red-50 text-red-600 dark:bg-red-500/10' : 'bg-slate-100 dark:bg-slate-800'}`}><p className="text-xs font-bold uppercase tracking-wider">Qolgan vaqt</p><b className="mt-1 block text-3xl tabular-nums">{time}</b></div></section>

    {submitted ? <section className="card-panel p-6 sm:p-8"><div className="grid gap-4 text-center sm:grid-cols-3"><Result label="To‘g‘ri" value={result.correct} color="text-emerald-600"/><Result label="Noto‘g‘ri / bo‘sh" value={result.wrong} color="text-red-500"/><Result label="Umumiy ball" value={`${result.percent}%`} color="text-blue-600"/></div><div className="mt-8 space-y-3">{result.details.map(item => <article key={item.id} className={`rounded-2xl border p-4 ${item.correct ? 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-500/5' : 'border-red-200 bg-red-50/50 dark:bg-red-500/5'}`}><p className="font-semibold">{item.number}. {item.question}</p><p className="mt-2 text-sm text-slate-500">Sizning javobingiz: {item.selectedOption == null ? 'Javob berilmagan' : item.options[item.selectedOption]}</p>{!item.correct && <p className="mt-1 text-sm font-semibold text-emerald-600">To‘g‘ri javob: {item.options[item.correctOption]}</p>}</article>)}</div><button onClick={reset} className="btn-primary mt-6"><RefreshCcw/> Qayta boshlash</button></section> : <section className="grid gap-6 xl:grid-cols-[1fr_340px]"><article className="card-panel p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold text-emerald-600">Savol {active.number} / {questions.length}</p><h2 className="mt-3 text-xl font-bold leading-8">{active.question}</h2>{active.questionImageUrl && <img src={active.questionImageUrl} alt="Savol chizmasi" className="mt-4 max-h-72 rounded-xl object-contain"/>}</div><button onClick={() => setFlags(value => ({...value,[active.id]:!value[active.id]}))} className={`icon-button shrink-0 ${flags[active.id] ? 'bg-amber-300 text-slate-900' : ''}`} aria-label="Savolni belgilash"><Flag/></button></div><div className="mt-7 grid gap-3">{active.options.map((option,index) => <button key={option} onClick={() => setAnswers(value => ({...value,[active.id]:index}))} className={`rounded-2xl border p-4 text-left transition ${answers[active.id] === index ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200' : 'border-slate-200 hover:border-emerald-300 dark:border-slate-700'}`}><b className="mr-3">{String.fromCharCode(65 + index)}.</b>{option}</button>)}</div><div className="mt-7 flex justify-between"><button disabled={current === 0} onClick={() => setCurrent(value => value - 1)} className="btn-secondary disabled:opacity-40">Oldingi</button><button disabled={current === questions.length - 1} onClick={() => setCurrent(value => value + 1)} className="btn-primary disabled:opacity-40">Keyingi</button></div></article><aside className="card-panel h-fit p-5"><h3 className="font-bold">Savollar palitrasi</h3><div className="mt-4 grid grid-cols-5 gap-2">{questions.map((question,index) => <button key={question.id} onClick={() => setCurrent(index)} className={`rounded-xl border py-2 text-sm font-bold ${current === index ? 'ring-2 ring-emerald-500' : ''} ${question.id in answers ? 'border-emerald-500 bg-emerald-500 text-white' : flags[question.id] ? 'border-amber-400 bg-amber-200 text-slate-900' : 'border-slate-200 dark:border-slate-700'}`}>{question.number}</button>)}</div><p className="mt-5 text-sm text-slate-500">Javoblangan: {Object.keys(answers).length}/{questions.length}</p><button onClick={submit} className="btn-primary mt-5 w-full"><Play/> Testni yakunlash</button></aside></section>}
  </div>
}

function Result({ label, value, color }) {
  return <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800"><p className="text-sm text-slate-500">{label}</p><b className={`mt-2 block text-3xl ${color}`}>{value}</b></div>
}
