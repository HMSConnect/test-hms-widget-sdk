import * as React from 'react'

import { IPatientFilterValue } from '@components/templates/patient/PatientFilterBar'
import { fireEvent, render } from '@testing-library/react'
import PatientSearchPanel from '../../patient/PatientSearchPanel'

describe('<PatientSearchPanel/>', () => {
  let initialFilterMock: IPatientFilterValue

  beforeAll(() => {
    initialFilterMock = {
      gender: 'all',
      searchText: '',
    }
  })
  it('render PatientSearchPanel', () => {
    const onSearchSubmit = jest.fn()
    const { queryByTestId } = render(
      <PatientSearchPanel
        initialFilter={initialFilterMock}
        onSearchSubmit={onSearchSubmit}
      />,
    )
    expect(queryByTestId('text-field')).toBeTruthy()
  })
  it('filter PatientSearchPanel', async () => {
    const onSearchSubmit = jest.fn()
    const onHightlightChange = jest.fn()
    const { getByTestId } = render(
      <PatientSearchPanel
        initialFilter={initialFilterMock}
        onSearchSubmit={onSearchSubmit}
        onHightlightChange={onHightlightChange}
      />,
    )
    const textFieldElement = getByTestId('text-field')
    fireEvent.change(textFieldElement, { target: { value: 'test' } })
    expect(onHightlightChange).toBeCalled()
    fireEvent.click(getByTestId('submit-button'))
    expect(onSearchSubmit).toBeCalled()
    expect(onSearchSubmit.mock.calls[0][0]).toStrictEqual({
      gender: 'all',
      searchText: 'test',
    })
  })
  //   it('filter with enter key PatientSearchPanel', async () => {
  //     const onSearchSubmit = jest.fn()
  //     const { getByTestId } = render(
  //       <PatientSearchPanel
  //         initialFilter={initialFilterMock}
  //         onSearchSubmit={onSearchSubmit}
  //       />,
  //     )
  //     const textFieldElement = getByTestId('text-field').getElementsByTagName(
  //       'input',
  //     )[0]
  //     fireEvent.keyDown(textFieldElement, { key: 'Enter', charCode: 13 })
  //     expect(onSearchSubmit).toBeCalled()
  //     expect(onSearchSubmit.mock.calls[0][0]).toStrictEqual({
  //       gender: 'all',
  //       searchText: 'test',
  //     })
  //   })

  it('reset PatientSearchPanel', async () => {
    const onSearchSubmit = jest.fn()
    const onPaginationReset = jest.fn()
    const filterMock: IPatientFilterValue = {
      gender: 'male',
      searchText: 'test',
    }
    const { getByTestId } = render(
      <PatientSearchPanel
        initialFilter={filterMock}
        onSearchSubmit={onSearchSubmit}
        onPaginationReset={onPaginationReset}
      />,
    )
    fireEvent.click(getByTestId('reset-button'))

    expect(onPaginationReset).toBeCalled()
  })
})
