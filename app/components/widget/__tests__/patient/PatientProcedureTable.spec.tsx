import * as React from 'react'

import useInfinitScroll from '@components/hooks/useInfinitScroll'
import ProcedureServiceMock from '@services/__mocks__/ProcedureServiceMock'
import { HMSService } from '@services/HMSServiceFactory'
import ProcedureService from '@services/ProcedureService'
import {
  act,
  fireEvent,
  render,
  waitForDomChange,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientProcedureTable from '../../patient/PatientProcedureTable'

jest.mock('@components/hooks/useAllergyIntoleranceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientProcedureTable />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          code: '4411',
          codeText: 'Depression',
          id: '1',
          performedPerios: {
            end: '2019-01-02',
            start: '2019-01-01',
          },
        },
        {
          code: '1144',
          codeText: 'ChildBirth',
          id: '2',
          performedPerios: {
            end: '2019-01-03',
            start: '2019-01-04',
          },
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

  it('render PatientProcedureTable', () => {
    const { queryByText } = render(
      <PatientProcedureTable patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('Depression')).toBeTruthy()
    expect(queryByText('ChildBirth')).toBeTruthy()
  })
  it('submit search data PatientProcedureTable', async () => {
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
      return ProcedureServiceMock as ProcedureService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(ProcedureServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              code: '4411',
              codeText: 'Depression',
              id: '1',
              performedPerios: {
                end: '2019-01-02',
                start: '2019-01-01',
              },
            },
            {
              code: '1144',
              codeText: 'ChildBirth',
              id: '2',
              performedPerios: {
                end: '2019-01-03',
                start: '2019-01-04',
              },
            },
          ],
          error: null,
          totalCount: 2,
        })
      })

    const { getByTestId, getAllByText, getByText } = render(
      <PatientProcedureTable patientId={'1'} />,
    )
    expect(setResult).toBeCalledTimes(0)

    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()

      const nameInputElement = getByTestId('adaptive-input-text-code')
      fireEvent.change(nameInputElement, { target: { value: 'Hello Test' } })

      const submitButtonElement = getByTestId('modal-submit-button')

      fireEvent.click(submitButtonElement)

      await waitForDomChange()
    })

    expect(allergyServiceListMock).toBeCalledTimes(1)
    expect(allergyServiceListMock.mock.calls[0][0].filter.code).toStrictEqual(
      'Hello Test',
    )
    expect(setResult).toBeCalledTimes(1)
  })

  it('reset Search data PatientProcedureTable', async () => {
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
      return ProcedureServiceMock as ProcedureService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(ProcedureServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              code: '4411',
              codeText: 'Depression',
              id: '1',
              performedPerios: {
                end: '2019-01-02',
                start: '2019-01-01',
              },
            },
            {
              code: '1144',
              codeText: 'ChildBirth',
              id: '2',
              performedPerios: {
                end: '2019-01-03',
                start: '2019-01-04',
              },
            },
          ],
          error: null,
          totalCount: 2,
        })
      })

    const { getByTestId } = render(<PatientProcedureTable patientId={'1'} />)
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const resetButtonElement = getByTestId('modal-reset-button')
    fireEvent.click(resetButtonElement)
    await waitForDomChange()

    expect(allergyServiceListMock.mock.calls[0][0].filter).toStrictEqual({
      code: '',
      patientId: '1',
      periodStart_lt: undefined,
    })
    expect(setResult).toBeCalledTimes(1)
  })

  it('submit Search with error PatientProcedureTable', async () => {
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
      return ProcedureServiceMock as ProcedureService
    })
    jest.spyOn(ProcedureServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId, getByText } = render(
      <PatientProcedureTable patientId={'1'} />,
    )
    expect(setResult).toBeCalledTimes(0)
    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const nameInputElement = getByTestId('adaptive-input-text-code')
      fireEvent.change(nameInputElement, { target: { value: 'Hello Test' } })

      const submitButtonElement = getByTestId('modal-submit-button')

      fireEvent.click(submitButtonElement)

      await waitForDomChange()
    })

    expect(setResult).toBeCalledTimes(1)

    expect(setResult.mock.calls[0][0]).toStrictEqual({
      data: [],
      error: 'error!!!',
    })
  })

  it('reset Search with error PatientProcedureTable', async () => {
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
      return ProcedureServiceMock as ProcedureService
    })
    jest.spyOn(ProcedureServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId } = render(<PatientProcedureTable patientId={'1'} />)
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const submitButtonElement = getByTestId('modal-reset-button')

    fireEvent.click(submitButtonElement)

    await waitForDomChange()

    expect(setResult).toBeCalledTimes(1)

    expect(setResult.mock.calls[0][0]).toStrictEqual({
      data: [],
      error: 'error!!!',
    })
  })

  it('error PatientProcedureTable', () => {
    const errorText = 'Test Error'
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          code: '4411',
          codeText: 'Depression',
          id: '1',
          performedPerios: {
            end: '2019-01-02',
            start: '2019-01-01',
          },
        },
        {
          code: '1144',
          codeText: 'ChildBirth',
          id: '2',
          performedPerios: {
            end: '2019-01-03',
            start: '2019-01-04',
          },
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
      <PatientProcedureTable patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
