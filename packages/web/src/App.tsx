import { BrowserRouter as Router } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { UserProvider } from './contexts/UserContext'
import { WebsocketProvider } from './contexts/WebsocketContext'
import { Routes } from './Routes'
import { SnackbarProvider } from './contexts/SnackbarContext'
import { store } from './store'

const theme = createTheme({
  palette: {
    primary: {
      main: '#335482',
      light: '#93afd6',
      dark: '#1F3A55'
    },
    secondary: {
      main: '#E9D597',
      light: '#F3E7C4',
      dark: '#BDAC75'
    }
  }
})

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
      <Provider store={store}>
        <Router>
          <SnackbarProvider>
            <QueryClientProvider client={queryClient}>
              <UserProvider>
                <WebsocketProvider>
                  <Routes />
                </WebsocketProvider>
              </UserProvider>
            </QueryClientProvider>
          </SnackbarProvider>
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default App
