import * as React from 'react'

import patientAllergyList from '@app/reducers-redux/patientAllergyList.reducer'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { render } from '@testing-library/react'
import { createStore } from 'redux'
import PatientAllergyList, {
  PatientAllergyListWithConnector,
} from '../../patient/PatientAllergyList'

jest.mock('@components/hooks/useAllergyIntoleranceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientAllergyList />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          assertedDateText: '2019-01-01',
          codeText: 'Allergy to bee venom',
          criticality: 'low',
          id: '1',
        },
        {
          assertedDateText: '2019-01-02',
          codeText: 'House dust mite allergy1',
          criticality: 'high',
          id: '2',
        },
        {
          assertedDateText: '2019-01-02',
          codeText: 'House dust mite allergy2',
          criticality: 'unable-to-assess',
          id: '3',
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

  it('render PatientAllergyList', () => {
    const { queryByText } = render(
      <PatientAllergyList patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('Allergy to bee venom')).toBeTruthy()
    expect(queryByText('House dust mite allergy2')).toBeTruthy()
  })

  it('render PatientAllergyListWithConnector with redux', () => {
    const { queryByText } = renderWithRedux(
      <PatientAllergyListWithConnector />,
      {
        initialState: {},
        store: createStore(patientAllergyList, {
          patientAllergyList: {},
        }),
      },
    )

    expect(queryByText('Allergy to bee venom')).toBeTruthy()
    expect(queryByText('House dust mite allergy2')).toBeTruthy()
  })

  // it('scroll PatientAllergyList', () => {
  //   const { queryByText } = render(
  //     <PatientAllergyList patientId={'1'} isInitialize={true} />,
  //   )

  //   expect(queryByText('Allergy to bee venom')).toBeTruthy()
  //   expect(queryByText('House dust mite allergy2')).toBeTruthy()
  // })

  it('error PatientAllergyList', () => {
    const errorText = 'Test Error'
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          assertedDateText: '2019-01-01',
          codeText: 'Allergy to bee venom',
          criticality: 'low',
          id: '1',
        },
        {
          assertedDateText: '2019-01-02',
          codeText: 'House dust mite allergy1',
          criticality: 'high',
          id: '2',
        },
        {
          assertedDateText: '2019-01-02',
          codeText: 'House dust mite allergy2',
          criticality: 'unable-to-assess',
          id: '3',
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
      <PatientAllergyList patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
