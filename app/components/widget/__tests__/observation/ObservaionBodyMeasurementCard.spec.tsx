import * as React from 'react'

import * as patientSummaryAction from '@app/actions/patientsummaryCards.action'
import patientSummaryCards, {
  patientSummaryCardsInitialState,
} from '@app/reducers-redux/patientSummaryCards.reducer'
import useObservationList from '@components/hooks/useObservationList'
import { fireEvent, render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { createStore } from 'redux'
import { renderWithRedux } from '../../../../reducers-redux/__mocks__/renderWithRedux'
import ObservationBodyMeasurementCard, {
  ObservationBodyMeasurementCardWithConnector,
} from '../../observation/ObservationBodyMeasurementCard'

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
          code: '8302-2',
          codeText: 'Body Height',
          id: '2',
          issued: '2019-01-01',
          unit: 'm',
          value: 168,
        },
        {
          code: '29463-7',
          codeText: 'Body Weight',
          id: '3',
          issued: '2019-01-01',
          unit: 'kg',
          value: 59,
        },
        {
          code: '39156-5',
          codeText: 'Body Mass Index',
          id: '4',
          issued: '2019-01-01',
          unit: 'kg/m2',
          value: 24.133,
        },
      ],
      error: null,
      totalCount: 4,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText, queryAllByText } = render(
      <ObservationBodyMeasurementCard patientId={query.patientId} />,
    )

    expect(queryByText('168.00')).toBeTruthy()
    expect(queryByText('59.00')).toBeTruthy()
    expect(queryByText('24.13')).toBeTruthy()
    expect(queryAllByText('kg')).toBeTruthy()
  })

  it('render ObservaionBloodPressureCardConnector with Redux', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8302-2',
          codeText: 'Body Height',
          id: '2',
          issued: '2019-01-01',
          unit: 'm',
          value: 168,
        },
        {
          code: '29463-7',
          codeText: 'Body Weight',
          id: '3',
          issued: '2019-01-01',
          unit: 'kg',
          value: 59,
        },
        {
          code: '39156-5',
          codeText: 'Body Mass Index',
          id: '4',
          issued: '2019-01-01',
          unit: 'kg/m2',
          value: 24.133,
        },
      ],
      error: null,
      totalCount: 4,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText, queryAllByText } = renderWithRedux(
      <ObservationBodyMeasurementCardWithConnector />,
      {
        initialState: patientSummaryCardsInitialState,
        store: createStore(patientSummaryCards, {
          patientSummaryCards: patientSummaryCardsInitialState,
        }),
      },
    )

    expect(queryByText('168.00')).toBeTruthy()
    expect(queryByText('59.00')).toBeTruthy()
    expect(queryByText('24.13')).toBeTruthy()
    expect(queryAllByText('kg')).toBeTruthy()
  })

  it('click ObservaionBloodPressureCardConnector with Redux', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          code: '8302-2',
          codeText: 'Body Height',
          id: '2',
          issued: '2019-01-01',
          unit: 'm',
          value: 168,
        },
        {
          code: '29463-7',
          codeText: 'Body Weight',
          id: '3',
          issued: '2019-01-01',
          unit: 'kg',
          value: 59,
        },
        {
          code: '39156-5',
          codeText: 'Body Mass Index',
          id: '4',
          issued: '2019-01-01',
          unit: 'kg/m2',
          value: 24.133,
        },
      ],
      error: null,
      totalCount: 4,
    }
    useObservationListResult.mockImplementation(() => results)

    const cardClickFunction = jest
      .spyOn(patientSummaryAction, 'cardClick')
      .mockImplementation(res => {
        return { type: 'test', payload: { name: 'gg' } }
      })
    const { queryByText, queryAllByText, getByText } = renderWithRedux(
      <ObservationBodyMeasurementCardWithConnector />,
      {
        initialState: patientSummaryCardsInitialState,
        store: createStore(patientSummaryCards, {
          patientSummaryCards: patientSummaryCardsInitialState,
        }),
      },
    )

    expect(queryByText('168.00')).toBeTruthy()
    expect(queryByText('59.00')).toBeTruthy()
    expect(queryByText('24.13')).toBeTruthy()
    expect(queryAllByText('kg')).toBeTruthy()

    const textBloodPressure = getByText('168.00')
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
      <ObservationBodyMeasurementCard patientId={query.patientId} />,
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
      <ObservationBodyMeasurementCard patientId={query.patientId} />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
