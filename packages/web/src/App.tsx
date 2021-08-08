import { createTheme, ThemeProvider } from '@material-ui/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { WebsocketProvider } from './contexts/WebsocketContext'
import { Routes } from './Routes'

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
    <div className="App">
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <WebsocketProvider>
            <Routes />
          </WebsocketProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
