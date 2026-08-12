import { Menu, Moon, Sun } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useThemeStore } from '../store/themeStore'

export function PageHeader({ onMenu }) {
  const { darkMode, toggleDarkMode } = useThemeStore()
  return <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-900 lg:justify-end"><button onClick={onMenu} className="icon-button lg:hidden"><Menu/></button><div className="flex items-center gap-2"><LanguageSwitcher/><button onClick={toggleDarkMode} className="icon-button" aria-label="Mavzuni almashtirish">{darkMode ? <Sun/> : <Moon/>}</button><div className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 text-sm font-bold text-white">MK</div></div></header>
}
