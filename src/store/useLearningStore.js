import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLearningStore = create(persist((set) => ({
  completed: {},
  completeLesson: (subjectId, lessonId) => set((state) => ({
    completed: { ...state.completed, [`${subjectId}:${lessonId}`]: true },
  })),
}), { name: 'certificate-learning' }))
