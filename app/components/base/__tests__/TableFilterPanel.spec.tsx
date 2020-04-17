import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'
import TableFilterPanel from '../TableFilterPanel'

describe('<TableFilterPanel>', () => {
  it('render TabllFilterPanel', () => {
    const onParameterChange = jest.fn()
    const onSearchSubmit = jest.fn()

    const tableFilterPanelProps: any = {
      filter: {},
      filterOptions: [
        {
          label: 'Text',
          name: 'textInput',
          type: 'text',
        },
      ],
    }
    const { queryAllByText } = render(
      <TableFilterPanel
        onSearchSubmit={onSearchSubmit}
        onParameterChange={onParameterChange}
        {...tableFilterPanelProps}
      />,
    )
    expect(queryAllByText('Text')).toBeTruthy()
  })

  it('submit search TableFilterPanel', () => {
    const onParameterChange = jest.fn()
    const onSearchSubmit = jest.fn()

    const tableFilterPanelProps: any = {
      filter: {},
      filterOptions: [
        {
          label: 'Text',
          name: 'textInput',
          type: 'text',
        },
      ],
    }
    const { queryByText, getByTestId, queryAllByText } = render(
      <TableFilterPanel
        onSearchSubmit={onSearchSubmit}
        onParameterChange={onParameterChange}
        {...tableFilterPanelProps}
      />,
    )
    expect(queryAllByText('Text')).toBeTruthy()
    const textElement = getByTestId('adaptive-input-text-textInput')
    fireEvent.change(textElement, {
      target: { value: 'hello' },
    })
    fireEvent.click(textElement)
    fireEvent.keyDown(textElement, {
      charCode: 13,
      code: 13,
      key: 'Enter',
    })

    expect(onParameterChange).toBeCalled()
    // fireEvent.keyDown(textElement.getElementsByTagName('input')[0], {
    //   key: 'Enter',
    //   code: 13,
    // })

    // fireEvent.keyDown(textElement.getElementsByTagName('input')[0], {
    //   key: 'Enter',
    //   keyCode: 13,
    // })

    // fireEvent.keyPress(textElement, {
    //   charCode: 13,
    //   code: 13,
    //   key: 'Enter',
    // })

    // fireEvent.keyPress(textElement.getElementsByTagName('input')[0], {
    //   key: 'Enter',
    //   code: 13,
    // })

    // fireEvent.keyPress(textElement.getElementsByTagName('input')[0], {
    //   key: 'Enter',
    //   keyCode: 13,
    // })

    // expect(onSearchSubmit).toBeCalled()
  })
})
