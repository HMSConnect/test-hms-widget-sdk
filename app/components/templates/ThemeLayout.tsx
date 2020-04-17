import * as React from 'react'

import { setCustomTheme, setTheme } from '@app/actions/theme.action'
import ThemeManager from '@app/styles/ThemeManager'
import LoadingSection from '@components/base/LoadingSection'
import { ThemeOptions, ThemeProvider } from '@material-ui/core'
import { MessageListenerService } from '@services/MessageListenerService'
import { connect } from 'react-redux'

class ThemeLayout extends React.Component<any> {
  componentDidMount() {
    ThemeManager.setDefaultTheme(this.props.defaultTheme)
    this.props.setTheme(this.props.defaultTheme)
    if (typeof window !== 'undefined') {
      MessageListenerService.registerMessage('setTheme', (data: any) => {
        this.props.setTheme(data)
      })
      MessageListenerService.registerMessage('setCustomTheme', (data: any) => {
        this.props.setCustomTheme(data.themeObject, data.themeName)
      })
    }
  }

  render() {
    const { themeType } = this.props
    if (!themeType.themeObject) {
      return <LoadingSection />
    }
    return (
      <ThemeProvider theme={themeType.themeObject}>
        {this.props.children}
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    themeType: state.themeType,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCustomTheme: (themeObject: ThemeOptions, themeName: string) => {
      dispatch(setCustomTheme(themeObject, themeName))
    },
    setTheme: (theme: string) => {
      dispatch(setTheme(theme))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeLayout)
