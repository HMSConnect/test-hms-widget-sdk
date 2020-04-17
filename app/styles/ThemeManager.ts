import { ThemeOptions } from '@material-ui/core'
import * as _ from 'lodash'
import { generateDarkAndLight } from './utils'
declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    tertiary?: SimplePaletteColorOptions
    quaternary?: SimplePaletteColorOptions
    quinary?: SimplePaletteColorOptions
    senary?: SimplePaletteColorOptions
    septenary?: SimplePaletteColorOptions
    octonary?: SimplePaletteColorOptions
    nonary?: SimplePaletteColorOptions
    denary?: SimplePaletteColorOptions
    eleventh?: SimplePaletteColorOptions
    duodenary?: SimplePaletteColorOptions
  }
  interface Palette {
    tertiary?: SimplePaletteColorOptions
    quaternary?: SimplePaletteColorOptions
    quinary?: SimplePaletteColorOptions
    senary?: SimplePaletteColorOptions
    septenary?: SimplePaletteColorOptions
    octonary?: SimplePaletteColorOptions
    nonary?: SimplePaletteColorOptions
    denary?: SimplePaletteColorOptions
    eleventh?: SimplePaletteColorOptions
    duodenary?: SimplePaletteColorOptions
  }
}
// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface ThemeOptions {
//     tertiary?: SimplePaletteColorOptions
//   }
// }

class ThemeManager {
  private defaultTheme: any

  setDefaultTheme(name: string) {
    this.defaultTheme = name
  }
  getDefaultTheme() {
    return this.defaultTheme
  }

  getThemeObject(name?: string | null) {
    try {
      const themeObject = require(`./${name || this.defaultTheme}`)?.default
      return themeObject
    } catch (e) {
      console.info('error load theme: ', e)
      const themeObject = require(`./${this.defaultTheme}`)?.default
      return themeObject
    }
  }

  mergeThemeWithCustomTheme(
    themeObject: ThemeOptions,
    custhomThemeObject: ThemeOptions,
  ) {
    const newThemeObject = _.reduce(
      custhomThemeObject,
      (acc, value: any, key: string) => {
        let palette = null
        if (key === 'palette') {
          palette = this.createPallete(value)
          return { ...acc, palette }
        }
        return { ...acc, [key]: _.cloneDeep(value) }
      },
      {},
    )
    return _.defaultsDeep(newThemeObject, themeObject)
  }

  createPallete(themeObject: ThemeOptions) {
    return _.reduce(
      themeObject,
      (acc, value: any, key: string) => {
        const isDarkMode = value.type === 'dark' ? true : false
        const themeWithDarkLight = generateDarkAndLight(value, isDarkMode)
        const themeObject: any = themeWithDarkLight
        if (_.has(value, 'dark')) {
          themeObject.dark = themeWithDarkLight.dark
        }
        if (_.has(value, 'light')) {
          themeObject.light = themeWithDarkLight.light
        }
        return { ...acc, [key]: themeObject }
      },
      {},
    )
  }
}

export default new ThemeManager()
