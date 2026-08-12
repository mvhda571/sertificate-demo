import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAcademyStore = create(
  persist(
    (set) => ({
      flashcardStatus: {},
      dailyQuests: { questions: false, flashcards: false, lesson: false },
      soundEnabled: true,
      streak: 7,
      completedTests: [],
      errorBank: [],
      setFlashcardStatus: (id, status) => set((state) => ({ flashcardStatus: { ...state.flashcardStatus, [id]: status } })),
      toggleQuest: (id) => set((state) => ({ dailyQuests: { ...state.dailyQuests, [id]: !state.dailyQuests[id] } })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      saveTest: (result) => set((state) => ({
        completedTests: [result, ...state.completedTests].slice(0, 10),
        errorBank: result.errors,
      })),
    }),
    { name: 'certificate-academy' },
  ),
)
