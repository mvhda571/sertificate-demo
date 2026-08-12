import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(persist((set) => ({
  profile: { name: 'Aurora', grade: 'Abituriyent', targetGrade: 'A', telegram: '' },
  points: 1240,
  notifications: true,
  updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  addPoints: (points) => set((state) => ({ points: state.points + points })),
  toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
}), { name: 'ncp-user' }))
