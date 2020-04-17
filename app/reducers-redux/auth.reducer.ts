interface IAuthData {
  type: any
  payload: any
}

const authData = {
  isLogin: true,
  token: null,
}

const auth = (state = authData, action: IAuthData) => {
  switch (action.type) {
    case 'UPDATE_AUTH_DATA':
      return {
        ...state,
      }
    case 'LOGIN':
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLogin: false,
        token: null,
      }
    default:
      return state
  }
}

export default auth
