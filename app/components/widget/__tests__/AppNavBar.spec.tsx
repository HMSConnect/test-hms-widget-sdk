import * as React from 'react'

import themeType, { themeInitialState } from '@app/reducers-redux/theme.reducer'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import AuthService from '@services/AuthService'
import { fireEvent } from '@testing-library/react'
import * as useRedux from 'react-redux'
import { createStore } from 'redux'
import AppNavBar from '../AppNavBar'

jest.mock('@services/AuthService', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
    logout: jest.fn(),
  },
}))

describe('<AppNavBar />', () => {
  it('render <AppNavBar />', () => {
    const dispatch = jest.spyOn(useRedux, 'useDispatch') as any
    const dispatchFn = jest.fn()
    dispatch.mockImplementation((params: any) => dispatchFn)
    const { queryAllByText } = renderWithRedux(<AppNavBar />, {
      initialState: {},
      store: createStore(themeType, {
        themeType: themeInitialState,
      }),
    })
    expect(queryAllByText('HMS Widget')).toBeTruthy()
  })

  it('logout <AppNavBar />', () => {
    const dispatch = jest.spyOn(useRedux, 'useDispatch') as any
    const dispatchFn = jest.fn()
    dispatch.mockImplementation((params: any) => dispatchFn)

    const { queryAllByText, getByTestId } = renderWithRedux(<AppNavBar />, {
      initialState: {},
      store: createStore(themeType, {
        themeType: themeInitialState,
      }),
    })
    expect(queryAllByText('HMS Widget')).toBeTruthy()
    const logoutButtonElement = getByTestId('logout-app-nav-bar')

    fireEvent.click(logoutButtonElement)
    const logoutMock = AuthService.logout

    expect(logoutMock).toBeCalled()
  })
})
