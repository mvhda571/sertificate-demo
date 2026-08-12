import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTestStore = create(persist((set) => ({
  savedTests: [], errorLog: [], attempts: [],
  saveTest: (test) => set((state) => ({ savedTests: state.savedTests.some((item) => item.id === test.id) ? state.savedTests : [...state.savedTests, test] })),
  completeTest: (attempt) => set((state) => ({ attempts: [attempt, ...state.attempts], errorLog: [...attempt.errors, ...state.errorLog].slice(0, 50) })),
  clearErrors: () => set({ errorLog: [] }),
}), { name: 'ncp-tests' }))
