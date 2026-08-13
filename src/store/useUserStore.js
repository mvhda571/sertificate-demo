import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(persist((set) => ({
  isAuthenticated: false,
  profile: { name: '', email: '', grade: '6-sinf', targetGrade: 'A', telegram: '' },
  points: 1240,
  notifications: true,
  updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  login: ({ name, email }) => set((state) => ({
    isAuthenticated: true,
    profile: { ...state.profile, name: name || email.split('@')[0], email },
  })),
  logout: () => set({ isAuthenticated: false }),
  addPoints: (points) => set((state) => ({ points: state.points + points })),
  toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
}), { name: 'ncp-user' }))
