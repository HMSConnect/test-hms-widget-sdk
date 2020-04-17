type ThemeType = 'THEME_CHANGE' | 'THEME_SET'

interface IThemeAction {
  type: ThemeType
  payload: any
}

export const themeInitialState: any = {
  isCustom: false,
  themeName: 'normal',
  themeObject: null,
}
export const themeType = (state = themeInitialState, action: IThemeAction) => {
  switch (action.type) {
    case 'THEME_CHANGE':
      return {
        ...state,
        ...action.payload,
        isCustom: false,
      }
    case 'THEME_SET':
      return {
        ...state,
        isCustom: true,
        themeObject: action.payload,
      }
    default:
      return state
  }
}

export default themeType
