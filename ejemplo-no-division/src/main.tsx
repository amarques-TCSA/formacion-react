import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@tracasa/tracasa-components'
import CustomErrorBoundary from './shared/base/error-boundary.tsx'
import App from './App.tsx'
import '@tracasa/tracasa-components/styles';
import '@tracasa/tracasa-components/styles/navarra';
import './shared/config/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      experimental_prefetchInRender: false,
    },
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomErrorBoundary>
      <ThemeProvider defaultTheme="navarra">
        <QueryClientProvider client={queryClientConfig}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </CustomErrorBoundary>
  </StrictMode>,
)
