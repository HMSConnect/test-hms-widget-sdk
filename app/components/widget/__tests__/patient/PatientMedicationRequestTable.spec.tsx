import * as React from 'react'

import useInfinitScroll from '@components/hooks/useInfinitScroll'
import MedicationRequestServiceMock from '@services/__mocks__/MedicationRequestServiceMock'
import { HMSService } from '@services/HMSServiceFactory'
import MedicationRequestService from '@services/MedicationRequestService'
import {
  act,
  fireEvent,
  render,
  waitForDomChange,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientMedicationRequestTable from '../../patient/PatientMedicationRequestTable'

jest.mock('@components/hooks/useAllergyIntoleranceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientMedicationRequestTable />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          authoredOnText: '2019-01-01',
          id: '1',
          medicationCodeableConcept: 'Acetaminophen 160 MG',
          status: 'active',
        },
        {
          authoredOnText: '2019-01-02',
          id: '2',
          medicationCodeableConcept: 'BB',
          status: 'completed',
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

  it('render PatientMedicationRequestTable', () => {
    const { queryByText } = render(
      <PatientMedicationRequestTable patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('Acetaminophen 160 MG')).toBeTruthy()
    expect(queryByText('BB')).toBeTruthy()
  })

  it('submit search data PatientMedicationRequestTable', async () => {
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
      return MedicationRequestServiceMock as MedicationRequestService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(MedicationRequestServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              authoredOnText: '2019-01-01',
              id: '1',
              medicationCodeableConcept: 'Acetaminophen 160 MG',
              status: 'active',
            },
            {
              authoredOnText: '2019-01-02',
              id: '2',
              medicationCodeableConcept: 'BB',
              status: 'completed',
            },
          ],
          error: null,
          totalCount: 2,
        })
      })

    const { getByTestId, getAllByText, getByText } = render(
      <PatientMedicationRequestTable
        patientId={'1'}
        initialFilter={{ status: 'stopped' }}
      />,
    )
    expect(setResult).toBeCalledTimes(0)

    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const statusElement = getByText('Stopped')
      userEvent.click(statusElement)
      userEvent.click(getByText('Completed'))

      //   const nameInputElement = getByTestId('adaptive-input-text-codeText')
      //   fireEvent.change(nameInputElement, { target: { value: 'Hello Test' } })

      const submitButtonElement = getByTestId('modal-submit-button')

      fireEvent.click(submitButtonElement)

      await waitForDomChange()
    })

    expect(allergyServiceListMock).toBeCalledTimes(1)
    expect(allergyServiceListMock.mock.calls[0][0].filter.status).toStrictEqual(
      'completed',
    )
    // expect(
    //   allergyServiceListMock.mock.calls[0][0].filter.codeText,
    // ).toStrictEqual('Hello Test')
    expect(setResult).toBeCalledTimes(1)
  })

  it('reset Search data PatientMedicationRequestTable', async () => {
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
      return MedicationRequestServiceMock as MedicationRequestService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(MedicationRequestServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              authoredOnText: '2019-01-01',
              id: '1',
              medicationCodeableConcept: 'Acetaminophen 160 MG',
              status: 'active',
            },
            {
              authoredOnText: '2019-01-02',
              id: '2',
              medicationCodeableConcept: 'BB',
              status: 'completed',
            },
          ],
          error: null,
          totalCount: 2,
        })
      })

    const { getByTestId } = render(
      <PatientMedicationRequestTable patientId={'1'} />,
    )
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const resetButtonElement = getByTestId('modal-reset-button')
    fireEvent.click(resetButtonElement)
    await waitForDomChange()

    expect(allergyServiceListMock.mock.calls[0][0].filter).toStrictEqual({
      authoredOn_lt: undefined,
      medicationCodeableConcept: '',
      patientId: '1',
      status: '',
    })
    expect(setResult).toBeCalledTimes(1)

    fireEvent.click(filterIconElement)
  })

  it('submit Search with error PatientMedicationRequestTable', async () => {
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
      return MedicationRequestServiceMock as MedicationRequestService
    })
    jest.spyOn(MedicationRequestServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId, getByText } = render(
      <PatientMedicationRequestTable
        patientId={'1'}
        initialFilter={{ status: 'stopped' }}
      />,
    )
    expect(setResult).toBeCalledTimes(0)
    await act(async () => {
      const filterIconElement = getByTestId('toolbar-filter-icon')
      fireEvent.click(filterIconElement)
      await waitForDomChange()
      const statusElement = getByText('Stopped')
      userEvent.click(statusElement)
      userEvent.click(getByText('Completed'))

      //   const nameInputElement = getByTestId('adaptive-input-text-codeText')
      //   fireEvent.change(nameInputElement, { target: { value: 'Hello Test' } })

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

  it('reset Search with error PatientMedicationRequestTable', async () => {
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
      return MedicationRequestServiceMock as MedicationRequestService
    })
    jest.spyOn(MedicationRequestServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId } = render(
      <PatientMedicationRequestTable patientId={'1'} />,
    )
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

  it('error PatientMedicationRequestTable', () => {
    const errorText = 'Test Error'
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          authoredOnText: '2019-01-01',
          id: '1',
          medicationCodeableConcept: 'Acetaminophen 160 MG',
          status: 'active',
        },
        {
          authoredOnText: '2019-01-02',
          id: '2',
          medicationCodeableConcept: 'BB',
          status: 'completed',
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
      <PatientMedicationRequestTable patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
