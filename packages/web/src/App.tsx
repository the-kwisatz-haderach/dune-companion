import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import { UserProvider } from './contexts/UserContext'
import { DuneProvider } from './dune-react'
import { Routes } from './Routes'
import { SnackbarProvider } from './contexts/SnackbarContext'
import { config } from './config'
import { clientIdStore } from './lib/clientIdStore'
import { theme } from './theme'
import { PromptProvider } from './contexts/PromptContext'
import { GameSettingsProvider } from './contexts/GameSettingsContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarProvider>
          <UserProvider>
            <DuneProvider
              hostUrl={config.HOST_URL}
              clientIdStore={clientIdStore}
            >
              <PromptProvider>
                <GameSettingsProvider>
                  <Routes />
                </GameSettingsProvider>
              </PromptProvider>
            </DuneProvider>
          </UserProvider>
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
