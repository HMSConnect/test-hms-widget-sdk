import * as React from 'react'

import * as patientSummaryAction from '@app/actions/patientsummaryCards.action'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import patientSummaryCards, {
  patientSummaryCardsInitialState,
} from '@app/reducers-redux/patientSummaryCards.reducer'
import useObservationList from '@components/hooks/useObservationList'
import { fireEvent, render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { createStore } from 'redux'
import ObservationBloodPressureCard, {
  ObservationBloodPressureCardWithConnector,
} from '../../observation/ObservationBloodPressureCard'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<ObservaionBloodPressureCard />', () => {
  beforeAll(() => {
    const router = jest.spyOn(nextRouter, 'useRouter') as any
    router.mockImplementation(() => ({
      query: {
        encounterId: '0001',
        patientId: '0001',
      },
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('render ObservaionBloodPressureCard', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          codeText: 'Code Text1',
          id: '1',
          issued: '2019-01-01',
          valueModal: [
            {
              code: 'Systolic Blood Pressure',
              unit: 'mmHg',
              value: 120,
            },
            {
              code: 'Diastolic Blood Pressure',
              unit: 'mmHg',
              value: 89,
            },
          ],
        },
      ],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText, queryAllByText } = render(
      <ObservationBloodPressureCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )

    expect(queryByText('120.00')).toBeTruthy()
    expect(queryByText('89.00')).toBeTruthy()
    expect(queryAllByText('mmHg')).toBeTruthy()
  })

  it('render ObservaionBloodPressureCardConnector with Redux', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          codeText: 'Code Text1',
          id: '1',
          issued: '2019-01-01',
          valueModal: [
            {
              code: 'Systolic Blood Pressure',
              unit: 'mmHg',
              value: 120,
            },
            {
              code: 'Diastolic Blood Pressure',
              unit: 'mmHg',
              value: 89,
            },
          ],
        },
      ],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation((res: any) => {
      return results
    })
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText, queryAllByText } = renderWithRedux(
      <ObservationBloodPressureCardWithConnector />,
      {
        initialState: patientSummaryCardsInitialState,
        store: createStore(patientSummaryCards, {
          patientSummaryCards: patientSummaryCardsInitialState,
        }),
      },
    )

    expect(queryByText('120.00')).toBeTruthy()
    expect(queryByText('89.00')).toBeTruthy()
    expect(queryAllByText('mmHg')).toBeTruthy()
  })

  it('click ObservaionBloodPressureCardConnector with Redux', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          codeText: 'Code Text1',
          id: '1',
          issued: '2019-01-01',
          valueModal: [
            {
              code: 'Systolic Blood Pressure',
              unit: 'mmHg',
              value: 120,
            },
            {
              code: 'Diastolic Blood Pressure',
              unit: 'mmHg',
              value: 89,
            },
          ],
        },
      ],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation((res: any) => {
      return results
    })

    const cardClickFunction = jest
      .spyOn(patientSummaryAction, 'cardClick')
      .mockImplementation(res => {
        return { type: 'test', payload: { name: 'gg' } }
      })

    const { queryByText, queryAllByText, getByText } = renderWithRedux(
      <ObservationBloodPressureCardWithConnector />,
      {
        initialState: patientSummaryCardsInitialState,
        store: createStore(patientSummaryCards, {
          patientSummaryCards: patientSummaryCardsInitialState,
        }),
      },
    )

    expect(queryByText('120.00')).toBeTruthy()
    expect(queryByText('89.00')).toBeTruthy()
    expect(queryAllByText('mmHg')).toBeTruthy()

    const textBloodPressure = getByText('120.00')
    fireEvent.click(textBloodPressure)
    expect(cardClickFunction).toBeCalled()
  })

  it('loading ObservaionBloodPressureCard', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      isLoading: true,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText, queryAllByText } = render(
      <ObservationBloodPressureCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })
  it('error ObservaionBloodPressureCard', () => {
    const errorText = 'Error'
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: errorText,
      isLoading: true,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText } = render(
      <ObservationBloodPressureCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
