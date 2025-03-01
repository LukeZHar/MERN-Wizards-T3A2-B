import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './pages/App.jsx'
import { UserAuthContextProvider } from './contexts/UserAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider >
      <App />
    </UserAuthContextProvider>
  </StrictMode>,
)
