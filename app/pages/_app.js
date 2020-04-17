import * as React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import * as _ from 'lodash'
import App from 'next/app'
import Head from 'next/head'
import 'react-grid-layout/css/styles.css'
import { Provider, connect, useSelector, useDispatch } from 'react-redux'
import 'react-resizable/css/styles.css'
import { AdapterManager } from '../adapters/DataAdapterManager'
import store from '../reducers-redux/index.reducer'
import RouteManager from '../routes/RouteManager'
import { GoogleAnalytics } from '../services/GoogleAnalyticsService'
import { MessageListenerService } from '../services/MessageListenerService'
import ThemeLayoutWithConnect from '../components/templates/ThemeLayout'
class AASApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  constructor(props) {
    super(props)
    let isWaitForIframeLoaded
    if (typeof window !== 'undefined') {
      AdapterManager.createAdapter(_.get(props, 'router.query.mode'))
      isWaitForIframeLoaded =
        _.get(props, 'router.query.isWaitForIframeLoaded') || false
      const pathName = props.router.pathname
      RouteManager.registryMode(pathName)

      MessageListenerService.registerMessage('finishIframeLoading', () => {
        this.setState({
          ...this.state,
          loading: false,
        })
      })

      MessageListenerService.registerMessage('setStructure', data => {
        _.each(data, (value, key) => {
          const type = `SET_STRUCTURE_${_.toUpper(_.snakeCase(key))}`
          store.dispatch({ type, payload: value })
        })
      })

      MessageListenerService.registerMessage('setIframeName', data => {
        MessageListenerService.setIframeName(data)
      })

      MessageListenerService.initialMessageListener()
    }
    this.state = {
      isWaitForIframeLoaded,
      loading: true,
    }
  }
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
    GoogleAnalytics.initializeGoogleGA()
  }

  render() {
    const { Component, pageProps } = this.props
    const { theme, isWaitForIframeLoaded, loading } = this.state
    return (
      <>
        <Provider store={store}>
          <Head>
            <title>HMS Widget SDK</title>
          </Head>
          <ThemeLayoutWithConnect defaultTheme='normal'>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            {isWaitForIframeLoaded ? (
              loading ? (
                <div>Loading...</div>
              ) : (
                <Component {...pageProps} />
              )
            ) : (
              <Component {...pageProps} />
            )}
          </ThemeLayoutWithConnect>
        </Provider>
      </>
    )
  }
}

export default AASApp
