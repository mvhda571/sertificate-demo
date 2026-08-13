import { useEffect, useMemo, useState } from 'react'
import { Trophy as Award, Download, Flag, Play, RefreshCcw, RotateCcw, XCircle } from '../components/AppIcons'
import { useAcademyStore } from '../store/academyStore'

const questions = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  text: `Savol ${index + 1}: Bu mavzu bo'yicha eng muhim tushunchani aniqlang.`,
  options: ['Variant A', 'Variant B', 'Variant C', 'Variant D'],
  answer: index % 4,
  topic: ['Ona tili', 'Matematika', 'Tarix', 'Umumiy'][index % 4],
}))

const scoreLevel = (score) => {
  if (score >= 34) return 'A'
  if (score >= 28) return 'B+'
  if (score >= 22) return 'B'
  return 'C'
}

const feedbackForTopics = (wrongTopics) => {
  if (!wrongTopics.length) return 'Sizning bilimlaringiz mustahkam. Tayyorlanish darajangiz yuqori.'
  return `Kuchsiz yo'nalishlar: ${[...new Set(wrongTopics)].join(', ')}. Ushbu mavzularni chuqurroq qayta ko'rib chiqing.`
}

export function MockTestPage() {
  const [current, setCurrent] = useState(1)
  const [answers, setAnswers] = useState({})
  const [flags, setFlags] = useState({})
  const [remaining, setRemaining] = useState(30 * 60)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [tab, setTab] = useState('exam')
  const [studentName, setStudentName] = useState('Muslima')
  const { errorBank, saveTest } = useAcademyStore()

  useEffect(() => {
    if (submitted) return undefined
    const timer = setInterval(() => {
      setRemaining((seconds) => {
        if (seconds <= 1) {
          clearInterval(timer)
          setSubmitted(true)
          return 0
        }
        return seconds - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [submitted])

  const currentQuestion = questions.find((q) => q.id === current)

  const answeredCount = Object.keys(answers).length
  const questionButtons = questions.map((question) => {
    const isAnswered = question.id in answers
    const isFlagged = Boolean(flags[question.id])
    return (
      <button
        key={question.id}
        type="button"
        className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
          isAnswered
            ? 'bg-emerald-600 text-white'
            : isFlagged
            ? 'bg-yellow-300 text-slate-900'
            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
        }`}
        onClick={() => setCurrent(question.id)}
      >
        {question.id}
      </button>
    )
  })

  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0')
  const seconds = String(remaining % 60).padStart(2, '0')

  const handleAnswer = (optionIndex) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [current]: optionIndex }))
  }

  const handleToggleFlag = () => {
    setFlags((prev) => ({ ...prev, [current]: !prev[current] }))
  }

  const results = useMemo(() => {
    const correct = questions.filter((question) => answers[question.id] === question.answer).length
    const wrongTopics = questions.filter((question) => answers[question.id] !== undefined && answers[question.id] !== question.answer).map((question) => question.topic)
    return { correct, level: scoreLevel(correct), wrongTopics }
  }, [answers])

  const submitTest = () => {
    const errors = questions.filter((question) => answers[question.id] !== question.answer)
    const result = { id: Date.now(), score: results.correct, level: results.level, date: new Date().toLocaleDateString('uz-UZ'), errors }
    setSubmitted(true)
    setScore(results.correct)
    saveTest(result)
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-white/80 p-6 shadow-glow backdrop-blur-2xl dark:bg-slate-950/80 dark:border-white/10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-emerald-600">Sinov Testlari</span>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">National Certificate Simulator</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">40 savol, real vaqt sinovi. Belgilangan javoblar va flaglar bilan mukammal tayyorlaning.</p>
          </div>
          <div className="rounded-[28px] bg-slate-100 p-4 text-center dark:bg-slate-900">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Qolgan vaqt</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{minutes}:{seconds}</p>
          </div>
        </div>
      </section>

      <div className="no-print flex w-fit gap-1 rounded-2xl bg-white p-1 shadow-sm dark:bg-slate-900">
        <button onClick={() => setTab('exam')} className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === 'exam' ? 'bg-slate-900 text-white dark:bg-emerald-500' : 'text-slate-500'}`}>Imtihon</button>
        <button onClick={() => setTab('errors')} className={`rounded-xl px-4 py-2 text-sm font-semibold ${tab === 'errors' ? 'bg-slate-900 text-white dark:bg-emerald-500' : 'text-slate-500'}`}>Xatolar banki <span className="ml-1 opacity-60">{errorBank.length}</span></button>
      </div>

      {tab === 'errors' ? <section className="card-panel p-6"><div className="flex items-center gap-3"><XCircle className="text-orange-500"/><div><h2 className="text-xl font-semibold">Xatolar banki</h2><p className="text-sm text-slate-500">So‘nggi testdagi xato savollaringiz</p></div></div>{errorBank.length ? <div className="mt-6 grid gap-3">{errorBank.map(q => <div key={q.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"><div className="flex justify-between gap-4"><div><p className="text-xs font-bold uppercase text-orange-500">{q.topic}</p><p className="mt-1 font-medium">{q.text}</p></div><button onClick={() => { setCurrent(q.id); setTab('exam'); setSubmitted(false) }} className="btn-secondary"><RotateCcw/> Qayta ishlash</button></div></div>)}</div> : <p className="mt-8 text-center text-slate-500">Hozircha xatolar yo‘q. Testni yakunlang.</p>}</section> : <>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/80 p-6 shadow-glow backdrop-blur-2xl dark:bg-slate-950/80 dark:border-white/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Savol {currentQuestion.id} / 40</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{currentQuestion.text}</h2>
            </div>
            <button
              type="button"
              onClick={handleToggleFlag}
              className={`inline-flex items-center gap-2 rounded-3xl px-4 py-2 text-sm font-semibold transition ${
                flags[current] ? 'bg-yellow-400 text-slate-900' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              <Flag className="h-4 w-4" /> {flags[current] ? 'Flagged' : 'Flag'}
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[current] === index
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(index)}
                  className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">{option}</span>
                    {isSelected && <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">Tanlandi</span>}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-300">Javoblangan: {answeredCount} / 40</div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrent(Math.max(1, current - 1))}
                className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Oldingi
              </button>
              <button
                type="button"
                onClick={() => setCurrent(Math.min(40, current + 1))}
                className="rounded-3xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Keyingi
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-[32px] border border-white/10 bg-slate-50/90 p-6 shadow-glow backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/80">
          <div className="rounded-[28px] bg-slate-900/95 p-5 text-white shadow-lg dark:bg-slate-950/90">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Natijalar</p>
            <p className="mt-3 text-3xl font-semibold">{results.level}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Baholanadigan qat'iylik bilan o'z bilimingizni baholang.</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="font-semibold text-slate-900 dark:text-white">Tavsiyalar</p>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feedbackForTopics(results.wrongTopics)}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={submitTest}
              className="inline-flex items-center justify-center gap-2 rounded-3xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Play className="h-4 w-4" /> Natijani tekshirish
            </button>
            <button
              type="button"
              onClick={() => {
                setAnswers({})
                setFlags({})
                setSubmitted(false)
                setCurrent(1)
                setRemaining(30 * 60)
                setScore(0)
              }}
              className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <RefreshCcw className="h-4 w-4" /> Qayta boshlash
            </button>
          </div>
        </aside>
      </section>

      </>}

      {submitted && <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/70 p-4"><div className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8"><div className="certificate rounded-[28px] border-2 border-emerald-500 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.18),transparent_35%)] p-7 text-center sm:p-10"><Award className="mx-auto h-14 w-14 text-emerald-500"/><p className="mt-5 text-xs font-bold uppercase tracking-[.3em] text-emerald-600">Certificate Academy</p><h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">Milliy Sertifikat</h2><p className="mt-5 text-sm text-slate-500">Ushbu sertifikat</p><input value={studentName} onChange={e => setStudentName(e.target.value)} className="mx-auto mt-2 block w-full border-b border-slate-300 bg-transparent pb-2 text-center text-2xl font-semibold outline-none dark:border-slate-600"/><p className="mt-5 text-sm text-slate-500">sinov imtihonini muvaffaqiyatli yakunlagani uchun taqdim etildi</p><div className="mx-auto mt-7 flex max-w-sm justify-center gap-8 rounded-2xl bg-slate-900 p-5 text-white"><div><p className="text-xs text-slate-400">Natija</p><b className="text-2xl">{score}/40</b></div><div className="w-px bg-slate-700"/><div><p className="text-xs text-slate-400">Daraja</p><b className="text-2xl text-emerald-400">{results.level}</b></div></div></div><div className="no-print mt-5 flex justify-end gap-3"><button onClick={() => setSubmitted(false)} className="btn-secondary">Yopish</button><button onClick={() => window.print()} className="btn-primary"><Download/> Yuklab olish / Chop etish</button></div></div></div>}

      <section className="rounded-[32px] border border-white/10 bg-white/80 p-6 shadow-glow backdrop-blur-2xl dark:bg-slate-950/80 dark:border-white/10">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Savol palitrasi</h3>
        <div className="mt-5 grid gap-2 sm:grid-cols-6 lg:grid-cols-8">
          {questionButtons}
        </div>
      </section>
    </div>
  )
}
