import * as React from 'react'

import useInfinitScroll from '@components/hooks/useInfinitScroll'
import AllergyIntoleranceServiceMock from '@services/__mocks__/AllergyIntoleranceServiceMock'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import { HMSService } from '@services/HMSServiceFactory'
import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import PatientAllergyIntoleranceTable from '../../patient/PatientAllergyIntoleranceTable'

jest.mock('@components/hooks/useAllergyIntoleranceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientAllergyIntoleranceTable />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
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

  it('render PatientAllergyIntoleranceTable', () => {
    const { queryByText } = render(
      <PatientAllergyIntoleranceTable patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('Allergy to bee venom')).toBeTruthy()
    expect(queryByText('House dust mite allergy2')).toBeTruthy()
  })

  // it('scroll PatientAllergyIntoleranceTable', () => {
  //   const { queryByText } = render(
  //     <PatientAllergyIntoleranceTable patientId={'1'} isInitialize={true} />,
  //   )

  //   expect(queryByText('Allergy to bee venom')).toBeTruthy()
  //   expect(queryByText('House dust mite allergy2')).toBeTruthy()
  // })

  it('submit search data PatientAllergyIntoleranceTable', async () => {
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
      return AllergyIntoleranceServiceMock as AllergyIntoleranceService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(AllergyIntoleranceServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
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
          error: null,
          totalCount: 3,
        })
      })

    const { getByTestId, getAllByText } = render(
      <PatientAllergyIntoleranceTable patientId={'1'} />,
    )
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const nameInputElement = getByTestId('adaptive-input-text-codeText')

    fireEvent.change(nameInputElement, { target: { value: 'test' } })

    const submitButtonElement = getByTestId('modal-submit-button')
    fireEvent.click(submitButtonElement)

    await waitForDomChange()

    expect(allergyServiceListMock).toBeCalledTimes(1)
    expect(
      allergyServiceListMock.mock.calls[0][0].filter.codeText,
    ).toStrictEqual('test')
    expect(setResult).toBeCalledTimes(1)
    expect(setResult.mock.calls[0][0].data).toStrictEqual([
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
    ])
  })

  it('reset Search data PatientAllergyIntoleranceTable', async () => {
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
      return AllergyIntoleranceServiceMock as AllergyIntoleranceService
    })

    const allergyServiceListMock = jest.fn()
    jest
      .spyOn(AllergyIntoleranceServiceMock, 'list')
      .mockImplementation((params: any) => {
        allergyServiceListMock(params)
        return Promise.resolve({
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
          error: null,
          totalCount: 3,
        })
      })

    const { getByTestId } = render(
      <PatientAllergyIntoleranceTable patientId={'1'} />,
    )
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const resetButtonElement = getByTestId('modal-reset-button')
    fireEvent.click(resetButtonElement)
    await waitForDomChange()

    expect(allergyServiceListMock.mock.calls[0][0].filter).toStrictEqual({
      assertedDate_lt: undefined,
      category: '',
      codeText: '',
      criticality: '',
      patientId: '1',
      type: '',
    })
    expect(setResult).toBeCalledTimes(1)

    fireEvent.click(filterIconElement)
  })

  it('submit Search with error PatientAllergyIntoleranceTable', async () => {
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
      return AllergyIntoleranceServiceMock as AllergyIntoleranceService
    })
    jest.spyOn(AllergyIntoleranceServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId } = render(
      <PatientAllergyIntoleranceTable patientId={'1'} />,
    )
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const submitButtonElement = getByTestId('modal-submit-button')

    fireEvent.click(submitButtonElement)

    await waitForDomChange()

    expect(setResult).toBeCalledTimes(1)

    expect(setResult.mock.calls[0][0]).toStrictEqual({
      data: [],
      error: 'error!!!',
    })
  })

  it('reset Search with error PatientAllergyIntoleranceTable', async () => {
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
      return AllergyIntoleranceServiceMock as AllergyIntoleranceService
    })
    jest.spyOn(AllergyIntoleranceServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId } = render(
      <PatientAllergyIntoleranceTable patientId={'1'} />,
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

  it('error PatientAllergyIntoleranceTable', () => {
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
      <PatientAllergyIntoleranceTable patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
