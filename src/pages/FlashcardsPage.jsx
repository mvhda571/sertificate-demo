import { useMemo, useState } from 'react'
import { HiArrowLeft, HiArrowRight, HiCheck, HiRefresh, HiSparkles } from 'react-icons/hi'
import { useAcademyStore } from '../store/academyStore'
import { useLearningStore } from '../store/useLearningStore'
import { useTestStore } from '../store/useTestStore'
import { curriculum } from '../data/curriculum'
import { historyGrades } from '../data/historyCurriculum'

function lessonCards(completed) {
  const cards = []
  Object.entries(curriculum).forEach(([subject, lessons]) => lessons.forEach(item => {
    if (!completed[`${subject}:${item.id}`]) return
    item.facts.slice(0, 2).forEach((fact, index) => cards.push({id:`${subject}-${item.id}-${index}`,subject,front:`${item.title}: asosiy faktni ayting.`,back:fact,source:'PDF mavzusi'}))
  }))
  Object.entries(historyGrades).forEach(([grade, data]) => data.lessons.forEach(item => {
    if (!completed[`tarix-${grade}:${item.id}`]) return
    item.facts.slice(0, 2).forEach((fact, index) => cards.push({id:`history-${grade}-${item.id}-${index}`,subject:`Tarix ${grade}-sinf`,front:`${item.title} bo‘yicha muhim fakt?`,back:fact,source:'PDF mavzusi'}))
  }))
  return cards
}

export function FlashcardsPage() {
  const [index,setIndex]=useState(0); const [flipped,setFlipped]=useState(false)
  const completed=useLearningStore(state=>state.completed); const errorLog=useTestStore(state=>state.errorLog)
  const {flashcardStatus,setFlashcardStatus}=useAcademyStore()
  const cards=useMemo(()=>{
    const mistakes=errorLog.map((item,i)=>({id:`mistake-${item.id||i}`,subject:item.topic||'Test xatosi',front:item.front||item.text,back:item.back||item.explanation||item.options?.[item.answer]||'To‘g‘ri javobni mavzudan qayta tekshiring.',source:'Takrorlash uchun'}))
    return [...mistakes,...lessonCards(completed)]
  },[completed,errorLog])
  if(!cards.length)return <div className="space-y-6"><section className="hero-panel"><p className="eyebrow">Aqlli flesh-kartalar</p><h1 className="page-title">Takrorlash banki</h1></section><div className="card-panel p-12 text-center"><HiSparkles className="mx-auto h-10 w-10 text-emerald-500"/><h2 className="mt-4 text-xl font-bold">Kartalar hali shakllanmadi</h2><p className="mt-2 text-sm text-slate-500">Darsni yakunlang yoki test ishlang. PDF faktlari va xato javoblar avtomatik qo‘shiladi.</p></div></div>
  const safeIndex=index%cards.length; const card=cards[safeIndex]; const move=step=>{setIndex((safeIndex+step+cards.length)%cards.length);setFlipped(false)}
  return <div className="space-y-6"><section className="hero-panel"><p className="eyebrow">Aqlli flesh-kartalar</p><h1 className="page-title">PDF faktlari va xatolar takrori</h1><p className="mt-2 text-sm text-slate-500">{errorLog.length} ta test xatosi avtomatik takrorlash bankiga qo‘shilgan.</p></section><div className="card-panel flex min-h-[520px] flex-col items-center justify-center p-6"><div className="mb-5 flex w-full max-w-2xl justify-between text-sm"><span className="pill bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10">{card.subject}</span><span className="text-slate-400">{safeIndex+1}/{cards.length} · {card.source}</span></div><button onClick={()=>setFlipped(!flipped)} className="flashcard relative w-full max-w-2xl text-left"><div className={`flashcard-inner ${flipped?'is-flipped':''}`}><div className="flashcard-face bg-slate-900 text-white"><HiSparkles className="mb-8 h-8 w-8 text-emerald-400"/><p className="text-xs uppercase tracking-widest text-slate-400">Savol</p><h2 className="mt-4 text-2xl font-semibold">{card.front}</h2></div><div className="flashcard-face flashcard-back bg-emerald-500 text-white"><HiCheck className="mb-8 h-8 w-8"/><p className="text-xs uppercase tracking-widest text-emerald-100">Javob</p><h2 className="mt-4 text-2xl font-semibold">{card.back}</h2></div></div></button><div className="mt-6 flex w-full max-w-2xl flex-wrap justify-between gap-2"><button onClick={()=>move(-1)} className="btn-secondary"><HiArrowLeft/> Oldingi</button><button onClick={()=>{setFlashcardStatus(card.id,'review');move(1)}} className="btn-review"><HiRefresh/> Qaytarish</button><button onClick={()=>{setFlashcardStatus(card.id,'known');move(1)}} className="btn-primary"><HiCheck/> Bilaman</button><button onClick={()=>move(1)} className="btn-secondary">Keyingi <HiArrowRight/></button></div><p className="mt-5 text-xs text-slate-400">O‘zlashtirilgan: {cards.length?Math.round(Object.values(flashcardStatus).filter(v=>v==='known').length/cards.length*100):0}%</p></div></div>
}
