import * as React from 'react'

import usePatientList from '@components/hooks/usePatientList'
import { render } from '@testing-library/react'
import PatientSearchResultWithPaginate from '../../patient/PatientSearchResultWithPaginate'

jest.mock('@components/hooks/usePatientList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientSearchResultWithPaginate />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render <PatientSearchResultWithPaginate />', () => {
    const usePatientListResult: any = usePatientList as any
    const results: any = {
      data: [],
      totalCount: 20,
    }
    for (let i = 0; i < 20; i++) {
      results.data.push({
        gender: i % 2 === 0 ? 'male' : 'female',
        name: {
          family: `FTest${i}`,
          given: [`Test${i}`],
        },
      })
    }
    usePatientListResult.mockImplementation(() => results)
    const { queryByText } = render(<PatientSearchResultWithPaginate />)
    expect(queryByText('Test1 FTest1')).toBeTruthy()
  })

  it('loading <PatientSearchResultWithPaginate />', () => {
    const usePatientListResult: any = usePatientList as any
    usePatientListResult.mockImplementation(() => ({
      data: [],
      error: null,
      isLoading: true,
    }))
    const { queryByText } = render(<PatientSearchResultWithPaginate />)
    expect(queryByText('Test1 FTest1')).toBeFalsy()
  })

  it('error <PatientSearchResultWithPaginate />', () => {
    const usePatientListResult: any = usePatientList as any
    const errorMessage = 'Test Error'
    usePatientListResult.mockImplementation(() => ({
      data: [],
      error: errorMessage,
      isLoading: false,
    }))
    const { queryByText } = render(<PatientSearchResultWithPaginate />)
    expect(queryByText('Test1 FTest1')).toBeFalsy()
    expect(queryByText(`Error: ${errorMessage}`)).toBeTruthy()
  })
})
