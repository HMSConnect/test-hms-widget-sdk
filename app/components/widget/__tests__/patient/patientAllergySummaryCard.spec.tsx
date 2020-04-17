import * as React from 'react'

import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import patientAllergySummaryCard from '@app/reducers-redux/patientAllergySummaryCard.reducer'
import useResourceList from '@components/hooks/useResourceList'
import PatientAllergySummerCard, {
  PatientAllergySummerCardWithConnector,
} from '@components/widget/patient/PatientAllergySummaryCard'
import { render } from '@testing-library/react'
import { createStore } from 'redux'

jest.mock('@components/hooks/useResourceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientAllergySummerCard />', () => {
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

  it('render PatientAllergySummerCard', () => {
    const { queryByText } = render(<PatientAllergySummerCard patientId={'1'} />)
    expect(queryByText('Total Allergies')).toBeTruthy()
  })

  it('render PatientAllergySummerCard', () => {
    const { queryByText } = renderWithRedux(
      <PatientAllergySummerCardWithConnector />,
      {
        initialState: {},
        store: createStore(patientAllergySummaryCard, {
          patientAllergyList: {},
        }),
      },
    )
    expect(queryByText('Total Allergies')).toBeTruthy()
  })

  it('loading PatientAllergySummerCard', () => {
    const useResourceListResult: any = useResourceList as any
    useResourceListResult.mockImplementation(() => ({
      data: [
        { resourceType: 'allergy_intolerance', totalCount: 123, data: [] },
      ],
      error: null,
      isLoading: true,
    }))
    const { queryByText } = render(<PatientAllergySummerCard patientId={'1'} />)
    expect(queryByText('Total Allergies')).toBeFalsy()
  })

  it('error PatientAllergySummerCard', () => {
    const useResourceListResult: any = useResourceList as any
    useResourceListResult.mockImplementation(() => ({
      data: [
        { resourceType: 'allergy_intolerance', totalCount: 123, data: [] },
      ],
      error: 'Test Error',
      isLoading: true,
    }))
    const { queryByText } = render(<PatientAllergySummerCard patientId={'1'} />)
    expect(queryByText('Total Allergies')).toBeFalsy()
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
