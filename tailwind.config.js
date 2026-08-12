export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slateNavy: '#0F172A',
        academyEmerald: '#10B981',
        softPurple: '#8B5CF6',
        lightGray: '#F8FAFC',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}
