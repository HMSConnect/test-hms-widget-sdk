import * as React from 'react'

import * as patientSummaryAction from '@app/actions/patientsummaryCards.action'
import patientSummaryCards, {
  patientSummaryCardsInitialState,
} from '@app/reducers-redux/patientSummaryCards.reducer'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import useObservationList from '@components/hooks/useObservationList'
import { fireEvent, render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { createStore } from 'redux'
import ObservationTemperatureCard, {
  ObservationTemperatureCardWithConnector,
} from '../../observation/ObservationTemperatureCard'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))
describe('<ObservationBodyTemperatureCard />', () => {
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
  it('render ObservationBodyTemperatureCard', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8310-5',
          codeText: 'Temperature',
          id: '20',
          issued: '2019-01-01',
          unit: 'C',
          value: 31,
        },
      ],
      error: null,
      totalCount: 1,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText, queryAllByText } = render(
      <ObservationTemperatureCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )

    expect(queryByText('31')).toBeTruthy()
    expect(queryAllByText('C')).toBeTruthy()
  })

  it('render ObservationBodyTemperatureCardConnector with Redux', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8310-5',
          codeText: 'Temperature',
          id: '20',
          issued: '2019-01-01',
          unit: 'C',
          value: 31,
        },
      ],
      error: null,
      totalCount: 1,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText, queryAllByText } = renderWithRedux(
      <ObservationTemperatureCardWithConnector />,
      {
        initialState: patientSummaryCardsInitialState,
        store: createStore(patientSummaryCards, {
          patientSummaryCards: patientSummaryCardsInitialState,
        }),
      },
    )

    expect(queryByText('31')).toBeTruthy()
    expect(queryAllByText('C')).toBeTruthy()
  })

  it('click ObservationBodyTemperatureCardConnector with Redux', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8310-5',
          codeText: 'Temperature',
          id: '20',
          issued: '2019-01-01',
          unit: 'C',
          value: 31,
        },
      ],
      error: null,
      totalCount: 1,
    }
    useObservationListResult.mockImplementation(() => results)

    const cardClickFunction = jest
      .spyOn(patientSummaryAction, 'cardClick')
      .mockImplementation(res => {
        return { type: 'test', payload: { name: 'gg' } }
      })
    const { queryByText, queryAllByText, getByText } = renderWithRedux(
      <ObservationTemperatureCardWithConnector />,
      {
        initialState: patientSummaryCardsInitialState,
        store: createStore(patientSummaryCards, {
          patientSummaryCards: patientSummaryCardsInitialState,
        }),
      },
    )

    expect(queryByText('31')).toBeTruthy()
    expect(queryAllByText('C')).toBeTruthy()

    const textBloodPressure = getByText('31')
    fireEvent.click(textBloodPressure)
    expect(cardClickFunction).toBeCalled()
  })

  it('loading ObservationBodyTemperatureCard', () => {
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
      <ObservationTemperatureCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })
  it('error ObservationBodyTemperatureCard', () => {
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
      <ObservationTemperatureCard
        patientId={query.patientId}
        encounterId={query.encounterId}
      />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
