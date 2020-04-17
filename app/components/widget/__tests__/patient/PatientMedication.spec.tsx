import * as React from 'react'

import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import patientMedicationList from '@app/reducers-redux/patientMedicationList.reducer'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import PatientMedicationList, {
  PatientMedicationListWithConnector,
} from '@components/widget/patient/PatientMedication'
import { render } from '@testing-library/react'
import { createStore } from 'redux'

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientMedicationList />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          assertedDateText: '2019-01-01',
          id: '1',
          medicationCodeableConcept: 'Levora 0.15/30',
        },
        {
          assertedDateText: '2019-01-02',
          id: '2',
          medicationCodeableConcept: 'Levora 0.22/30',
        },
        {
          assertedDateText: '2019-01-02',
          id: '3',
          medicationCodeableConcept: 'Levora 0.33/30',
        },
      ],
      error: null,
      isFetch: false,
      isLoading: true,
      isMore: false,
      setIsFetch: jest.fn(),
      setIsMore: jest.fn(),
      setResult: jest.fn(),
    }
    useInfinitScrollResult.mockImplementation(() => results)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientMedicationList', () => {
    const { queryByText } = render(
      <PatientMedicationList patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('Levora 0.15/30')).toBeTruthy()
    expect(queryByText('Levora 0.33/30')).toBeTruthy()
  })

  it('render PatientMedicationListWithConnector with redux', () => {
    const { queryByText } = renderWithRedux(
      <PatientMedicationListWithConnector />,
      {
        initialState: {},
        store: createStore(patientMedicationList, {
          patientMedicationList: {},
        }),
      },
    )

    expect(queryByText('Levora 0.15/30')).toBeTruthy()
    expect(queryByText('Levora 0.33/30')).toBeTruthy()
  })

  // it('scroll PatientMedicationList', () => {
  //   const { queryByText } = render(
  //     <PatientMedicationList patientId={'1'} isInitialize={true} />,
  //   )

  //   expect(queryByText('Levora 0.15/30')).toBeTruthy()
  //   expect(queryByText('Levora 0.33/30')).toBeTruthy()
  // })

  it('error PatientMedicationList', () => {
    const errorText = 'Test Error'
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          assertedDateText: '2019-01-01',
          id: '1',
          medicationCodeableConcept: 'Levora 0.15/30',
        },
        {
          assertedDateText: '2019-01-02',
          id: '2',
          medicationCodeableConcept: 'Levora 0.22/30',
        },
        {
          assertedDateText: '2019-01-02',
          id: '3',
          medicationCodeableConcept: 'Levora 0.33/30',
        },
      ],
      error: errorText,
      isFetch: false,
      isLoading: true,
      isMore: false,
      setIsFetch: jest.fn(),
      setIsMore: jest.fn(),
      setResult: jest.fn(),
    }
    useObservaionLaboratoryListResult.mockImplementation(() => results)

    const { queryByText } = render(
      <PatientMedicationList patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
