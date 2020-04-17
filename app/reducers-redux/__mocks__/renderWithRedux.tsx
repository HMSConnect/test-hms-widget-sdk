import * as React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

interface IReduxStoreMock {
  initialState: any
  store: any
}
export function renderWithRedux(
  ui: any,
  reduxConfig: IReduxStoreMock = {
    initialState: {},
    store: {},
  },
  //   {
  //     initialState = {},
  //     store = createStore(reducer, {
  //       patientAllergyList: initialState,
  //     }),
  //   }: any = {},
) {
  if (!reduxConfig) {
    return render(ui)
  }
  return {
    ...render(<Provider store={reduxConfig.store}>{ui}</Provider>),
    store: reduxConfig.store,
  }
}
