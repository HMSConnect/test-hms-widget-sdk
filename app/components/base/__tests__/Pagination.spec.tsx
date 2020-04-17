import * as React from 'react'

import { Table } from '@material-ui/core'
import { fireEvent, render } from '@testing-library/react'
import Pagination from '../Pagination'

describe('<Pagination />', () => {
  it('render <Pagination />', () => {
    const onPageChange = jest.fn()
    const { queryByText } = render(
      <Pagination totalCount={30} page={0} onPageChange={onPageChange} />,
    )

    expect(queryByText('10')).toBeTruthy()
  })
  it('render with max value <Pagination />', () => {
    const onPageChange = jest.fn()
    const { queryByText } = render(
      <Pagination
        totalCount={30}
        page={0}
        onPageChange={onPageChange}
        max={25}
      />,
    )

    expect(queryByText('25')).toBeTruthy()
  })

  it('change Page <Pagination />', () => {
    const onPageChange = jest.fn()
    const { queryByText, getByTestId, rerender } = render(
      <Pagination totalCount={30} page={0} onPageChange={onPageChange} />,
    )

    expect(queryByText('10')).toBeTruthy()

    fireEvent.click(getByTestId('next-page'))

    expect(onPageChange).toBeCalled()

    expect(onPageChange.mock.calls[0][0].page).toBe(1)
    rerender(
      <Pagination totalCount={30} page={1} onPageChange={onPageChange} />,
    )
    fireEvent.click(getByTestId('prev-page'))

    expect(onPageChange.mock.calls.length).toBe(2)

    expect(onPageChange.mock.calls[1][0].page).toBe(0)
  })

  it('change Max <Pagination />', () => {
    const page = 0
    const onPageChange = jest.fn()
    const { getByText, getByTestId } = render(
      <Pagination totalCount={30} page={page} onPageChange={onPageChange} />,
    )
    const selectElemect = getByTestId('pagination').getElementsByTagName(
      'select',
    )
    fireEvent.change(selectElemect[0], { target: { value: 25 } })

    expect(onPageChange).toBeCalled()

    expect(onPageChange.mock.calls[0][0].max).toBe(25)
  })

  it('change firstPage <Pagination />', () => {
    const onPageChange = jest.fn()
    const { queryByText, getByTestId, rerender } = render(
      <Pagination totalCount={30} page={2} onPageChange={onPageChange} />,
    )

    expect(queryByText('10')).toBeTruthy()

    fireEvent.click(getByTestId('first-page'))

    expect(onPageChange).toBeCalled()

    expect(onPageChange.mock.calls[0][0].page).toBe(0)
  })
  it('change lastPage <Pagination />', () => {
    const onPageChange = jest.fn()
    const { queryByText, getByTestId, rerender } = render(
      <Pagination totalCount={30} page={0} onPageChange={onPageChange} />,
    )

    expect(queryByText('10')).toBeTruthy()

    fireEvent.click(getByTestId('last-page'))

    expect(onPageChange).toBeCalled()

    expect(onPageChange.mock.calls[0][0].page).toBe(2)
  })
})
