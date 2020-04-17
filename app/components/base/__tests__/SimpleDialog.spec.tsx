import * as React from 'react'

import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import SimpleDialog, { ISimpleDialogItem } from '../SimpleDialog'

describe('<SimpleDialog />', () => {
  let listItem: ISimpleDialogItem[]
  beforeAll(() => {
    listItem = [
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
  it('render SimpleDialog', () => {
    const { queryByText } = render(<SimpleDialog list={listItem} open={true} />)

    expect(queryByText('Test1')).toBeTruthy()
  })
  it('close SimpleDialog', () => {
    const onDialogClose = jest.fn()
    const { queryByText, getByTestId, queryByTestId } = render(
      <SimpleDialog
        list={listItem}
        open={true}
        onDialogClose={onDialogClose}
      />,
    )
    expect(queryByTestId('dialog-title')).toBeTruthy()
    const background = getByTestId('dialog')
    fireEvent.keyDown(background, { key: 'Escape', code: 27, charCode: 27 })
    waitForDomChange({ container: background }).then(() => {
      expect(queryByTestId('dialog-title')).toBeNull()
      expect(onDialogClose).toBeCalled()
    })
  })

  it('click item SimpleDialog', () => {
    const onDialogClose = jest.fn()
    const { queryByText, getByText } = render(
      <SimpleDialog
        list={listItem}
        open={true}
        onDialogClose={onDialogClose}
      />,
    )

    expect(queryByText('Test2')).toBeTruthy()

    fireEvent.click(getByText('Test2'))

    expect(onDialogClose).toBeCalled()
  })
})
