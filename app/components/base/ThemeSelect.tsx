import * as React from 'react'

import { setCustomTheme, setTheme } from '@app/actions/theme.action'
import { useDispatch, useSelector } from 'react-redux'
import SelectOption from './SelectOption'

const ThemeSelect: React.FunctionComponent<any> = () => {
  const state = useSelector((state: any) => {
    return state.themeType
  })
  const [themeName, setThemeName] = React.useState<string>(state.themeName)
  const dispath = useDispatch()

  const onThemeChange = (value: any) => {
    const name = value
    if (value === 'custom') {
      dispath(
        setCustomTheme(
          {
            palette: {
              nonary: { main: '#00bfa5' },
              primary: { main: '#03a9f4' },
              secondary: { main: '#00bfa5' },
            },
          },
          'dark',
        ),
      )
    } else {
      dispath(setTheme(name))
    }
    setThemeName(value)
  }

  return (
    <SelectOption
      label='Theme'
      labelId='theme-select-label'
      id='theme-select'
      value={themeName || 'normal'}
      options={[
        { value: 'normal', label: 'Normal' },
        { value: 'dark', label: 'Dark' },
        { value: 'invert', label: 'Invert' },
        { value: 'custom', label: 'Custom' },
      ]}
      onChange={(
        event: React.ChangeEvent<{ name?: string; value: unknown }>,
      ) => {
        onThemeChange(event.target.value)
      }}
    ></SelectOption>
  )
}
export default ThemeSelect
