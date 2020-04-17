import * as React from 'react'
import getConfig from 'next/config'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
// import theme from '../src/theme'

const { staticFolder } = getConfig().publicRuntimeConfig

class HMSWidgetSDKDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        sheets.getStyleElement(),
        ...React.Children.toArray(initialProps.styles),
      ],
    }

    // const sheets = new ServerStyleSheets();
    // const originalRenderPage = ctx.renderPage;
    // // if(!ctx.res || !ctx.req){
    // //   console.log('gg :');
    // // }
    // ctx.renderPage = () =>
    //     originalRenderPage({
    //     enhanceApp: App => props => sheets.collect(<App {...props} />),
    // });

    // const initialProps = await Document.getInitialProps(ctx);
    // return {
    //     ...initialProps,
    //     // Styles fragment is rendered after the app and page rendering finish.
    //     styles: (
    //         <React.Fragment>
    //             {initialProps.styles}
    //             {sheets.getStyleElement()}
    //         </React.Fragment>
    //     ),
    // };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet='utf-8' />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          {/* PWA primary color */}
          {/* <meta name='theme-color' content={theme.palette.primary.main} /> */}

          <link
            rel='icon'
            href={`${staticFolder}/static/images/favicon.png`}
            type='image/x-icon'
          ></link>

          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
          />
          <link
            rel='stylesheet'
            href='https://api.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css'
          />
          <script
            src='https://kit.fontawesome.com/e99afe3274.js'
            crossOrigin='anonymous'
          ></script>

          <style>{` body { margin:0; padding:0; } `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default HMSWidgetSDKDocument
