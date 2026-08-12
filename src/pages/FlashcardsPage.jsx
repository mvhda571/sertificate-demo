import { useState } from 'react'
import { ArrowLeft, ArrowRight, Brain, Check, RotateCcw, Sparkles } from 'lucide-react'
import { useAcademyStore } from '../store/academyStore'

const cards = [
  { id: 1, subject: 'Matematika', front: 'Kvadrat tenglama diskriminanti?', back: 'D = b² − 4ac. D > 0 bo‘lsa, ikkita yechim mavjud.' },
  { id: 2, subject: 'Tarix', front: 'O‘zbekiston Respublikasi Konstitutsiyasi qachon qabul qilingan?', back: '1992-yil 8-dekabr.' },
  { id: 3, subject: 'Ona tili', front: 'Sifat nimani bildiradi?', back: 'Predmetning belgisini bildirib, qanday? qanaqa? so‘roqlariga javob beradi.' },
  { id: 4, subject: 'Matematika', front: 'Pifagor teoremasi formulasi?', back: 'To‘g‘ri burchakli uchburchakda: a² + b² = c².' },
  { id: 5, subject: 'Tarix', front: 'Amir Temur qachon tavallud topgan?', back: '1336-yil 9-aprel, Kesh vohasida.' },
]

export function FlashcardsPage() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const { flashcardStatus, setFlashcardStatus } = useAcademyStore()
  const card = cards[index]
  const move = (step) => { setIndex((index + step + cards.length) % cards.length); setFlipped(false) }

  return <div className="space-y-6">
    <section className="hero-panel">
      <div className="flex items-center gap-3"><span className="icon-box bg-blue-50 text-blue-600 dark:bg-blue-500/10"><Brain /></span><div><p className="eyebrow">Xotira kartochkalari</p><h1 className="page-title">Qisqa takrorlash, kuchli xotira</h1></div></div>
      <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400">Formulalar, sanalar va grammatika qoidalarini interaktiv kartalar orqali mustahkamlang.</p>
    </section>
    <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div className="card-panel flex min-h-[520px] flex-col items-center justify-center p-6 sm:p-10">
        <div className="mb-5 flex w-full max-w-2xl items-center justify-between text-sm"><span className="pill bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">{card.subject}</span><span className="text-slate-400">{index + 1} / {cards.length}</span></div>
        <button onClick={() => setFlipped(!flipped)} className="flashcard relative w-full max-w-2xl text-left" aria-label="Kartani aylantirish">
          <div className={`flashcard-inner ${flipped ? 'is-flipped' : ''}`}>
            <div className="flashcard-face bg-slate-900 text-white"><Sparkles className="mb-8 h-8 w-8 text-emerald-400"/><p className="text-xs uppercase tracking-[.25em] text-slate-400">Savol</p><h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{card.front}</h2><p className="mt-auto text-sm text-slate-400">Javobni ko‘rish uchun bosing</p></div>
            <div className="flashcard-face flashcard-back bg-emerald-500 text-white"><Check className="mb-8 h-8 w-8"/><p className="text-xs uppercase tracking-[.25em] text-emerald-100">Javob</p><h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{card.back}</h2></div>
          </div>
        </button>
        <div className="mt-6 flex w-full max-w-2xl flex-wrap justify-between gap-3"><button onClick={() => move(-1)} className="btn-secondary"><ArrowLeft/> Oldingi</button><div className="flex gap-2"><button onClick={() => { setFlashcardStatus(card.id, 'review'); move(1) }} className="btn-review"><RotateCcw/> Qaytarish kerak</button><button onClick={() => { setFlashcardStatus(card.id, 'known'); move(1) }} className="btn-primary"><Check/> Bilaman</button></div><button onClick={() => move(1)} className="btn-secondary">Keyingi <ArrowRight/></button></div>
      </div>
      <aside className="card-panel p-6"><h3 className="font-semibold">Bugungi natija</h3><div className="mt-6 space-y-4"><Stat label="Bilaman" value={Object.values(flashcardStatus).filter(v => v === 'known').length} color="bg-emerald-500"/><Stat label="Qaytarish kerak" value={Object.values(flashcardStatus).filter(v => v === 'review').length} color="bg-orange-500"/><Stat label="Ko‘rilmagan" value={cards.length - Object.keys(flashcardStatus).length} color="bg-slate-300"/></div></aside>
    </section>
  </div>
}

function Stat({ label, value, color }) { return <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"><div className="flex justify-between text-sm"><span>{label}</span><b>{value}</b></div><div className="mt-3 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"><div className={`h-full rounded-full ${color}`} style={{width: `${value * 20}%`}}/></div></div> }
