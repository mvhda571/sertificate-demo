import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  uz: { translation: {
    dashboard:'Bosh sahifa', subjects:'Fanlar', tests:'Sinov testlari', flashcards:'Flashcards', graph:'Bilim xaritasi', tutor:'AI Tutor', results:'Natijalarim', admin:'Teacher panel', leaderboard:'Profil',
    homeSubtitle:'Interaktiv testlar, aqlli tahlil va shaxsiy o‘quv rejasi bilan yuqori sertifikat darajasiga tayyorlaning.',
  }},
  en: { translation: {
    dashboard:'Home', subjects:'Subjects', tests:'Mock exams', flashcards:'Flashcards', graph:'Knowledge map', tutor:'AI Tutor', results:'My results', admin:'Teacher panel', leaderboard:'Profile',
    homeSubtitle:'Prepare for a top certificate grade with interactive exams, smart analytics, and a personalized study plan.',
  }},
}

i18n.use(initReactI18next).init({resources,lng:'uz',fallbackLng:'uz',interpolation:{escapeValue:false}})
export default i18n
