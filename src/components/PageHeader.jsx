import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiBookOpen, HiChevronDown, HiCog, HiLogout, HiMenu, HiMoon, HiSun, HiUser } from 'react-icons/hi'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useThemeStore } from '../store/themeStore'
import { useUserStore } from '../store/useUserStore'

function getProgramTitle(pathname, profileGrade) {
  const selectedGrade = pathname.match(/\/subjects\/(?:tarix|matematika|ona-tili|adabiyot)\/grade\/(\d+)/)?.[1]
  if (selectedGrade) return `${selectedGrade}-sinf dasturi`
  if (pathname === '/subjects/tarix' || pathname === '/subjects/ona-tili' || pathname === '/subjects/adabiyot') return 'Sinfni tanlang'
  if (pathname === '/subjects' || pathname === '/fanlar') return 'Fan va sinfni tanlang'
  if (pathname.startsWith('/subjects/')) return `${profileGrade || 'Tanlangan sinf'} dasturi`
  return 'Milliy sertifikat platformasi'
}

export function PageHeader({ onMenu }) {
  const { pathname } = useLocation()
  const { darkMode, toggleDarkMode } = useThemeStore()
  const { profile, logout } = useUserStore()
  const [open, setOpen] = useState(false)
  const profileRef = useRef(null)
  const programTitle = useMemo(() => getProgramTitle(pathname, profile.grade), [pathname, profile.grade])
  const initials = profile.name.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'U'

  useEffect(() => {
    const closeMenu = event => !profileRef.current?.contains(event.target) && setOpen(false)
    document.addEventListener('mousedown', closeMenu)
    return () => document.removeEventListener('mousedown', closeMenu)
  }, [])

  return <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/90 px-3 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-4">
    <div className="flex min-w-0 items-center gap-3">
      <button onClick={onMenu} className="icon-button lg:hidden" aria-label="Menyuni ochish"><HiMenu/></button>
      <Link to="/" className="flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white"><HiBookOpen className="h-5 w-5"/></span><span className="hidden min-w-0 sm:block"><b className="block truncate text-sm">Certificate Academy</b><span className="block truncate text-xs text-slate-400">{programTitle}</span></span></Link>
    </div>
    <div className="flex items-center gap-2">
      <LanguageSwitcher/>
      <button onClick={toggleDarkMode} className="icon-button" aria-label="Rang rejimini almashtirish">{darkMode ? <HiSun/> : <HiMoon/>}</button>
      <div ref={profileRef} className="relative"><button onClick={() => setOpen(value => !value)} className="ml-1 flex items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-slate-100 dark:hover:bg-slate-800" aria-expanded={open}><span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 text-white"><HiUser className="h-5 w-5"/><span className="sr-only">{initials}</span></span><span className="hidden text-left md:block"><b className="block max-w-32 truncate text-sm">{profile.name}</b><span className="block text-[11px] text-slate-400">Abituriyent</span></span><HiChevronDown className={`hidden h-4 w-4 text-slate-400 transition sm:block ${open ? 'rotate-180' : ''}`}/></button>
        {open && <div className="absolute right-0 top-14 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900"><Link onClick={() => setOpen(false)} to="/profile" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"><HiUser/> Profil</Link><Link onClick={() => setOpen(false)} to="/profile" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"><HiCog/> Sozlamalar</Link><button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><HiLogout/> Chiqish</button></div>}
      </div>
    </div>
  </header>
}
