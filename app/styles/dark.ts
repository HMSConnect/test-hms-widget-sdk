import { red } from '@material-ui/core/colors'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { generateDarkAndLight } from './utils'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    action: {
      active: '#fff',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
    },
    text: {
      disabled: 'rgba(255, 255, 255, 0.5)',
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    primary: {
      main: '#BB86FC',
    },
    secondary: {
      main: '#03DAC6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    tertiary: generateDarkAndLight(
      {
        main: '#e57373',
      },
      true,
      0.6,
      0.3,
    ),
    quaternary: generateDarkAndLight(
      {
        main: '#c62828',
      },
      true,
      0.6,
      0.3,
    ),
    quinary: generateDarkAndLight(
      {
        main: '#00b0ff',
      },
      true,
      0.6,
      0.3,
    ),
    senary: generateDarkAndLight(
      {
        main: '#afb42b',
      },
      true,
      0.6,
      0.3,
    ),
    septenary: generateDarkAndLight(
      {
        main: '#558b2f',
      },
      true,
      0.6,
      0.3,
    ),
    octonary: generateDarkAndLight(
      {
        main: '#afb42b',
      },
      true,
      0.6,
      0.3,
    ),
    nonary: generateDarkAndLight(
      {
        main: '#5c6bc0',
      },
      true,
      0.6,
      0.3,
    ),
    denary: generateDarkAndLight(
      {
        main: '#c37d0e',
      },
      true,
      0.6,
      0.3,
    ),
    eleventh: generateDarkAndLight(
      {
        main: '#7e57c2',
      },
      true,
      0.6,
      0.3,
    ),
    duodenary: generateDarkAndLight(
      {
        main: '#3d5afe',
      },
      true,
      0.6,
      0.3,
    ),
    divider: 'rgba(255, 255, 255, 0.12)',
  },
})

export default responsiveFontSizes(theme)
