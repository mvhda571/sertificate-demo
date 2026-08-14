import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  uz: { translation: {
    dashboard:'Bosh sahifa', subjects:'Fanlar', tests:'Sinov testlari', flashcards:'Flashcards', graph:'Bilim xaritasi', tutor:'AI Tutor', results:'Natijalarim', leaderboard:'Reyting', profile:'Profil',
    homeSubtitle:'Interaktiv testlar, aqlli tahlil va shaxsiy o‘quv rejasi bilan yuqori sertifikat darajasiga tayyorlaning.',
  }},
  en: { translation: {
    dashboard:'Home', subjects:'Subjects', tests:'Mock exams', flashcards:'Flashcards', graph:'Knowledge map', tutor:'AI Tutor', results:'My results', leaderboard:'Leaderboard', profile:'Profile',
    homeSubtitle:'Prepare for a top certificate grade with interactive exams, smart analytics, and a personalized study plan.',
  }},
  ru: { translation: {
    dashboard:'Главная', subjects:'Предметы', tests:'Пробные тесты', flashcards:'Карточки', graph:'Карта знаний', tutor:'AI Репетитор', results:'Мои результаты', leaderboard:'Профиль',
    homeSubtitle:'Готовьтесь к высокому уровню сертификата с интерактивными тестами, аналитикой и личным учебным планом.',
  }},
}

i18n.use(initReactI18next).init({resources,lng:'uz',fallbackLng:'uz',interpolation:{escapeValue:false}})
export default i18n
