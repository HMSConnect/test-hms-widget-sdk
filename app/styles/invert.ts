import { red } from '@material-ui/core/colors'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { generateDarkAndLight } from './utils'

const theme = createMuiTheme({
  palette: {
    action: {
      hover: '#ddd4',
      selected: '#ddd4',
    },
    text: {
      primary: '#37474f',
      secondary: '#607d8b',
    },
    primary: {
      main: '#ff6977',
    },
    secondary: {
      main: '#ff4f00',
    },
    error: {
      main: '#ef5350',
    },
    background: {
      default: '#fff',
    },
    tertiary: generateDarkAndLight({
      main: '#10acaf',
    }),
    quaternary: generateDarkAndLight({
      main: '#39d7d7',
    }),
    quinary: generateDarkAndLight({
      main: '#ff4f00',
    }),
    senary: generateDarkAndLight({
      main: '#504bd4',
    }),
    septenary: generateDarkAndLight({
      main: '#aa74d0',
    }),
    octonary: generateDarkAndLight({
      main: '#504bd4',
    }),
    nonary: generateDarkAndLight({
      main: '#a3943f',
    }),
    denary: generateDarkAndLight({
      main: '#3c82f1',
    }),
    eleventh: generateDarkAndLight({
      main: '#81a83d',
    }),
    duodenary: generateDarkAndLight({
      main: '#c2a501',
    }),
  },
})

export default responsiveFontSizes(theme)
