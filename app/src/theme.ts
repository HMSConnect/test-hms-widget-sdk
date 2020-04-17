import { red } from '@material-ui/core/colors'
import {
  createMuiTheme,
  responsiveFontSizes,
  SimplePaletteColorOptions,
} from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#fff',
    },
    error: {
      main: red.A400,
    },
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    // tertiary: {
    //   main: '#19857b',
    // },
  },
})

export default responsiveFontSizes(theme)
