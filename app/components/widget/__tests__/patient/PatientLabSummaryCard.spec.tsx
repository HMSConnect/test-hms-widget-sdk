import * as React from 'react'

import useResourceList from '@components/hooks/useResourceList'
import PatientLabSummaryCard from '@components/widget/patient/PatientLabSummaryCard'
import { render } from '@testing-library/react'

jest.mock('@components/hooks/useResourceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientLabSummaryCard />', () => {
  beforeAll(() => {
    const useResourceListResult: any = useResourceList as any
    const results: any = {
      data: [{ resourceType: 'observation', totalCount: 123, data: [] }],
      error: null,
      isLoading: false,
    }
    useResourceListResult.mockImplementation(() => results)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientLabSummaryCard', () => {
    const { queryByText } = render(<PatientLabSummaryCard patientId={'1'} />)
    expect(queryByText('Total Lab')).toBeTruthy()
  })

  //   it('render PatientLabSummaryCard', () => {
  //     const { queryByText } = renderWithRedux(
  //       <PatientLabSummaryCardWithConnector />,
  //       {
  //         initialState: {},
  //         store: createStore(patientAllergySummaryCard, {
  //           patientAllergyList: {},
  //         }),
  //       },
  //     )
  //     expect(queryByText('Total Immunization')).toBeTruthy()
  //   })

  it('loading PatientLabSummaryCard', () => {
    const useResourceListResult: any = useResourceList as any
    useResourceListResult.mockImplementation(() => ({
      data: [{ resourceType: 'observation', totalCount: 123, data: [] }],
      error: null,
      isLoading: true,
    }))
    const { queryByText } = render(<PatientLabSummaryCard patientId={'1'} />)
    expect(queryByText('Total Lab')).toBeFalsy()
  })

  it('error PatientLabSummaryCard', () => {
    const useResourceListResult: any = useResourceList as any
    useResourceListResult.mockImplementation(() => ({
      data: [{ resourceType: 'observation', totalCount: 123, data: [] }],
      error: 'Test Error',
      isLoading: true,
    }))
    const { queryByText } = render(<PatientLabSummaryCard patientId={'1'} />)
    expect(queryByText('Total Lab')).toBeFalsy()
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
