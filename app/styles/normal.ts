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
      main: '#009688',
    },
    secondary: {
      main: '#00b0ff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    tertiary: generateDarkAndLight({
      main: '#ef5350',
    }),
    quaternary: generateDarkAndLight({
      main: '#c62828',
    }),
    quinary: generateDarkAndLight({
      main: '#00b0ff',
    }),
    senary: generateDarkAndLight({
      main: '#afb42b',
    }),
    septenary: generateDarkAndLight({
      main: '#558b2f',
    }),
    octonary: generateDarkAndLight({
      main: '#afb42b',
    }),
    nonary: generateDarkAndLight({
      main: '#5c6bc0',
    }),
    denary: generateDarkAndLight({
      main: '#c37d0e',
    }),
    eleventh: generateDarkAndLight({
      main: '#7e57c2',
    }),
    duodenary: generateDarkAndLight({
      main: '#3d5afe',
    }),
  },
})

export default responsiveFontSizes(theme)
