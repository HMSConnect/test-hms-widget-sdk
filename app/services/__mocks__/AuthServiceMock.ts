class AuthServiceMock {
  login = jest.fn()
  logout = jest.fn()
}

export default new AuthServiceMock()
