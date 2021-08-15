import { BrowserRouter as Router } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from './contexts/UserContext'
import { Routes } from './Routes'
import { SnackbarProvider } from './contexts/SnackbarContext'

const theme = createTheme()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <Routes />
            </UserProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
