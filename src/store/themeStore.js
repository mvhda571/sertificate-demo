import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(persist((set) => ({
  darkMode: false,
  language: 'uz',
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setLanguage: (language) => set({ language }),
}), { name: 'academy-theme' }))
