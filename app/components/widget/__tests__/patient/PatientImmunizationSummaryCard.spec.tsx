import * as React from 'react'

import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import patientAllergySummaryCard from '@app/reducers-redux/patientAllergySummaryCard.reducer'
import useResourceList from '@components/hooks/useResourceList'
import PatientImmunizationSummerCard, {
  PatientImmunizationSummerCardWithConnector,
} from '@components/widget/patient/PatientImmunizationSummaryCard'
import { render } from '@testing-library/react'
import { createStore } from 'redux'

jest.mock('@components/hooks/useResourceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientImmunizationSummerCard />', () => {
  beforeAll(() => {
    const useResourceListResult: any = useResourceList as any
    const results: any = {
      data: [{ resourceType: 'immunization', totalCount: 123, data: [] }],
      error: null,
      isLoading: false,
    }
    useResourceListResult.mockImplementation(() => results)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientImmunizationSummerCard', () => {
    const { queryByText } = render(
      <PatientImmunizationSummerCard patientId={'1'} />,
    )
    expect(queryByText('Total Immunization')).toBeTruthy()
  })

  it('render PatientImmunizationSummerCard', () => {
    const { queryByText } = renderWithRedux(
      <PatientImmunizationSummerCardWithConnector />,
      {
        initialState: {},
        store: createStore(patientAllergySummaryCard, {
          patientAllergyList: {},
        }),
      },
    )
    expect(queryByText('Total Immunization')).toBeTruthy()
  })

  it('loading PatientImmunizationSummerCard', () => {
    const useResourceListResult: any = useResourceList as any
    useResourceListResult.mockImplementation(() => ({
      data: [{ resourceType: 'immunization', totalCount: 123, data: [] }],
      error: null,
      isLoading: true,
    }))
    const { queryByText } = render(
      <PatientImmunizationSummerCard patientId={'1'} />,
    )
    expect(queryByText('Total Immunization')).toBeFalsy()
  })

  it('error PatientImmunizationSummerCard', () => {
    const useResourceListResult: any = useResourceList as any
    useResourceListResult.mockImplementation(() => ({
      data: [{ resourceType: 'immunization', totalCount: 123, data: [] }],
      error: 'Test Error',
      isLoading: true,
    }))
    const { queryByText } = render(
      <PatientImmunizationSummerCard patientId={'1'} />,
    )
    expect(queryByText('Total Immunization')).toBeFalsy()
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
