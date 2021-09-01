import { Factions } from '@dune-companion/engine'
import { createTheme, Theme } from '@material-ui/core'
import {
  CreateCSSProperties,
  CSSProperties
} from '@material-ui/core/styles/withStyles'

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    [Factions.HOUSE_ATREIDES]: Palette['primary']
    [Factions.HOUSE_HARKONNEN]: Palette['primary']
    [Factions.FREMEN]: Palette['primary']
    [Factions.BENE_GESSERIT]: Palette['primary']
    [Factions.EMPEROR]: Palette['primary']
    [Factions.SPACING_GUILD]: Palette['primary']
  }
  interface PaletteOptions {
    [Factions.HOUSE_ATREIDES]: PaletteOptions['primary']
    [Factions.HOUSE_HARKONNEN]: PaletteOptions['primary']
    [Factions.FREMEN]: PaletteOptions['primary']
    [Factions.BENE_GESSERIT]: PaletteOptions['primary']
    [Factions.EMPEROR]: PaletteOptions['primary']
    [Factions.SPACING_GUILD]: PaletteOptions['primary']
  }
}

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: '3rem',
      fontFamily: 'OrthodoxHerbertarian'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: 'bold'
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 'bold'
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 'bold'
    },
    subtitle1: {
      fontWeight: 'lighter'
    },
    body2: {
      WebkitFontSmoothing: 'antialiased'
    },
    caption: {
      color: '#a7a7a7',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      WebkitFontSmoothing: 'antialiased'
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
    },
    [Factions.HOUSE_ATREIDES]: {
      main: 'hsl(80, 40%, 60%)',
      light: 'hsl(80, 40%, 70%)',
      dark: 'hsl(80, 40%, 25%)',
      contrastText: 'hsl(80, 100%, 93%)'
    },
    [Factions.HOUSE_HARKONNEN]: {
      main: 'hsl(240, 2%, 50%)',
      light: 'hsl(240, 2%, 60%)',
      dark: 'hsl(240, 2%, 10%)',
      contrastText: 'hsl(240, 25%, 92%)'
    },
    [Factions.FREMEN]: {
      main: 'hsl(42, 95%, 65%)',
      light: 'hsl(42, 95%, 80%)',
      dark: 'hsl(42, 95%, 30%)',
      contrastText: 'hsl(42, 100%, 95%)'
    },
    [Factions.BENE_GESSERIT]: {
      main: 'hsl(215, 50%, 65%)',
      light: 'hsl(215, 50%, 70%)',
      dark: 'hsl(215, 50%, 30%)',
      contrastText: 'hsl(215, 100%, 93%)'
    },
    [Factions.EMPEROR]: {
      main: 'hsl(4, 70%, 65%)',
      light: 'hsl(4, 70%, 70%)',
      dark: 'hsl(4, 70%, 30%)',
      contrastText: 'hsl(4, 100%, 94%)'
    },
    [Factions.SPACING_GUILD]: {
      main: 'hsl(22, 73%, 63%)',
      light: 'hsl(22, 73%, 70%)',
      dark: 'hsl(22, 73%, 30%)',
      contrastText: 'hsl(22, 100%, 94%)'
    }
  }
})

export const createFactionStyles = (
  theme: Theme
):
  | CSSProperties
  | CreateCSSProperties<{
      faction?: Factions | undefined
    }> => ({
  border: ({ faction }) =>
    `1px solid ${
      faction ? theme.palette[faction].light : theme.palette.grey[100]
    }`,
  boxShadow: ({ faction }) =>
    `0px 30px 15px -20px ${
      faction ? theme.palette[faction].main : theme.palette.grey[200]
    }`,
  backgroundImage: ({ faction }) =>
    faction
      ? `linear-gradient(175deg, ${theme.palette[faction].main}, ${theme.palette[faction].dark})`
      : `linear-gradient(175deg, ${theme.palette.common.white}, ${theme.palette.grey[100]})`,
  '& *': {
    color: ({ faction }) =>
      faction ? theme.palette[faction].contrastText : theme.palette.common.black
  }
})
