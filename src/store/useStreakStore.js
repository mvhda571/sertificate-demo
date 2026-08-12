import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStreakStore = create(persist((set) => ({
  streak: 7, lastStudyDate: null, dailyChallengeDone: false,
  markStudyDay: () => set((state) => ({ streak: state.lastStudyDate === new Date().toDateString() ? state.streak : state.streak + 1, lastStudyDate: new Date().toDateString() })),
  completeChallenge: () => set({ dailyChallengeDone: true }),
}), { name: 'ncp-streak' }))
