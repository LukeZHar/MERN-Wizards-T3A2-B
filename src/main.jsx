import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './styles/index.css'
import App from './pages/App.jsx'
import { UserAuthContextProvider } from './contexts/UserAuthContext.jsx'
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserAuthContextProvider>
  </StrictMode>,
)