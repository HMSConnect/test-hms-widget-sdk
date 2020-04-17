import * as React from 'react'

import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { routesMock } from '@routes/__mocks__/routesMock'
import EncounterServiceMock from '@services/__mocks__/EncounterServiceMock'
import EncounterService from '@services/EncounterService'
import { HMSService } from '@services/HMSServiceFactory'
import {
  act,
  fireEvent,
  render,
  waitForDomChange,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import routes from '../../../../routes'
import PatientEncounterTimeline from '../../patient/PatientEncounterTimeline'

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('../../../../routes', () => ({
  __esModule: true,
  default: routesMock,
}))

describe('PatientEncounterTimeline', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })
    const usePatientListResult: any = useInfinitScroll as any
    const results: any = {
      data: [],
      setIsFetch: jest.fn(),
      totalCount: 20,
    }
    for (let i = 0; i < 20; i++) {
      results.data.push({
        organization: {
          display: `ServiceTest${i + 3}`,
        },
        reason: `Reason${i + 3}`,
        subject: '0001',
        type: `Ty00${i + 3}`,
      })
    }
    usePatientListResult.mockImplementation(() => results)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientEncounterTimeline', () => {
    const { queryByText } = render(
      <PatientEncounterTimeline patientId={'0001'} />,
    )
    expect(queryByText('ServiceTest3')).toBeTruthy()
  })

  it('select PatientEncounterTimeline', async () => {
    const { queryByText, getByText, getByTestId } = render(
      <PatientEncounterTimeline patientId={'0001'} />,
    )

    const encounterTimelineElement = getByText('ServiceTest3')
    userEvent.click(encounterTimelineElement)

    await waitForDomChange()

    fireEvent.click(getByText('Ty003'))
    const replaceRouteFn = routes.Router.replaceRoute

    expect(replaceRouteFn).toBeCalled()
  })

  it('submit search data PatientEncounterTimeline', async () => {
    const setResult = jest.fn()
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [],
      error: null,
      isFetch: false,
      isLoading: true,
      isMore: false,
      setIsFetch: jest.fn(),
      setIsMore: jest.fn(),
      setResult,
    }
    useObservaionLaboratoryListResult.mockImplementation(() => results)
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(EncounterServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              id: '1',
              reason: 'Test1',
              serviceProvider: {
                name: `ServiceTest1`,
              },
              type: 'ADMS',
            },
            {
              id: '2',
              reason: 'Test1',
              serviceProvider: {
                name: `ServiceTest2`,
              },
              type: 'EECM',
            },
          ],
          error: null,
          totalCount: 2,
        })
      })

    const { getByTestId, getByText } = render(
      <PatientEncounterTimeline
        patientId={'1'}
        initialFilter={{ status: 'arrived' }}
      />,
    )
    expect(setResult).toBeCalledTimes(0)

    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const selectElement = getByText('arrived')
      userEvent.click(selectElement)
      const submitButtonElement = getByTestId('modal-submit-button')
      userEvent.click(getByText('finished'))

      fireEvent.click(submitButtonElement)

      await waitForDomChange()
    })

    expect(allergyServiceListMock).toBeCalledTimes(1)
    expect(allergyServiceListMock.mock.calls[0][0].filter.status).toStrictEqual(
      'finished',
    )
    expect(setResult).toBeCalledTimes(1)
  })

  it('submit search error data PatientEncounterTimeline', async () => {
    const setResult = jest.fn()
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [],
      error: null,
      isFetch: false,
      isLoading: true,
      isMore: false,
      setIsFetch: jest.fn(),
      setIsMore: jest.fn(),
      setResult,
    }
    useObservaionLaboratoryListResult.mockImplementation(() => results)
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })
    jest.spyOn(EncounterServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId, getByText } = render(
      <PatientEncounterTimeline
        patientId={'1'}
        initialFilter={{ status: 'arrived' }}
      />,
    )
    expect(setResult).toBeCalledTimes(0)

    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const selectElement = getByText('arrived')
      userEvent.click(selectElement)
      const submitButtonElement = getByTestId('modal-submit-button')
      userEvent.click(getByText('finished'))

      fireEvent.click(submitButtonElement)

      await waitForDomChange()
    })

    expect(setResult).toBeCalledTimes(1)
    expect(setResult.mock.calls[0][0]).toStrictEqual({
      data: [],
      error: 'error!!!',
    })
  })

  it('reset Search data PatientEncounterTimeline', async () => {
    const setResult = jest.fn()
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [],
      error: null,
      isFetch: false,
      isLoading: true,
      isMore: false,
      setIsFetch: jest.fn(),
      setIsMore: jest.fn(),
      setResult,
    }
    useObservaionLaboratoryListResult.mockImplementation(() => results)
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(EncounterServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              billablePeriodStartText: '2019-01-01',
              id: '1',
              status: 'complete',
              totalPrice: '3000',
            },
            {
              billablePeriodStartText: '2019-01-02',
              id: '2',
              status: 'active',
              totalPrice: '600',
            },
          ],
          error: null,
          totalCount: 3,
        })
      })

    const { getByTestId } = render(<PatientEncounterTimeline patientId={'1'} />)
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const resetButtonElement = getByTestId('modal-reset-button')
    fireEvent.click(resetButtonElement)
    await waitForDomChange()

    expect(allergyServiceListMock.mock.calls[0][0].filter).toStrictEqual({
      patientId: '1',
      periodStart_lt: undefined,
      status: '',
      type: undefined,
    })
    expect(setResult).toBeCalledTimes(1)
  })

  it('reset Search error data PatientEncounterTimeline', async () => {
    const setResult = jest.fn()
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [],
      error: null,
      isFetch: false,
      isLoading: true,
      isMore: false,
      setIsFetch: jest.fn(),
      setIsMore: jest.fn(),
      setResult,
    }
    useObservaionLaboratoryListResult.mockImplementation(() => results)
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })
    jest.spyOn(EncounterServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId } = render(<PatientEncounterTimeline patientId={'1'} />)
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const resetButtonElement = getByTestId('modal-reset-button')
    fireEvent.click(resetButtonElement)
    await waitForDomChange()

    expect(setResult).toBeCalledTimes(1)
    expect(setResult.mock.calls[0][0]).toStrictEqual({
      data: [],
      error: 'error!!!',
    })
  })

  it('error PatientEncounterTimeline', () => {
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
      <PatientEncounterTimeline patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
