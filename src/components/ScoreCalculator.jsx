import { useMemo, useState } from 'react'
import { Calculator } from './AppIcons'

const weights = { math: 2.1, history: 1.1, language: 1.1 }
const targets = { 'A+': 90, A: 80, 'B+': 70, B: 60 }
export function ScoreCalculator() {
  const [target, setTarget] = useState('A')
  const recommendation = useMemo(() => Math.ceil(targets[target] / 100 * 40), [target])
  return <div className="card-panel p-6"><div className="flex items-center gap-3"><span className="icon-box bg-blue-50 text-blue-600 dark:bg-blue-500/10"><Calculator/></span><div><p className="eyebrow">Maqsad kalkulyatori</p><h3 className="text-lg font-bold">Sertifikat darajasini rejalang</h3></div></div><div className="mt-6 flex gap-2">{Object.keys(targets).map(grade => <button key={grade} onClick={() => setTarget(grade)} className={`flex-1 rounded-xl py-2 text-sm font-bold ${target === grade ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{grade}</button>)}</div><div className="mt-5 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800"><p className="text-sm text-slate-500">{target} daraja uchun tavsiya</p><p className="mt-2 text-3xl font-black">kamida {recommendation}/40</p><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">{Object.entries(weights).map(([key, value]) => <div key={key} className="rounded-xl bg-white p-2 dark:bg-slate-900"><b className="block text-sm">{Math.ceil(recommendation/3)}</b>{key} · {value}x</div>)}</div></div></div>
}
