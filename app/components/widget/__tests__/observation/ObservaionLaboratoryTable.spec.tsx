import * as React from 'react'

import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { render } from '@testing-library/react'
import { createStore } from 'redux'
import observationLaboratoryTable from '../../../../reducers-redux/observationLaboratoryTable.reducer'
import ObservationLaboratoryTable, {
  ObservationLaboratoryTableWithConnector,
} from '../../observation/ObservationLaboratoryTable'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<ObservationLaboratoryTable />', () => {
  beforeAll(() => {
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          codeText: 'Code Text1',
          id: '1',
          value: 20,
          issued: '2019-01-01',
          referenceRange: [
            {
              high: 30,
              low: 10,
              type: 'normal',
            },
          ],
        },
        {
          codeText: 'Code Text2',
          id: '2',
          issued: '2019-01-01',
          value: 40,
          referenceRange: [
            {
              high: 30,
              low: 10,
              type: 'normal',
            },
          ],
        },
        {
          codeText: 'Code Text3',
          id: '1',
          value: 1,
          issued: '2018-01-01',
          referenceRange: [
            {
              high: 30,
              low: 10,
              type: 'normal',
            },
          ],
        },
        {
          codeText: 'Code Text4',
          id: '1',
          value: 1,
          issued: '2018-01-09',
          referenceRange: [
            {
              high: 30,
              low: 10,
              type: 'test',
            },
          ],
        },
      ],
      error: null,
      setIsFetch: jest.fn(),
      totalCount: 2,
    }
    useObservaionLaboratoryListResult.mockImplementation(() => results)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('render ObservationLaboratoryTable', () => {
    const { queryByText } = render(
      <ObservationLaboratoryTable patientId={'1'} encounterId={1} />,
    )

    expect(queryByText('Code Text1')).toBeTruthy()
    expect(queryByText('Code Text2')).toBeTruthy()
  })

  it('render ObservationLaboratoryTableConnector with Redux', () => {
    const { queryByText } = renderWithRedux(
      <ObservationLaboratoryTableWithConnector />,
      {
        initialState: {},
        store: createStore(observationLaboratoryTable, {
          patientSummaryCards: {},
        }),
      },
    )

    expect(queryByText('Code Text1')).toBeTruthy()
    expect(queryByText('Code Text2')).toBeTruthy()
  })

  it('error PatientClaimTable', () => {
    const errorText = 'Test Error'
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [],
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
      <ObservationLaboratoryTable
        patientId={'1'}
        isInitialize={true}
        encounterId={1}
      />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
