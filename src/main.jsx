import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App.jsx'

// QueryClient holds the cache for all useQuery calls across the app
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* QueryClientProvider makes React Query available to all components */}
    <QueryClientProvider client={queryClient}>
      {/* ThemeProvider makes theme state available to all components via useContext */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
