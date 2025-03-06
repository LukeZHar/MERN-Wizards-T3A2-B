import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import { UserAuthContextProvider } from './contexts/UserAuthContext.jsx'
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import { SnackbarProvider } from './contexts/SnackbarContext.jsx';
import { ProfileProvider } from './contexts/ProfileContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider >
      <SnackbarProvider>
        <ProfileProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ProfileProvider>
      </SnackbarProvider>
    </UserAuthContextProvider>
  </StrictMode>,
)