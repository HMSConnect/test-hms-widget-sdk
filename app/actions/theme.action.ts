import ThemeManager from '../styles/ThemeManager'

export const setTheme = (themeName: string) => {
  const themeObject = ThemeManager.getThemeObject(themeName)
  return {
    payload: { themeName, themeObject },
    type: 'THEME_CHANGE',
  }
}

export const setCustomTheme = (customThemeObject: any, themeName?: string) => {
  const themeObject = ThemeManager.mergeThemeWithCustomTheme(
    ThemeManager.getThemeObject(themeName),
    customThemeObject,
  )
  return {
    payload: { themeName, themeObject },
    type: 'THEME_CHANGE',
  }
}
