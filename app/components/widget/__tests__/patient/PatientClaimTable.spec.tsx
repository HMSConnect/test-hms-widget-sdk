import * as React from 'react'

import useInfinitScroll from '@components/hooks/useInfinitScroll'
import ClaimServiceMock from '@services/__mocks__/ClaimServiceMock'
import ClaimService from '@services/ClaimService'
import { HMSService } from '@services/HMSServiceFactory'
import {
  act,
  fireEvent,
  render,
  waitForDomChange,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientClaimTable from '../../patient/PatientClaimTable'

jest.mock('@components/hooks/useAllergyIntoleranceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientClaimTable />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
    const results: any = {
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

  it('render PatientClaimTable', () => {
    const { queryByText } = render(
      <PatientClaimTable patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('active')).toBeTruthy()
    expect(queryByText('complete')).toBeTruthy()
  })
  it('submit search data PatientClaimTable', async () => {
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
      return ClaimServiceMock as ClaimService
    })

    const allergyServiceListMock = jest.fn()
    jest.spyOn(ClaimServiceMock, 'list').mockImplementation((params: any) => {
      allergyServiceListMock(params)
      return Promise.resolve({
        data: [
          {
            billablePeriodStartText: '2019-01-01',
            id: '1',
            status: 'cancelled',
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

    const { getByTestId, getAllByText, getByText } = render(
      <PatientClaimTable patientId={'1'} initialFilter={{ status: 'draft' }} />,
    )
    expect(setResult).toBeCalledTimes(0)

    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const selectElement = getByText('Draft')
      userEvent.click(selectElement)
      const submitButtonElement = getByTestId('modal-submit-button')
      userEvent.click(getByText('Active'))

      fireEvent.click(submitButtonElement)

      await waitForDomChange()
    })

    expect(allergyServiceListMock).toBeCalledTimes(1)
    expect(allergyServiceListMock.mock.calls[0][0].filter.status).toStrictEqual(
      'active',
    )
    expect(setResult).toBeCalledTimes(1)
  })

  it('reset Search data PatientClaimTable', async () => {
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
      return ClaimServiceMock as ClaimService
    })

    const allergyServiceListMock = jest.fn()
    jest.spyOn(ClaimServiceMock, 'list').mockImplementation((params: any) => {
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

    const { getByTestId } = render(<PatientClaimTable patientId={'1'} />)
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const resetButtonElement = getByTestId('modal-reset-button')
    fireEvent.click(resetButtonElement)
    await waitForDomChange()

    expect(allergyServiceListMock.mock.calls[0][0].filter).toStrictEqual({
      billablePeriodStart_lt: undefined,
      organizationId: undefined,
      patientId: '1',
      status: '',
    })
    expect(setResult).toBeCalledTimes(1)
  })

  it('submit Search with error PatientClaimTable', async () => {
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
      return ClaimServiceMock as ClaimService
    })
    jest.spyOn(ClaimServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId, getByText } = render(
      <PatientClaimTable patientId={'1'} initialFilter={{ status: 'draft' }} />,
    )
    expect(setResult).toBeCalledTimes(0)
    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const selectElement = getByText('Draft')
      userEvent.click(selectElement)
      const submitButtonElement = getByTestId('modal-submit-button')
      userEvent.click(getByText('Active'))
      fireEvent.click(submitButtonElement)
      await waitForDomChange()
    })

    expect(setResult).toBeCalledTimes(1)

    expect(setResult.mock.calls[0][0]).toStrictEqual({
      data: [],
      error: 'error!!!',
    })
  })

  it('reset Search with error PatientClaimTable', async () => {
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
      return ClaimServiceMock as ClaimService
    })
    jest.spyOn(ClaimServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId } = render(<PatientClaimTable patientId={'1'} />)
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

  it('error PatientClaimTable', () => {
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
      <PatientClaimTable patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
