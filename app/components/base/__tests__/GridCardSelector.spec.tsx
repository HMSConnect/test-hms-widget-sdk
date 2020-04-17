import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'
import { DiagnosticCardMock } from '../__mocks__/GridCardSelectorMock'
import GridCardSelector from '../GridCardSelector'

describe('<GridCardSelector />', () => {
  it('render GridCardSelected', () => {
    const { queryByText } = render(
      <GridCardSelector
        i='test'
        componentResource={{ diag: DiagnosticCardMock }}
        restoreComponentName='diag'
      />,
    )
    expect(queryByText('Diagnostic')).toBeTruthy()
  })

  it('render without ComponentName GridCardSelected', () => {
    const { queryByText, queryByTestId } = render(
      <GridCardSelector
        i='test'
        componentResource={{ diag: DiagnosticCardMock }}
        restoreComponentName={undefined}
      />,
    )
    expect(queryByText('Diagnostic')).toBeFalsy()
    expect(queryByTestId('icon-button')).toBeTruthy()
  })
  it('reset card GridCardSelected', () => {
    const onComponentSelect = jest.fn()
    const { queryByText, getByTestId } = render(
      <GridCardSelector
        i='test'
        componentResource={{ diag: DiagnosticCardMock }}
        restoreComponentName='diag'
        onComponentSelect={onComponentSelect}
      />,
    )
    expect(queryByText('Diagnostic')).toBeTruthy()
    const resetButton = getByTestId('reset-icon-button')
    fireEvent.click(resetButton)
    expect(queryByText('Diagnostic')).toBeFalsy()
    expect(onComponentSelect).toBeCalled()
  })
  it('reset without handleComponentSelect card GridCardSelected', () => {
    const { queryByText, getByTestId } = render(
      <GridCardSelector
        i='test'
        componentResource={{ diag: DiagnosticCardMock }}
        restoreComponentName='diag'
      />,
    )
    expect(queryByText('Diagnostic')).toBeTruthy()
    const resetButton = getByTestId('reset-icon-button')
    fireEvent.click(resetButton)
    expect(queryByText('Diagnostic')).toBeFalsy()
  })
  it('select ComponentName GridCardSelected', async () => {
    const onComponentSelect = jest.fn()
    const { queryByText, getByTestId, getByText, container } = render(
      <GridCardSelector
        i='test'
        componentResource={{ diag: DiagnosticCardMock }}
        restoreComponentName={undefined}
        onComponentSelect={onComponentSelect}
      />,
    )
    const iconButtonElement = getByTestId('icon-button')
    expect(queryByText('Diagnostic')).toBeFalsy()
    expect(iconButtonElement).toBeTruthy()

    fireEvent.click(iconButtonElement)

    expect(queryByText('Diag')).toBeTruthy()
    expect(queryByText('Choose Card')).toBeTruthy()

    fireEvent.click(getByText('Diag'))
    expect(onComponentSelect).toBeCalled()
  })
  it('select without handleComponentSelect ComponentName GridCardSelected', async () => {
    const { queryByText, getByTestId, getByText, container } = render(
      <GridCardSelector
        i='test'
        componentResource={{ diag: DiagnosticCardMock }}
        restoreComponentName={undefined}
      />,
    )
    const iconButtonElement = getByTestId('icon-button')
    expect(queryByText('Diagnostic')).toBeFalsy()
    expect(iconButtonElement).toBeTruthy()

    fireEvent.click(iconButtonElement)

    expect(queryByText('Diag')).toBeTruthy()
    expect(queryByText('Choose Card')).toBeTruthy()

    fireEvent.click(getByText('Diag'))
  })
})
