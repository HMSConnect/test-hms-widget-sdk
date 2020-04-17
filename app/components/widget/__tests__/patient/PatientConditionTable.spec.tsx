import * as React from 'react'

import useInfinitScroll from '@components/hooks/useInfinitScroll'
import ConditionServiceMock from '@services/__mocks__/ConditionServiceMock'
import ConditionService from '@services/ConditionService'
import { HMSService } from '@services/HMSServiceFactory'
import {
  act,
  fireEvent,
  render,
  waitForDomChange,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientConditionTable from '../../patient/PatientConditionTable'

jest.mock('@components/hooks/useAllergyIntoleranceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientConditionTable />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          clinicalStatus: 'resolved',
          codeText: 'Viral sinusitis',
          id: '1',
          onset: '2019-01-01',
        },
        {
          clinicalStatus: 'active',
          codeText: 'Acute bronchitis',
          id: '2',
          onset: '2019-01-02',
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

  it('render PatientConditionTable', () => {
    const { queryByText } = render(
      <PatientConditionTable patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('active')).toBeTruthy()
    expect(queryByText('resolved')).toBeTruthy()
  })
  it('submit search data PatientConditionTable', async () => {
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
      return ConditionServiceMock as ConditionService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(ConditionServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              clinicalStatus: 'resolved',
              codeText: 'Viral sinusitis',
              id: '1',
              onset: '2019-01-01',
            },
            {
              clinicalStatus: 'active',
              codeText: 'Acute bronchitis',
              id: '2',
              onset: '2019-01-02',
            },
          ],
          error: null,
          totalCount: 2,
        })
      })

    const { getByTestId, getAllByText, getByText } = render(
      <PatientConditionTable
        patientId={'1'}
        initialFilter={{
          clinicalStatus: 'inactive',
          verificationStatus: 'refuted',
        }}
      />,
    )
    expect(setResult).toBeCalledTimes(0)

    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const clinicalStatusSelectElement = getByText('Inactive')
      userEvent.click(clinicalStatusSelectElement)
      userEvent.click(getByText('Active'))

      const verificationStatusSelectElement = getByText('Refuted')
      userEvent.click(verificationStatusSelectElement)
      userEvent.click(getByText('Confirmed'))

      const nameInputElement = getByTestId('adaptive-input-text-codeText')
      fireEvent.change(nameInputElement, { target: { value: 'Hello Test' } })

      const submitButtonElement = getByTestId('modal-submit-button')

      fireEvent.click(submitButtonElement)

      await waitForDomChange()
    })

    expect(allergyServiceListMock).toBeCalledTimes(1)
    expect(
      allergyServiceListMock.mock.calls[0][0].filter.clinicalStatus,
    ).toStrictEqual('active')
    expect(
      allergyServiceListMock.mock.calls[0][0].filter.verificationStatus,
    ).toStrictEqual('confirmed')
    expect(
      allergyServiceListMock.mock.calls[0][0].filter.codeText,
    ).toStrictEqual('Hello Test')
    expect(setResult).toBeCalledTimes(1)
  })

  it('reset Search data PatientConditionTable', async () => {
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
      return ConditionServiceMock as ConditionService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(ConditionServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              clinicalStatus: 'resolved',
              codeText: 'Viral sinusitis',
              id: '1',
              onset: '2019-01-01',
            },
            {
              clinicalStatus: 'active',
              codeText: 'Acute bronchitis',
              id: '2',
              onset: '2019-01-02',
            },
          ],
          error: null,
          totalCount: 2,
        })
      })

    const { getByTestId } = render(<PatientConditionTable patientId={'1'} />)
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const resetButtonElement = getByTestId('modal-reset-button')
    fireEvent.click(resetButtonElement)
    await waitForDomChange()

    expect(allergyServiceListMock.mock.calls[0][0].filter).toStrictEqual({
      clinicalStatus: '',
      codeText: '',
      onsetDateTime_lt: undefined,
      patientId: '1',
      verificationStatus: '',
    })
    expect(setResult).toBeCalledTimes(1)
  })

  it('submit Search with error PatientConditionTable', async () => {
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
      return ConditionServiceMock as ConditionService
    })
    jest.spyOn(ConditionServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId, getByText } = render(
      <PatientConditionTable
        patientId={'1'}
        initialFilter={{
          clinicalStatus: 'inactive',
          verificationStatus: 'refuted',
        }}
      />,
    )
    expect(setResult).toBeCalledTimes(0)
    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const clinicalStatusSelectElement = getByText('Inactive')
      userEvent.click(clinicalStatusSelectElement)
      userEvent.click(getByText('Active'))

      const verificationStatusSelectElement = getByText('Refuted')
      userEvent.click(verificationStatusSelectElement)
      userEvent.click(getByText('Confirmed'))

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

  it('reset Search with error PatientConditionTable', async () => {
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
      return ConditionServiceMock as ConditionService
    })
    jest.spyOn(ConditionServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId } = render(<PatientConditionTable patientId={'1'} />)
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

  it('error PatientConditionTable', () => {
    const errorText = 'Test Error'
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          clinicalStatus: 'resolved',
          codeText: 'Viral sinusitis',
          id: '1',
          onset: '2019-01-01',
        },
        {
          clinicalStatus: 'active',
          codeText: 'Acute bronchitis',
          id: '2',
          onset: '2019-01-02',
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
      <PatientConditionTable patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
