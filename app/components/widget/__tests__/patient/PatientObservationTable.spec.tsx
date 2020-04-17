import * as React from 'react'

import useInfinitScroll from '@components/hooks/useInfinitScroll'
import PatientObservationTable from '@components/widget/patient/PatientObservationTable'
import ObservationServiceMock from '@services/__mocks__/ObservationServiceMock'
import { HMSService } from '@services/HMSServiceFactory'
import ObservationService from '@services/ObservationService'
import { render, waitForDomChange } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientObservationTable />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          categoryText: 'laboratory',
          codeText: 'total chor',
          id: '1',
          issued: '2019-01-01',
          value: 30,
        },
        {
          categoryText: 'vital-signs',
          codeText: 'body weight',
          id: '2',
          issued: '2019-01-01',
          value: 77,
        },
      ],
      error: null,
      isFetch: false,
      isLoading: false,
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

  it('render PatientObservationTable', () => {
    const { queryByText } = render(
      <PatientObservationTable patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('total chor')).toBeTruthy()
    expect(queryByText('body weight')).toBeTruthy()
  })

  it('error PatientObservationTable', () => {
    const errorText = 'Test Error'
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          categoryText: 'laboratory',
          codeText: 'total chor',
          id: '1',
          issued: '2019-01-01',
          value: 30,
        },
        {
          categoryText: 'vital-signs',
          codeText: 'body weight',
          id: '2',
          issued: '2019-01-01',
          value: 77,
        },
      ],
      error: errorText,
      isFetch: false,
      isLoading: false,
      isMore: false,
      setIsFetch: jest.fn(),
      setIsMore: jest.fn(),
      setResult: jest.fn(),
    }
    useObservaionLaboratoryListResult.mockImplementation(() => results)

    const { queryByText } = render(
      <PatientObservationTable patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })

  it('group/ungroup group PatientObservationTable', async () => {
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
      return ObservationServiceMock as ObservationService
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
      .spyOn(ObservationServiceMock, 'list')
      .mockImplementation((params: any) => {
        testFn(params)
        // expect(params.filter.category).toStrictEqual('Respiratory therapy')
        return Promise.resolve({
          data: [
            {
              categoryText: 'laboratory',
              codeText: 'total chor',
              id: '1',
              issued: '2019-01-01',
              value: 30,
            },
          ],
          error: null,
          totalCount: 1,
        })
      })
    const { getByTestId } = render(<PatientObservationTable patientId={'1'} />)

    const groupByCheckboxElement = getByTestId('check-by-type-input')
    userEvent.click(groupByCheckboxElement)
    await waitForDomChange()
    expect(testFn.mock.calls[0][0].filter.categoryCode).toStrictEqual(
      'Laboratory',
    )

    userEvent.click(groupByCheckboxElement)
    await waitForDomChange()
    expect(testFn.mock.calls[1][0].filter.categoryCode).toStrictEqual(undefined)
  })

  it('tab change group PatientObservationTable', async () => {
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
      return ObservationServiceMock as ObservationService
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
      .spyOn(ObservationServiceMock, 'list')
      .mockImplementation((params: any) => {
        testFn(params)
        // expect(params.filter.category).toStrictEqual('Respiratory therapy')
        return Promise.resolve({
          data: [
            {
              categoryText: 'vital-signs',
              codeText: 'body weight',
              id: '2',
              issued: '2019-01-01',
              value: 77,
            },
          ],
          error: null,
          totalCount: 1,
        })
      })
    const { getByTestId, getAllByText } = render(
      <PatientObservationTable patientId={'1'} />,
    )

    const groupByCheckboxElement = getByTestId('check-by-type-input')
    userEvent.click(groupByCheckboxElement)
    await waitForDomChange()
    expect(testFn.mock.calls[0][0].filter.categoryCode).toStrictEqual(
      'Laboratory',
    )

    const textTabElement = getAllByText('Vital-signs')
    userEvent.click(textTabElement[0])
    await waitForDomChange()
    expect(testFn.mock.calls[1][0].filter.categoryCode).toStrictEqual(
      'Vital-signs',
    )
  })

  it('group error PatientObservationTable', async () => {
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
      return ObservationServiceMock as ObservationService
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
      .spyOn(ObservationServiceMock, 'categoryList')
      .mockImplementation((params: any) => {
        return Promise.reject(new Error('test error'))
      })
    const { getByTestId, queryByText } = render(
      <PatientObservationTable patientId={'1'} />,
    )

    const groupByCheckboxElement = getByTestId('check-by-type-input')
    userEvent.click(groupByCheckboxElement)
    await waitForDomChange()
    expect(setResult.mock.calls[0][0].error).toBe('test error')
  })
})
