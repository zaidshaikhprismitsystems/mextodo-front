import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//@ts-ignore
import SettingsProvider from './context/settingsContext.tsx';
import './index.css'
import './language/i18n.ts'
import App from './App.tsx'
import 'nprogress/nprogress.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'simplebar-react/dist/simplebar.min.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </StrictMode>,
)