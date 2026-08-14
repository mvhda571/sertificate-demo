import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useUserStore } from './useUserStore'
import { notifyTestReward } from '../utils/rewardNotifications'

export const useTestStore = create(persist((set) => ({
  savedTests: [], errorLog: [], attempts: [],
  saveTest: (test) => set((state) => ({ savedTests: state.savedTests.some((item) => item.id === test.id) ? state.savedTests : [...state.savedTests, test] })),
  completeTest: (attempt) => set((state) => {
    const xp = Math.round((Math.max(0, Math.min(100, attempt.percent || 0)) / 100) * 1000)
    useUserStore.getState().addPoints(xp)
    notifyTestReward(Math.max(0, Math.min(100, attempt.percent || 0)), xp)
    return { attempts: [{ ...attempt, xpEarned: xp }, ...state.attempts], errorLog: [...(attempt.errors || []), ...state.errorLog].slice(0, 50) }
  }),
  clearErrors: () => set({ errorLog: [] }),
}), { name: 'ncp-tests' }))
