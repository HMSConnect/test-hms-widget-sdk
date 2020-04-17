import * as React from 'react'

import ImagingStudyServiceMock from '@services/__mocks__/ImagingStudyServiceMock'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import ImagingStudyService from '@services/ImagingStudyService'
import { HMSService } from '@services/HMSServiceFactory'
import {
  act,
  fireEvent,
  render,
  waitForDomChange,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientImagingStudyTable from '../../patient/PatientImagingStudyTable'

jest.mock('@components/hooks/useAllergyIntoleranceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientImagingStudyTable />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          id: '1',
          series: [
            {
              instance: [
                {
                  title: 'Image of ankle',
                },
              ],
            },
          ],
          startedText: '2019-01-01',
        },
        {
          id: '2',
          series: [
            {
              instance: [
                {
                  title: 'Image of Neck',
                },
              ],
            },
            {
              instance: [
                {
                  title: 'Image of Head',
                },
              ],
            },
          ],
          startedText: '2019-01-02',
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

  it('render PatientImagingStudyTable', () => {
    const { queryByText } = render(
      <PatientImagingStudyTable patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('Image of Neck')).toBeTruthy()
    expect(queryByText('Image of Head')).toBeTruthy()
  })
  //   it('submit search data PatientImagingStudyTable', async () => {
  //     const setResult = jest.fn()
  //     const useObservaionLaboratoryListResult: any = useInfinitScroll as any
  //     const results: any = {
  //       data: [],
  //       error: null,
  //       isFetch: false,
  //       isLoading: true,
  //       isMore: false,
  //       setIsFetch: jest.fn(),
  //       setIsMore: jest.fn(),
  //       setResult,
  //     }
  //     useObservaionLaboratoryListResult.mockImplementation(() => results)
  //     jest.spyOn(HMSService, 'getService').mockImplementation(() => {
  //       return ImagingStudyServiceMock as ImagingStudyService
  //     })

  //     const allergyServiceListMock = jest.fn()
  //     jest.spyOn(ImagingStudyServiceMock, 'list').mockImplementation((params: any) => {
  //       allergyServiceListMock(params)
  //       return Promise.resolve({
  //         data: [
  //           {
  //             billablePeriodStartText: '2019-01-01',
  //             id: '1',
  //             status: 'cancelled',
  //             totalPrice: '3000',
  //           },
  //           {
  //             billablePeriodStartText: '2019-01-02',
  //             id: '2',
  //             status: 'active',
  //             totalPrice: '600',
  //           },
  //         ],
  //         error: null,
  //         totalCount: 3,
  //       })
  //     })

  //     const { getByTestId, getAllByText, getByText } = render(
  //       <PatientImagingStudyTable patientId={'1'} />,
  //     )
  //     expect(setResult).toBeCalledTimes(0)

  //     await act(async () => {
  //       const filterIconElement = getByTestId('toolbar-filter-icon')
  //       fireEvent.click(filterIconElement)
  //       await waitForDomChange()
  //       const selectElement = getByText('Draft')
  //       userEvent.click(selectElement)
  //       const submitButtonElement = getByTestId('modal-submit-button')
  //       userEvent.click(getByText('Active'))

  //       fireEvent.click(submitButtonElement)

  //       await waitForDomChange()
  //     })

  //     expect(allergyServiceListMock).toBeCalledTimes(1)
  //     expect(allergyServiceListMock.mock.calls[0][0].filter.status).toStrictEqual(
  //       'active',
  //     )
  //     expect(setResult).toBeCalledTimes(1)
  //   })

  //   it('reset Search data PatientImagingStudyTable', async () => {
  //     const setResult = jest.fn()
  //     const useObservaionLaboratoryListResult: any = useInfinitScroll as any
  //     const results: any = {
  //       data: [],
  //       error: null,
  //       isFetch: false,
  //       isLoading: true,
  //       isMore: false,
  //       setIsFetch: jest.fn(),
  //       setIsMore: jest.fn(),
  //       setResult,
  //     }
  //     useObservaionLaboratoryListResult.mockImplementation(() => results)
  //     jest.spyOn(HMSService, 'getService').mockImplementation(() => {
  //       return ImagingStudyServiceMock as ImagingStudyService
  //     })

  //     const allergyServiceListMock = jest.fn()
  //     jest.spyOn(ImagingStudyServiceMock, 'list').mockImplementation((params: any) => {
  //       allergyServiceListMock(params)
  //       return Promise.resolve({
  //         data: [
  //           {
  //             billablePeriodStartText: '2019-01-01',
  //             id: '1',
  //             status: 'complete',
  //             totalPrice: '3000',
  //           },
  //           {
  //             billablePeriodStartText: '2019-01-02',
  //             id: '2',
  //             status: 'active',
  //             totalPrice: '600',
  //           },
  //         ],
  //         error: null,
  //         totalCount: 3,
  //       })
  //     })

  //     const { getByTestId } = render(<PatientImagingStudyTable patientId={'1'} />)
  //     expect(setResult).toBeCalledTimes(0)
  //     const filterIconElement = getByTestId('toolbar-filter-icon')

  //     fireEvent.click(filterIconElement)

  //     const resetButtonElement = getByTestId('modal-reset-button')
  //     fireEvent.click(resetButtonElement)
  //     await waitForDomChange()

  //     expect(allergyServiceListMock.mock.calls[0][0].filter).toStrictEqual({
  //       billablePeriodStart_lt: undefined,
  //       organizationId: undefined,
  //       patientId: '1',
  //       status: '',
  //     })
  //     expect(setResult).toBeCalledTimes(1)
  //   })

  //   it('submit Search with error PatientImagingStudyTable', async () => {
  //     const setResult = jest.fn()
  //     const useObservaionLaboratoryListResult: any = useInfinitScroll as any
  //     const results: any = {
  //       data: [],
  //       error: null,
  //       isFetch: false,
  //       isLoading: true,
  //       isMore: false,
  //       setIsFetch: jest.fn(),
  //       setIsMore: jest.fn(),
  //       setResult,
  //     }
  //     useObservaionLaboratoryListResult.mockImplementation(() => results)
  //     jest.spyOn(HMSService, 'getService').mockImplementation(() => {
  //       return ImagingStudyServiceMock as ImagingStudyService
  //     })
  //     jest.spyOn(ImagingStudyServiceMock, 'list').mockImplementation(() => {
  //       throw Error('error!!!')
  //     })

  //     const { getByTestId, getByText } = render(
  //       <PatientImagingStudyTable patientId={'1'} />,
  //     )
  //     expect(setResult).toBeCalledTimes(0)
  //     await act(async () => {
  //       const filterIconElement = getByTestId('toolbar-filter-icon')
  //       fireEvent.click(filterIconElement)
  //       await waitForDomChange()
  //       const selectElement = getByText('Draft')
  //       userEvent.click(selectElement)
  //       const submitButtonElement = getByTestId('modal-submit-button')
  //       userEvent.click(getByText('Active'))
  //       fireEvent.click(submitButtonElement)
  //       await waitForDomChange()
  //     })

  //     expect(setResult).toBeCalledTimes(1)

  //     expect(setResult.mock.calls[0][0]).toStrictEqual({
  //       data: [],
  //       error: 'error!!!',
  //     })
  //   })

  //   it('reset Search with error PatientImagingStudyTable', async () => {
  //     const setResult = jest.fn()
  //     const useObservaionLaboratoryListResult: any = useInfinitScroll as any
  //     const results: any = {
  //       data: [],
  //       error: null,
  //       isFetch: false,
  //       isLoading: true,
  //       isMore: false,
  //       setIsFetch: jest.fn(),
  //       setIsMore: jest.fn(),
  //       setResult,
  //     }
  //     useObservaionLaboratoryListResult.mockImplementation(() => results)
  //     jest.spyOn(HMSService, 'getService').mockImplementation(() => {
  //       return ImagingStudyServiceMock as ImagingStudyService
  //     })
  //     jest.spyOn(ImagingStudyServiceMock, 'list').mockImplementation(() => {
  //       throw Error('error!!!')
  //     })

  //     const { getByTestId } = render(<PatientImagingStudyTable patientId={'1'} />)
  //     expect(setResult).toBeCalledTimes(0)
  //     const filterIconElement = getByTestId('toolbar-filter-icon')

  //     fireEvent.click(filterIconElement)

  //     const submitButtonElement = getByTestId('modal-reset-button')

  //     fireEvent.click(submitButtonElement)

  //     await waitForDomChange()

  //     expect(setResult).toBeCalledTimes(1)

  //     expect(setResult.mock.calls[0][0]).toStrictEqual({
  //       data: [],
  //       error: 'error!!!',
  //     })
  //   })

  it('error PatientImagingStudyTable', () => {
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
      <PatientImagingStudyTable patientId={'1'} isInitialize={true} />,
    )
    expect(queryByText('Test Error')).toBeTruthy()
  })
})
