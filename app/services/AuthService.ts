import IAdapter from '@adapters/IAdapter'
import axios from 'axios'

import cookie from 'js-cookie'
import decode from 'jwt-decode'
import nextCookie from 'next-cookies'
import routes from '../routes'

class AuthService {
  defaultAdatper: IAdapter | null = null
  AUTH_ACCESS_TOKEN_KEY = 'hms_access_token'
  AUTH_REFRESH_TOKEN_KEY = 'hms_refresh_token'

  setDefaultAdapter(adapter: IAdapter) {
    this.defaultAdatper = adapter
  }

  getToken = (ctx: any) => {

    // [TODO]
    //
    // - If token not found in cookie, 
    //   let's them auth or login again.

    const cookies = nextCookie(ctx)
    const token = ctx.query[this.AUTH_ACCESS_TOKEN_KEY]

    return token || cookies[this.AUTH_ACCESS_TOKEN_KEY]
  }

  getMockToken = () => {
    return 'awdawdawd'
  }

  assignAuthDataIfApplicable = (ctx: any, onInvalidToken?: any) => {

    // [TODO]
    // [x] Change method name "validToken" to isTokenExpired
    // [x] Create new function name "validToken" to validate token via IAS server
    // [x] Using (isTokenExpired && validToken) or validToken only to confirm token is validated

    const token = this.getToken(ctx)
    // // If there's no token, it means the user is not logged in.
    // // if (!token || !this.isTokenExpired(token)) {
    // if (!token) {
    //   if (onInvalidToken) {
    //     onInvalidToken()
    //   } else {
    //     this.redirect(ctx)
    //   }
    //   return
    // }

    return new Promise((resolve, reject) => {
      this.validToken(token, (err, isAuth) => {
        if(err!=null || isAuth==false) { 
          if (typeof onInvalidToken === 'function') {
            onInvalidToken()
          } else {
            this.redirect(ctx)
          }
        } else {
          resolve(token)
        }
      })
    });

    // return token
  }

  redirect = (ctx: any, url?: string) => {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: url || '/login' })
      ctx.res.end()
    } else {
      routes.Router.pushRoute(url || '/login')
    }
  }

  validToken = (token?: string, callback?: (err: any, isAuth: boolean) => any ) => {
    try {
      // "axios.get(...)" supports request method 'GET' with header but "axios(...)" not
      axios.get(`${process.env.IAS_AUTH_URI}`, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      ).then((r) => {
        if(typeof callback === 'function') callback(null, r.data.application!=null);
      }).catch((err) => {
        if(typeof callback === 'function') callback(err, false);
      })
    } catch(err) {
      if(typeof callback === 'function') callback(err, false);
    }
  }

  isTokenExpired = (token?: string, refreshToken?: string | null) => {
    // check token time
    if (!token) {
      return false
    }
    const decoded: any = decode(token)
    const remainingMs = decoded.exp * 1000 - new Date().getTime()
    // console.info('remainingMs awdawd :', remainingMs)
    if (remainingMs <= 0) {
      return false
    }
    return true
  }

  handleAuthChanged = () => {
    // to handle refresh_token
  }

  auth = async (authData: any, callback?: (err: any, token: any) => any ) => {
    const data = {
      username: authData && authData.username ? authData.username : '',
      password: authData && authData.password ? authData.password : '',
      client_id: "fhJz2oAxyBVke52qE1babAfr",
      client_secret: "S9gIPrZnYtTVlZ3b6qyB4H1GuKl3vXs5svgvwwOsyolTCTBw",
      grant_type: "password"
    };
    // console.log('Auth request :', data);
    axios({
      method:'POST',
      url: process.env.IAS_GET_TOKEN_URI,
      data: data
    }).then((r) => {
      if(typeof callback === 'function') callback(null, r.data);
    }).catch((err) => {
      if(typeof callback === 'function') callback(err, null);
    })
  }

  login = async (authData: any, successCallback?: any, errorCallBack?: any) => {
    try {
      if (!this.defaultAdatper) {
        return
      }

      // [TODO]
      // - Connect to IAS server instead

      
      // const json: any = await this.defaultAdatper.doRequest(
      //   `api/login`,
      //   authData,
      // )
      // const token = json.token
      // const token = this.getMockToken()

      this.auth(authData, (err, token) => {
        if(err || token==null) {
          if (errorCallBack) {
            errorCallBack('Authentication fail.')
          }
        } else {
          cookie.set(this.AUTH_ACCESS_TOKEN_KEY, token.access_token)
          if (successCallback) {
            successCallback()
          }
        }
      });

    } catch (e) {
      console.info('error: ', e)
      if (errorCallBack) {
        errorCallBack(e)
      }
    }
  }

  logout = (callback?: any) => {
    cookie.remove(this.AUTH_ACCESS_TOKEN_KEY)
    // to support logging out from all windows
    console.info('logout: ')
    window.localStorage.setItem('logout', Date.now().toString())
    if (callback) {
      callback()
    } else {
      routes.Router.pushRoute('/login')
    }
  }
}

export default new AuthService()
