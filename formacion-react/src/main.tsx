import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@tracasa/tracasa-components'
import CustomErrorBoundary from './shared/base/error-boundary.tsx'
import App from './app.tsx'
import './index.css'
import '@tracasa/tracasa-components/styles/navarra';
import './shared/config/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <CustomErrorBoundary>
      <ThemeProvider defaultTheme="avantius">
        <App />
      </ThemeProvider>
    </CustomErrorBoundary>
  </StrictMode>,
)
