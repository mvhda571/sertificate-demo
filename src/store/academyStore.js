import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useUserStore } from './useUserStore'
import { notifyTestReward } from '../utils/rewardNotifications'

export const useAcademyStore = create(
  persist(
    (set) => ({
      flashcardStatus: {},
      dailyQuests: { questions: false, flashcards: false, lesson: false },
      soundEnabled: true,
      streak: 0,
      completedTests: [],
      errorBank: [],
      setFlashcardStatus: (id, status) => set((state) => ({ flashcardStatus: { ...state.flashcardStatus, [id]: status } })),
      toggleQuest: (id) => set((state) => ({ dailyQuests: { ...state.dailyQuests, [id]: !state.dailyQuests[id] } })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      saveTest: (result) => set((state) => {
        const xpEarned = Math.round((Math.max(0, result.score) / Math.max(1, result.total || 40)) * 1000)
        const percent = Math.round((Math.max(0, result.score) / Math.max(1, result.total || 40)) * 100)
        useUserStore.getState().addPoints(xpEarned)
        notifyTestReward(percent, xpEarned)
        return ({
        completedTests: [{ ...result, xpEarned }, ...state.completedTests].slice(0, 10),
        errorBank: result.errors,
      })}),
    }),
    { name: 'certificate-academy' },
  ),
)
