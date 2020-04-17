import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'

import TabGroup from '../TabGroup'

describe('<TabFroup />', () => {
  it('render <TabFroup />', () => {
    const tabList = [
      { type: 'ADMS', totalCount: 10 },
      { type: 'CCS60', totalCount: 15 },
    ]
    const onChange = jest.fn()
    const { queryByText } = render(
      <TabGroup tabList={tabList} onTabChange={onChange} />,
    )
    expect(queryByText('ADMS')).toBeTruthy()
    expect(queryByText('10')).toBeTruthy()
  })

  it('TabChange <TabFroup />', () => {
    const tabList = [
      { type: 'ADMS', totalCount: 10 },
      { type: 'CCS60', totalCount: 15 },
    ]
    const onChange = jest.fn()
    const { getByTestId } = render(
      <TabGroup tabList={tabList} onTabChange={onChange} />,
    )

    fireEvent.click(getByTestId('ADMS'))
    expect(onChange).toBeCalled()
  })
})
