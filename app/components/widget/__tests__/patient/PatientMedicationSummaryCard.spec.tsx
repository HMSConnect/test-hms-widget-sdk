import * as React from 'react'

import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import patientAllergySummaryCard from '@app/reducers-redux/patientAllergySummaryCard.reducer'
import useResourceList from '@components/hooks/useResourceList'
import PatientMedicationSummaryCard, {
  PatientMedicationSummaryCardWithConnector,
} from '@components/widget/patient/PatientMedicationSummaryCard'
import { render } from '@testing-library/react'
import { createStore } from 'redux'

jest.mock('@components/hooks/useResourceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientMedicationSummaryCard />', () => {
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

  it('render PatientMedicationSummaryCard', () => {
    const { queryByText } = render(
      <PatientMedicationSummaryCard patientId={'1'} />,
    )
    expect(queryByText('Total Medication')).toBeTruthy()
  })

  it('render PatientMedicationSummaryCard', () => {
    const { queryByText } = renderWithRedux(
      <PatientMedicationSummaryCardWithConnector />,
      {
        initialState: {},
        store: createStore(patientAllergySummaryCard, {
          patientAllergyList: {},
        }),
      },
    )
    expect(queryByText('Total Medication')).toBeTruthy()
  })

  it('loading PatientMedicationSummaryCard', () => {
    const useResourceListResult: any = useResourceList as any
    useResourceListResult.mockImplementation(() => ({
      data: [
        { resourceType: 'allergy_intolerance', totalCount: 123, data: [] },
      ],
      error: null,
      isLoading: true,
    }))
    const { queryByText } = render(
      <PatientMedicationSummaryCard patientId={'1'} />,
    )
    expect(queryByText('Total Medication')).toBeFalsy()
  })

  it('error PatientMedicationSummaryCard', () => {
    const useResourceListResult: any = useResourceList as any
    useResourceListResult.mockImplementation(() => ({
      data: [
        { resourceType: 'allergy_intolerance', totalCount: 123, data: [] },
      ],
      error: 'Test Error',
      isLoading: true,
    }))
    const { queryByText } = render(
      <PatientMedicationSummaryCard patientId={'1'} />,
    )
    expect(queryByText('Total Medication')).toBeFalsy()
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
