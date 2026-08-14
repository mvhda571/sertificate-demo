import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useUserStore } from './useUserStore'
import { useStreakStore } from './useStreakStore'
import { notifyLessonXp, notifyStreak } from '../utils/rewardNotifications'

export const useLearningStore = create(persist((set) => ({
  completed: {},
  completedCourses: {},
  completeLesson: (subjectId, lessonId) => set((state) => {
    const key = `${subjectId}:${lessonId}`
    if (state.completed[key]) return state
    const previousStudyDate = useStreakStore.getState().lastStudyDate
    useUserStore.getState().addPoints(100)
    useStreakStore.getState().markStudyDay()
    const streakState = useStreakStore.getState()
    notifyLessonXp(100)
    if (streakState.lastStudyDate !== previousStudyDate) notifyStreak(streakState.streak)
    return { completed: { ...state.completed, [key]: true } }
  }),
  completeCourse: (subjectId) => set((state) => ({ completedCourses: { ...state.completedCourses, [subjectId]: true } })),
}), { name: 'certificate-learning' }))
