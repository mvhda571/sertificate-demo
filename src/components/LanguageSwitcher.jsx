import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '../store/themeStore'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const { language, setLanguage } = useThemeStore()
  const change = (lng) => { setLanguage(lng); i18n.changeLanguage(lng) }
  return <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800"><Languages className="mx-2 h-4 w-4 text-slate-400"/>{['uz','en'].map(lng => <button key={lng} onClick={() => change(lng)} className={`rounded-lg px-2 py-1 text-xs font-bold uppercase ${language === lng ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-700' : 'text-slate-400'}`}>{lng}</button>)}</div>
}
