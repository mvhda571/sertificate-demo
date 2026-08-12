import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'
export function NotFoundPage(){return <div className="card-panel grid min-h-[70vh] place-items-center p-8 text-center"><div><p className="text-8xl font-black text-blue-600">404</p><h1 className="mt-4 text-2xl font-bold">Sahifa topilmadi</h1><p className="mt-2 text-slate-500">Bu manzil mavjud emas yoki ko‘chirilgan.</p><Link to="/" className="btn-primary mt-6"><Home/> Bosh sahifa</Link></div></div>}
