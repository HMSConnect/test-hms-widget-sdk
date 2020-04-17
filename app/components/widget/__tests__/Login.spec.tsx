import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'
import Login from '../Login'

import AuthService from '@services/AuthService'
import AuthServiceMock from '../../../services/__mocks__/AuthServiceMock'

jest.mock('@services/AuthService', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
    logout: jest.fn(),
  },
}))
describe('Login', () => {
  //   beforeAll(() => {
  // jest.spyOn(AuthService, 'login').mockImplementation(() => {
  //   return EncounterServiceMock as EncounterService
  // })
  //   })

  it('render <Login />', () => {
    const { queryAllByText } = render(<Login />)
    expect(queryAllByText('LOGIN')).toBeTruthy()
  })

  it('onSubmit Login', () => {
    const { queryAllByText, getByTestId } = render(<Login />)
    expect(queryAllByText('LOGIN')).toBeTruthy()
    const uernameElement = getByTestId('username-login-page')
    const passwordElement = getByTestId('password-login-page')
    fireEvent.change(uernameElement, { target: { value: 'admin' } })
    fireEvent.change(passwordElement, { target: { value: 1234 } })

    const submitButtonElement = getByTestId('submit-login-page')

    fireEvent.click(submitButtonElement)
    const loginMock = AuthService.login

    expect(loginMock).toBeCalled()
  })
})
