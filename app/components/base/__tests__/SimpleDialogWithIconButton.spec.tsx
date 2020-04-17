import * as React from 'react'

import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import { ISimpleDialogItem } from '../SimpleDialog'
import SimpleDialogWithIconButton from '../SimpleDialogWithIconButton'

describe('<SimpleDialogWithIconButton />', () => {
  let mockList: ISimpleDialogItem[] = []
  beforeAll(() => {
    mockList = [
      {
        label: 'Test1',
        value: 'test1',
      },
      {
        label: 'Test2',
        value: 'test2',
      },
      {
        label: 'Test3',
        value: 'test3',
      },
    ]
  })
  it('render SimpleDialogWithIconButton', () => {
    const { queryByTestId } = render(
      <SimpleDialogWithIconButton list={mockList} />,
    )
    expect(queryByTestId('icon-button')).toBeTruthy()
  })

  it('render without buttonText SimpleDialogWithIconButton', () => {
    const { queryByTestId } = render(
      <SimpleDialogWithIconButton list={mockList} />,
    )
    expect(queryByTestId('icon-button')).toBeTruthy()
  })

  it('open/close dialog SimpleDialogWithIconButton', async () => {
    const onDialogClose = jest.fn()
    const { queryByTestId, getByText, getByTestId } = render(
      <SimpleDialogWithIconButton
        list={mockList}
        buttonText='Button Test'
        onDialogClose={onDialogClose}
      />,
    )
    expect(queryByTestId('dialog-title')).toBeNull()
    fireEvent.click(getByTestId('icon-button'))
    expect(queryByTestId('dialog-title')).toBeTruthy()
    const dialogElement = getByTestId('dialog')
    fireEvent.keyDown(dialogElement, {
      charCode: 27,
      code: 27,
      key: 'Escape',
    })
    await waitForDomChange({ container: dialogElement })
    expect(queryByTestId('dialog-title')).toBeNull()
    expect(onDialogClose).toBeCalled()
  })
  it('open/close without onDialogClose dialog SimpleDialogWithIconButton', async () => {
    const { queryByTestId, getByTestId } = render(
      <SimpleDialogWithIconButton list={mockList} buttonText='Button Test' />,
    )
    expect(queryByTestId('dialog-title')).toBeNull()
    fireEvent.click(getByTestId('icon-button'))
    expect(queryByTestId('dialog-title')).toBeTruthy()
    const dialogElement = getByTestId('dialog')
    fireEvent.keyDown(dialogElement, {
      charCode: 27,
      code: 27,
      key: 'Escape',
    })
    await waitForDomChange({ container: dialogElement })
    expect(queryByTestId('dialog-title')).toBeNull()
  })
})
