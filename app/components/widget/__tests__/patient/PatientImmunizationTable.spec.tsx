import * as React from 'react'

import useInfinitScroll from '@components/hooks/useInfinitScroll'
import ImmunizationServiceMock from '@services/__mocks__/ImmunizationServiceMock'
import { HMSService } from '@services/HMSServiceFactory'
import ImmunizationService from '@services/ImmunizationService'
import {
  act,
  fireEvent,
  render,
  waitForDomChange,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientImmunizationTable from '../../patient/PatientImmunizationTable'

jest.mock('@components/hooks/useAllergyIntoleranceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientImmunizationTable />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          dateText: '2019-01-01',
          id: '1',
          status: 'completed',
          vaccineCode: 'Influenza, seasonal, injectable, preservative free',
        },
        {
          dateText: '2019-01-02',
          id: '2',
          status: 'not-done',
          vaccineCode: 'Td (adult) preservative free',
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

  it('render PatientImmunizationTable', () => {
    const { queryByText } = render(
      <PatientImmunizationTable patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('not-done')).toBeTruthy()
    expect(queryByText('completed')).toBeTruthy()
  })

  it('submit search data PatientImmunizationTable', async () => {
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
      return ImmunizationServiceMock as ImmunizationService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(ImmunizationServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              dateText: '2019-01-01',
              id: '1',
              status: 'completed',
              vaccineCode: 'Influenza, seasonal, injectable, preservative free',
            },
            {
              dateText: '2019-01-02',
              id: '2',
              status: 'not-done',
              vaccineCode: 'Td (adult) preservative free',
            },
          ],
          error: null,
          totalCount: 2,
        })
      })

    const { getByTestId, getAllByText, getByText } = render(
      <PatientImmunizationTable
        patientId={'1'}
        initialFilter={{ status: 'entered-in-error' }}
      />,
    )
    expect(setResult).toBeCalledTimes(0)

    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const selectElement = getByText('Entered in Error')
      userEvent.click(selectElement)
      const submitButtonElement = getByTestId('modal-submit-button')
      userEvent.click(getByText('Completed'))

      fireEvent.click(submitButtonElement)

      await waitForDomChange()
    })

    expect(allergyServiceListMock).toBeCalledTimes(1)
    expect(allergyServiceListMock.mock.calls[0][0].filter.status).toStrictEqual(
      'completed',
    )
    expect(setResult).toBeCalledTimes(1)
  })

  it('reset Search data PatientImmunizationTable', async () => {
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
      return ImmunizationServiceMock as ImmunizationService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(ImmunizationServiceMock, 'list')
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

    const { getByTestId } = render(<PatientImmunizationTable patientId={'1'} />)
    expect(setResult).toBeCalledTimes(0)

    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')

      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const resetButtonElement = getByTestId('modal-reset-button')
      fireEvent.click(resetButtonElement)
      await waitForDomChange()
    })

    expect(allergyServiceListMock.mock.calls[0][0].filter).toStrictEqual({
      date_lt: undefined,
      patientId: '1',
      status: '',
      vaccineCode: '',
    })
    expect(setResult).toBeCalledTimes(1)
  })

  it('submit Search with error PatientImmunizationTable', async () => {
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
      return ImmunizationServiceMock as ImmunizationService
    })
    jest.spyOn(ImmunizationServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId, getByText } = render(
      <PatientImmunizationTable
        patientId={'1'}
        initialFilter={{ status: 'entered-in-error' }}
      />,
    )
    expect(setResult).toBeCalledTimes(0)
    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const selectElement = getByText('Entered in Error')
      userEvent.click(selectElement)
      const submitButtonElement = getByTestId('modal-submit-button')
      userEvent.click(getByText('Completed'))

      fireEvent.click(submitButtonElement)

      await waitForDomChange()
    })

    expect(setResult).toBeCalledTimes(1)

    expect(setResult.mock.calls[0][0]).toStrictEqual({
      data: [],
      error: 'error!!!',
    })
  })

  it('reset Search with error PatientImmunizationTable', async () => {
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
      return ImmunizationServiceMock as ImmunizationService
    })
    jest.spyOn(ImmunizationServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId } = render(<PatientImmunizationTable patientId={'1'} />)
    expect(setResult).toBeCalledTimes(0)

    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')

      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const submitButtonElement = getByTestId('modal-reset-button')

      fireEvent.click(submitButtonElement)

      await waitForDomChange()
    })

    expect(setResult).toBeCalledTimes(1)

    expect(setResult.mock.calls[0][0]).toStrictEqual({
      data: [],
      error: 'error!!!',
    })
  })

  it('error PatientImmunizationTable', () => {
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
      <PatientImmunizationTable patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })

  it('group/ungroup group PatientCarePlanTable', async () => {
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
      return ImmunizationServiceMock as ImmunizationService
    })

    const testFn = jest.fn()
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValueOnce([
        {
          isGroup: false,
        },
        jest.fn(),
      ])
      .mockReturnValueOnce([
        {
          isGroup: true,
        },
        jest.fn(),
      ])
    jest
      .spyOn(ImmunizationServiceMock, 'typeList')
      .mockImplementation((params: any) => {
        // expect(params.filter.category).toStrictEqual('Respiratory therapy')
        return Promise.resolve({
          data: [
            {
              totalCount: 1,
              type: 'Influenza, seasonal, injectable, preservative free',
            },
            {
              totalCount: 1,
              type: 'Td (adult) preservative free',
            },
          ],
        })
      })

    jest
      .spyOn(ImmunizationServiceMock, 'list')
      .mockImplementation((params: any) => {
        testFn(params)
        // expect(params.filter.category).toStrictEqual('Respiratory therapy')
        return Promise.resolve({
          data: [
            {
              dateText: '2019-01-01',
              id: '1',
              status: 'completed',
              vaccineCode: 'Influenza, seasonal, injectable, preservative free',
            },
            {
              dateText: '2019-01-02',
              id: '2',
              status: 'not-done',
              vaccineCode: 'Td (adult) preservative free',
            },
          ],
          error: null,
          totalCount: 1,
        })
      })

    const { getByTestId, getAllByText, getByText } = render(
      <PatientImmunizationTable
        patientId={'1'}
        initialFilter={{ status: 'entered-in-error' }}
      />,
    )
    const groupByCheckboxElement = getByTestId('check-by-type-input')

    await act(async () => {
      userEvent.click(groupByCheckboxElement)
      await waitForDomChange()
      expect(testFn.mock.calls[0][0].filter.vaccineCode).toStrictEqual(
        'Influenza, seasonal, injectable, preservative free',
      )

      userEvent.click(groupByCheckboxElement)
      await waitForDomChange()
    })
    expect(testFn.mock.calls[1][0].filter.vaccineCode).toStrictEqual(undefined)
  })

  it('tab change group PatientCarePlanTable', async () => {
    const setResult = jest.fn()
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [],
      error: null,
      isFetch: false,
      isLoading: false,
      isMore: false,
      setIsFetch: jest.fn(),
      setIsMore: jest.fn(),
      setResult,
    }
    useObservaionLaboratoryListResult.mockImplementation(() => results)
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return ImmunizationServiceMock as ImmunizationService
    })

    const testFn = jest.fn()
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValueOnce([
        {
          isGroup: false,
        },
        jest.fn(),
      ])
      .mockReturnValueOnce([
        {
          isGroup: true,
        },
        jest.fn(),
      ])
    jest
      .spyOn(ImmunizationServiceMock, 'list')
      .mockImplementation((params: any) => {
        testFn(params)
        // expect(params.filter.category).toStrictEqual('Respiratory therapy')
        return Promise.resolve({
          data: [
            {
              dateText: '2019-01-01',
              id: '1',
              status: 'completed',
              vaccineCode: 'Influenza, seasonal, injectable, preservative free',
            },
            {
              dateText: '2019-01-02',
              id: '2',
              status: 'not-done',
              vaccineCode: 'Td (adult) preservative free',
            },
          ],
          error: null,
          totalCount: 1,
        })
      })
    const { getByTestId, getAllByText } = render(
      <PatientImmunizationTable patientId={'1'} />,
    )

    const groupByCheckboxElement = getByTestId('check-by-type-input')
    userEvent.click(groupByCheckboxElement)
    await waitForDomChange()
    expect(testFn.mock.calls[0][0].filter.vaccineCode).toStrictEqual(
      'Influenza, seasonal, injectable, preservative free',
    )

    const textTabElement = getAllByText('Td (adult) preservative free')
    userEvent.click(textTabElement[0])
    await waitForDomChange()
    expect(testFn.mock.calls[1][0].filter.vaccineCode).toStrictEqual(
      'Td (adult) preservative free',
    )
  })

  it('group error PatientCarePlanTable', async () => {
    const setResult = jest.fn()
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [],
      error: null,
      isFetch: false,
      isLoading: false,
      isMore: false,
      setIsFetch: jest.fn(),
      setIsMore: jest.fn(),
      setResult,
    }
    useObservaionLaboratoryListResult.mockImplementation(() => results)
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return ImmunizationServiceMock as ImmunizationService
    })
    jest
      .spyOn(React, 'useReducer')
      .mockReturnValueOnce([
        {
          isGroup: false,
        },
        jest.fn(),
      ])
      .mockReturnValueOnce([
        {
          isGroup: true,
        },
        jest.fn(),
      ])
    jest
      .spyOn(ImmunizationServiceMock, 'typeList')
      .mockImplementation((params: any) => {
        return Promise.reject(new Error('test error'))
      })
    const { getByTestId, queryByText } = render(
      <PatientImmunizationTable patientId={'1'} />,
    )

    const groupByCheckboxElement = getByTestId('check-by-type-input')
    userEvent.click(groupByCheckboxElement)
    await waitForDomChange()
    expect(setResult.mock.calls[0][0].error).toBe('test error')
  })
})
