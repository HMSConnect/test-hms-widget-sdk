import AuthService from '@services/AuthService'
import * as React from 'react'
import routes from '../../routes'

export const withAuthSync = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const syncLogout = (event: any) => {
      if (event.key === 'logout') {

        // [TODO]
        // 
        // [ ] Calling to logout API or clear cookies

        AuthService.logout(() => {
          routes.Router.pushRoute('/login')
        })
      }
    }

    React.useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx: any) => {
    let callbackIfEmbeddedWidget
    if (ctx.req && ctx.req.url.includes('embedded-widget')) {
      callbackIfEmbeddedWidget = () => {
        
        // [TODO] 
        //
        // [x] Chnage '/login' to warning page 
        //     about token expire, require refresh or something 
        // [x] Create that page
        // [ ] Modify "assignAuthDataIfApplicable"

        AuthService.redirect(ctx, '/invalid-token')
      }
    } else {
      callbackIfEmbeddedWidget = () => {
        AuthService.redirect(ctx, '/login')
      }
    }
    const token = await AuthService.assignAuthDataIfApplicable(
      ctx,
      callbackIfEmbeddedWidget,
    )

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return Wrapper
}
