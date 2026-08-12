import { BarChart3, TrendingUp } from 'lucide-react'

const leaderboard = [
  { name: 'Nilufar', score: 152, rank: 1 },
  { name: 'Akmal', score: 138, rank: 2 },
  { name: 'Sardor', score: 124, rank: 3 },
]

export function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-white/80 p-6 shadow-glow backdrop-blur-2xl dark:bg-slate-950/80 dark:border-white/10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-emerald-600">AI Analytics</span>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Leaderboard & Performance Insights</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Platforma foydalanuvchilariga o'z bilimlarini solishtirish va zaif sohalarni aniqlash imkonini beradi.
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-100 p-4 text-center dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Weekly Growth</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">+18%</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/80 p-6 shadow-glow backdrop-blur-2xl dark:bg-slate-950/80 dark:border-white/10">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            <h2 className="text-xl font-semibold">Leaderboard</h2>
          </div>
          <div className="mt-6 space-y-4">
            {leaderboard.map((user) => (
              <div key={user.rank} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Rank #{user.rank}</p>
                  </div>
                  <span className="rounded-3xl bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                    {user.score} ball
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-50/90 p-6 shadow-glow backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <TrendingUp className="h-6 w-6 text-emerald-500" />
            <h2 className="text-xl font-semibold">AI Insights</h2>
          </div>
          <div className="mt-6 space-y-4 rounded-[28px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm text-slate-600 dark:text-slate-300">AI tizimi xatolarni tahlil qilib, eng kuchsiz yo'nalishlaringizni aniqlaydi.</p>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Ona tili: matn tushunish va adabiyot tahlili.</li>
              <li className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Tarix: tarixiy voqealarni ketma-ketlikda eslab qolish.</li>
              <li className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Matematika: mantiqiy masalalar va formulalarni mustahkamlash.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
