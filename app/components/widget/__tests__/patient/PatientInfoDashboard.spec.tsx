import * as React from 'react'

import useResourceList from '@components/hooks/useResourceList'
import PatientInfoDashboard from '@components/widget/patient/PatientInfoDashboard'
import { render } from '@testing-library/react'

jest.mock('@components/hooks/useResourceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientInfoDashboard />', () => {
  beforeAll(() => {
    const useResourceListResult: any = useResourceList as any
    const results: any = {
      data: [
        { resourceType: 'allergy_intolerance', totalCount: 123, data: [] },
      ],
      error: null,
      isLoading: false,
    }
    useResourceListResult.mockImplementation(() => results)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientInfoDashboard', () => {
    const { queryByText } = render(<PatientInfoDashboard />)
    expect(queryByText('Total Allergies')).toBeTruthy()
  })
})
