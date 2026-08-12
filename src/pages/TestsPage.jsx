import { AlertCircle, ArrowRight, Clock, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdminTests } from '../hooks/useAdminTests'

export function TestsPage() {
  const { data, isLoading, isError, refetch } = useAdminTests()
  if (isLoading) return <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-36 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"/>)}</div>
  if (isError) return <div className="card-panel p-10 text-center"><AlertCircle className="mx-auto text-red-500"/><h2 className="mt-3 font-bold">Testlarni yuklab bo‘lmadi</h2><button onClick={refetch} className="btn-primary mt-4">Qayta urinish</button></div>
  return <div className="space-y-6"><section className="hero-panel"><p className="eyebrow">BMBA formatida</p><h1 className="page-title">Smart sinov testlari</h1><p className="mt-2 text-sm text-slate-500">Qat’iy taymer, avtomatik ball va sertifikat darajasi.</p></section><div className="grid gap-4">{data.map(test => <article key={test.id} className="card-panel flex flex-col gap-5 p-5 sm:flex-row sm:items-center"><span className="icon-box bg-blue-50 text-blue-600 dark:bg-blue-500/10"><FileText/></span><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold">{test.title}</h2><span className="pill bg-orange-50 text-orange-600 dark:bg-orange-500/10">{test.difficulty}</span></div><p className="mt-2 flex gap-4 text-sm text-slate-500"><span>{test.questions} savol</span><span className="flex items-center gap-1"><Clock className="h-4 w-4"/>{test.minutes} daqiqa</span><span>{test.attempts} urinish</span></p></div><Link to={`/tests/${test.id}`} className="btn-primary">Boshlash <ArrowRight/></Link></article>)}</div></div>
}
