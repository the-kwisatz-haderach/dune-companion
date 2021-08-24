import { createTheme } from '@material-ui/core'

export const theme = createTheme({
  typography: {
    h3: {
      fontSize: 24,
      fontWeight: 500
    },
    h4: {
      fontSize: 20,
      fontWeight: 500
    },
    caption: {
      color: '#a7a7a7',
      textTransform: 'uppercase'
    }
  },
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
