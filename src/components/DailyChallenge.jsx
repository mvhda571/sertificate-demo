import { CheckCircle2, Trophy } from './AppIcons'
import { toast } from 'sonner'
import { useStreakStore } from '../store/useStreakStore'
import { useUserStore } from '../store/useUserStore'

export function DailyChallenge() {
  const { dailyChallengeDone, completeChallenge } = useStreakStore(); const addPoints = useUserStore(s => s.addPoints)
  const answer = (correct) => { if (dailyChallengeDone) return; if (correct) { completeChallenge(); addPoints(50); toast.success('To‘g‘ri! +50 ball') } else toast.error('Noto‘g‘ri. Yana o‘ylab ko‘ring.') }
  return <div className="card-panel p-6"><div className="flex items-start justify-between"><div className="flex gap-3"><Trophy className="h-6 w-6 text-orange-500"/><div><p className="eyebrow text-orange-500">Kun savoli · +50 ball</p><h3 className="mt-2 font-bold">f(x)=x²−6x+5 funksiyaning minimum qiymati?</h3></div></div>{dailyChallengeDone && <CheckCircle2 className="text-emerald-500"/>}</div><div className="mt-5 grid grid-cols-4 gap-2">{[-5,-4,4,5].map(v => <button disabled={dailyChallengeDone} key={v} onClick={() => answer(v === -4)} className="rounded-xl border border-slate-200 py-2 font-semibold hover:border-orange-400 disabled:opacity-50 dark:border-slate-700">{v}</button>)}</div></div>
}
