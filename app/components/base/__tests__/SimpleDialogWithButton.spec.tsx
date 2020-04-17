import * as React from 'react'

import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import { ISimpleDialogItem } from '../SimpleDialog'
import { SimpleDialogWithButton } from '../SimpleDialogWithButton'

describe('<SimpleDialogWithButton />', () => {
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
  it('render SimpleDialogWithButton', () => {
    const { queryByText } = render(
      <SimpleDialogWithButton list={mockList} buttonText='Button Test' />,
    )
    expect(queryByText('Button Test')).toBeTruthy()
  })
  it('render without buttonText SimpleDialogWithButton', () => {
    const { queryByText } = render(<SimpleDialogWithButton list={mockList} />)
    expect(queryByText('Dialog Simple Button')).toBeTruthy()
  })

  it('open/close dialog SimpleDialogWithButton', async () => {
    const onDialogClose = jest.fn()
    const { queryByTestId, getByText, getByTestId } = render(
      <SimpleDialogWithButton
        list={mockList}
        buttonText='Button Test'
        onDialogClose={onDialogClose}
      />,
    )
    expect(queryByTestId('dialog-title')).toBeNull()
    fireEvent.click(getByText('Button Test'))
    expect(queryByTestId('dialog-title')).toBeTruthy()
    const dialogElement = getByTestId('dialog')
    fireEvent.keyDown(dialogElement, {
      charCode: 27,
      code: 27,
      key: 'Escape',
    })
    await waitForDomChange({
      container: dialogElement,
    })
    expect(queryByTestId('dialog-title')).toBeNull()
    expect(onDialogClose).toBeCalled()
  })

  it('open/close without onDialogClose dialog SimpleDialogWithButton', async () => {
    const { queryByTestId, getByText, getByTestId } = render(
      <SimpleDialogWithButton list={mockList} buttonText='Button Test' />,
    )
    expect(queryByTestId('dialog-title')).toBeNull()
    fireEvent.click(getByText('Button Test'))
    expect(queryByTestId('dialog-title')).toBeTruthy()
    const dialogElement = getByTestId('dialog')
    fireEvent.keyDown(dialogElement, {
      charCode: 27,
      code: 27,
      key: 'Escape',
    })

    fireEvent.keyDown(dialogElement, {
      charCode: 27,
      code: 27,
      key: 'Escape',
    })
    await waitForDomChange({ container: dialogElement })
    expect(queryByTestId('dialog-title')).toBeNull()
  })
})
