import patientSummaryCards, {
  patientSummaryCardsInitialState,
} from '@app/reducers-redux/patientSummaryCards.reducer'
import * as React from 'react'

import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import useObservationList from '@components/hooks/useObservationList'
import { PatientSummaryCardsWithConnector } from '@components/widget/patient/PatientSummaryCards'
import { fireEvent } from '@testing-library/react'
import * as useRedux from 'react-redux'
import { createStore } from 'redux'
jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientSummaryCard>', () => {
  beforeAll(() => {
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
  })
  it('render PatientSummaryCard', () => {
    const dispatch = jest.spyOn(useRedux, 'useDispatch') as any
    const dispatchFn = jest.fn()
    dispatch.mockImplementation((params: any) => dispatchFn)
    const { queryByText } = renderWithRedux(
      <PatientSummaryCardsWithConnector />,
      {
        initialState: {},
        store: createStore(patientSummaryCards, {
          patientSummaryCards: patientSummaryCardsInitialState,
        }),
      },
    )

    expect(queryByText('Blood Pressure')).toBeTruthy()
  })

  it('card click PatientSummaryCard', () => {
    const dispatch = jest.spyOn(useRedux, 'useDispatch') as any
    const dispatchFn = jest.fn()
    dispatch.mockImplementation((params: any) => dispatchFn)
    const { queryByText, getByText } = renderWithRedux(
      <PatientSummaryCardsWithConnector />,
      {
        initialState: {},
        store: createStore(patientSummaryCards, {
          patientSummaryCards: patientSummaryCardsInitialState,
        }),
      },
    )

    expect(queryByText('Blood Pressure')).toBeTruthy()
    const sysTextElement = getByText('SYS')
    fireEvent.click(sysTextElement)
    expect(dispatchFn).toHaveBeenCalled()
  })
})
