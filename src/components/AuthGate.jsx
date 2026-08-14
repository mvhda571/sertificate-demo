import { useState } from 'react'
import { FiArrowRight, FiMail, FiUser } from 'react-icons/fi'
import { useUserStore } from '../store/useUserStore'
import { useGoogleAuth } from '../hooks/useGoogleAuth'
import { BrandLogo } from './BrandLogo'

export function AuthGate() {
  const login = useUserStore((state) => state.login)
  const [mode, setMode] = useState('register')
  const [form, setForm] = useState({ name: '', email: '' })
  const { buttonRef, error, isConfigured, retry } = useGoogleAuth()
  const submit = (event) => {
    event.preventDefault()
    login(form)
  }
  return <div className="fixed inset-0 z-[100] grid min-h-screen place-items-center overflow-y-auto bg-slate-950 p-4">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,.2),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.18),transparent_38%)]"/>
    <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white shadow-2xl dark:bg-slate-900 lg:grid-cols-[1.05fr_.95fr]">
      <section className="hidden bg-emerald-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-slate-950/90 shadow-lg"><BrandLogo className="h-11 w-11"/></span><div><b>Certificate Academy</b><p className="text-sm text-emerald-100">Milliy Sertifikat Tayyorgarlik Tizimi</p></div></div>
        <div><p className="text-sm font-bold uppercase tracking-[.25em] text-emerald-100">Milliy sertifikat</p><h1 className="mt-4 text-4xl font-black leading-tight">Bilimingizni aniq reja bilan mustahkamlang.</h1><p className="mt-4 max-w-md leading-7 text-emerald-50">Darsliklar, qisqa konspektlar, progress testlar va real imtihon simulyatsiyasi bir platformada.</p></div>
        <p className="text-sm text-emerald-100">Har bir natija saqlanadi va shaxsiy yo‘nalishingizni shakllantiradi.</p>
      </section>
      <section className="p-6 text-slate-950 dark:text-white sm:p-10">
        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">{[['register','Ro‘yxatdan o‘tish'],['login','Kirish']].map(([key,label])=><button key={key} onClick={()=>setMode(key)} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-bold transition ${mode===key?'bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white':'text-slate-500'}`}>{label}</button>)}</div>
        <h2 className="mt-8 text-3xl font-black">{mode==='register'?'Yangi hisob yarating':'Hisobingizga kiring'}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">Davom etish orqali dars progressi ushbu qurilmada saqlanadi.</p>
        {isConfigured && <><div className="mt-6"><div ref={buttonRef} className="flex min-h-11 w-full justify-center"/>{error && <div role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-center text-xs text-red-600 dark:bg-red-500/10 dark:text-red-300"><p>{error}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Qayta urinish</button></div>}</div><div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200 dark:bg-slate-700"/>yoki email bilan<span className="h-px flex-1 bg-slate-200 dark:bg-slate-700"/></div></>}
        <form onSubmit={submit} className="space-y-4">
          {mode==='register'&&<label className="block"><span className="mb-2 block text-sm font-semibold">Ismingiz</span><span className="relative block"><FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="form-input pl-11" placeholder="Masalan: Muslima"/></span></label>}
          <label className="block"><span className="mb-2 block text-sm font-semibold">Email</span><span className="relative block"><FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="form-input pl-11" placeholder="name@example.com"/></span></label>
          <button className="btn-primary w-full">Davom etish <FiArrowRight/></button>
        </form>
      </section>
    </div>
  </div>
}
