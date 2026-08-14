import { FiCheckCircle, FiMail } from 'react-icons/fi'

export function GoogleAccountCard({ profile }) {
  const connected = profile.authProvider === 'google'
  return <section className="card-panel overflow-hidden">
    <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-emerald-50 p-6 dark:border-slate-800 dark:from-blue-500/10 dark:to-emerald-500/10">
      <div className="flex items-center justify-between gap-3"><div><p className="eyebrow text-blue-600">Google akkaunti</p><h2 className="mt-1 text-xl font-bold">Ulangan hisob</h2></div>{connected && <span className="pill flex items-center gap-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"><FiCheckCircle/> Ulangan</span>}</div>
    </div>
    <div className="flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:text-left">
      {profile.photoURL ? <img src={profile.photoURL} alt={`${profile.displayName || profile.name} profili`} referrerPolicy="no-referrer" className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg dark:border-slate-800"/> : <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 text-2xl font-black text-white">{(profile.name || 'U').slice(0, 2).toUpperCase()}</span>}
      <div className="min-w-0"><h3 className="truncate text-xl font-black">{profile.displayName || profile.name}</h3><p className="mt-2 flex items-center justify-center gap-2 break-all text-sm text-slate-500 sm:justify-start"><FiMail className="shrink-0"/>{profile.email}</p><p className="mt-2 text-xs text-slate-400">{connected ? 'Google orqali tizimga kirilgan' : 'Email orqali tizimga kirilgan'}</p></div>
    </div>
  </section>
}
