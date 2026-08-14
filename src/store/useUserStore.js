import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(persist((set) => ({
  isAuthenticated: false,
  profile: { name: '', email: '', displayName: '', photoURL: '', googleId: '', authProvider: 'local', grade: '', targetGrade: 'A', telegram: '' },
  points: 0,
  notifications: true,
  updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  login: ({ name, email }) => set((state) => ({
    isAuthenticated: true,
    profile: { ...state.profile, name: name || email.split('@')[0], displayName: name || email.split('@')[0], email, authProvider: 'local' },
  })),
  loginWithGoogle: ({ email, displayName, photoURL, googleId }) => set((state) => ({
    isAuthenticated: true,
    profile: { ...state.profile, name: displayName, displayName, email, photoURL, googleId, authProvider: 'google' },
  })),
  logout: () => set({ isAuthenticated: false, profile: { name: '', email: '', displayName: '', photoURL: '', googleId: '', authProvider: 'local', grade: '', targetGrade: 'A', telegram: '' }, points: 0 }),
  addPoints: (points) => set((state) => ({ points: state.points + points })),
  toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
}), {
  name: 'ncp-user',
  version: 3,
  migrate: (state, version) => ({
    ...state,
    points: version < 2 ? 0 : state.points,
    profile: { displayName: state.profile?.name || '', photoURL: '', googleId: '', authProvider: 'local', ...state.profile },
  }),
}))
