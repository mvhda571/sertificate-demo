import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster richColors closeButton expand position="top-right" duration={3800} />
  </StrictMode>,
)
