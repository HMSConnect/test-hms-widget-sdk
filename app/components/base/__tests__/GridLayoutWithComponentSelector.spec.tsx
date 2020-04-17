import * as React from 'react'

import {
  act,
  fireEvent,
  render,
  waitForDomChange,
  wait,
} from '@testing-library/react'
import GridLayoutWithComponentSelector from '../GridLayoutWithComponentSelector'
import {
  DefaultContentMock,
  DiagnosticCardMock,
} from '../__mocks__/GridCardSelectorMock'

describe('<GridSelector /> ', () => {
  it('render <GridSelector />', () => {
    const { getByTestId, queryByText } = render(
      <GridLayoutWithComponentSelector
        componentResource={{
          default: { component: DefaultContentMock },
          diag: { component: DiagnosticCardMock },
        }}
        defaultItems={[
          {
            componentKey: 'default',
            h: 4,
            i: 'default',
            w: 4,
            x: 0,
            y: 0,
          },
        ]}
      />,
    )

    expect(getByTestId('grid-selector')).toBeTruthy()
    expect(queryByText('test')).toBeTruthy()
  })

  it('add/reset diag <GridSelector />', async () => {
    const { getByTestId, queryByText, getByText } = render(
      <GridLayoutWithComponentSelector
        componentResource={{
          default: { component: DefaultContentMock },
          diag: { component: DiagnosticCardMock },
        }}
        defaultItems={[
          {
            componentKey: 'default',
            h: 4,
            i: 'default',
            w: 4,
            x: 0,
            y: 0,
          },
          // {
          //   componentKey: 'default',
          //   h: 4,
          //   i: 'diag',
          //   w: 4,
          //   x: 10,
          //   y: 10,
          // },
        ]}
      />,
    )

    expect(getByTestId('grid-selector')).toBeTruthy()
    expect(queryByText('test')).toBeTruthy()

    await act(async () => {
      const addButtonElement = getByTestId('add-button-grid-layout')

      fireEvent.click(addButtonElement)

      await waitForDomChange()

      const diagTextElement = getByText('Diag')

      fireEvent.click(diagTextElement)

      // await waitForDomChange()
      await wait(() => getByText('Diagnostic'))
    })
    expect(queryByText('Diagnostic')).toBeTruthy()

    await act(async () => {
      const resetButtonElement = getByTestId('reset-button-grid-layout')

      fireEvent.click(resetButtonElement)

      await waitForDomChange()
    })

    expect(queryByText('Diagnostic')).toBeFalsy()
  })
})
