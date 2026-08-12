import { useMemo, useState } from 'react'
import { ArrowLeft, Clock, Save } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useAdminTests } from '../hooks/useAdminTests'
import { useTestStore } from '../store/useTestStore'

export function TestDetailPage() {
  const { id } = useParams(); const { data = [] } = useAdminTests(); const test = data.find(t => t.id === id)
  const [answers, setAnswers] = useState({}); const completeTest = useTestStore(s => s.completeTest); const saveTest = useTestStore(s => s.saveTest)
  const questions = useMemo(() => Array.from({length: 5}, (_,i) => ({id:i+1,text:`${i+1}-savol. Berilgan mavzu bo‘yicha to‘g‘ri javobni belgilang.`, options:['12','18','24','36'], answer:i%4, explanation:'Bu yechim asosiy qoida va formulani ketma-ket qo‘llash orqali topiladi.'})), [])
  if (!test) return <div className="card-panel p-8">Test topilmadi yoki yuklanmoqda.</div>
  const submit = () => { const correct = questions.filter(q => answers[q.id] === q.answer).length; completeTest({id:Date.now(),testId:id,title:test.title,score:correct,percent:correct/5*100,errors:questions.filter(q => answers[q.id] !== q.answer)}); alert(`Natija: ${correct}/5 (${correct/5*100}%)`) }
  return <div className="space-y-6"><Link to="/tests" className="inline-flex items-center gap-2 text-sm text-slate-500"><ArrowLeft className="h-4 w-4"/> Testlarga qaytish</Link><section className="hero-panel flex flex-wrap justify-between gap-4"><div><p className="eyebrow">{test.subject}</p><h1 className="page-title">{test.title}</h1></div><div className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 font-bold text-red-600 dark:bg-red-500/10"><Clock/> 59:42</div></section>{questions.map(q => <div key={q.id} className="card-panel p-6"><h2 className="font-semibold">{q.text}</h2><div className="mt-4 grid gap-2 sm:grid-cols-2">{q.options.map((o,i) => <button key={o} onClick={() => setAnswers(a => ({...a,[q.id]:i}))} className={`rounded-xl border p-3 text-left ${answers[q.id] === i ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10' : 'border-slate-200 dark:border-slate-700'}`}>{String.fromCharCode(65+i)}. {o}</button>)}</div></div>)}<div className="flex justify-end gap-3"><button onClick={() => saveTest(test)} className="btn-secondary"><Save/> Saqlash</button><button onClick={submit} className="btn-primary">Testni yakunlash</button></div></div>
}
