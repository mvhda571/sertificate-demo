import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStreakStore = create(persist((set) => ({
  streak: 0, lastStudyDate: null, dailyChallengeDone: false,
  markStudyDay: () => set((state) => {
    const today = new Date().toISOString().slice(0, 10)
    if (state.lastStudyDate === today) return state
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const continued = state.lastStudyDate === yesterday.toISOString().slice(0, 10)
    return { streak: continued ? state.streak + 1 : 1, lastStudyDate: today }
  }),
  completeChallenge: () => set({ dailyChallengeDone: true }),
}), {
  name: 'ncp-streak',
  version: 2,
  migrate: (state, version) => version < 2 ? { ...state, streak: 0, lastStudyDate: null } : state,
}))
