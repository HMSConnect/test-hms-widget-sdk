import * as React from 'react'

import useInfinitScroll from '@components/hooks/useInfinitScroll'
import PatientCarePlanTable from '@components/widget/patient/PatientCarePlanTable'
import CarePlanServiceMock from '@services/__mocks__/CarePlanServiceMock'
import CarePlanService from '@services/CarePlanService'
import { HMSService } from '@services/HMSServiceFactory'
import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('@components/hooks/useInfinitScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientCarePlanTable />', () => {
  beforeAll(() => {
    const useInfinitScrollResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          activity: [
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Recommendation to avoid exercise',
                },
              },
            },
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Deep breathing and coughing exercises',
                },
              },
            },
          ],
          category: 'Allergy to bee venom',
          id: '1',
          periodStartText: '2019-01-01',
          status: 'low',
        },
        {
          activity: [
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Recommendation to avoid exercise',
                },
              },
            },
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Deep breathing and coughing exercises',
                },
              },
            },
          ],
          category: 'House dust mite allergy1',
          id: '2',
          periodStartText: '2019-01-02',
          status: 'high',
        },
        {
          activity: [
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Recommendation to avoid exercise',
                },
              },
            },
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Deep breathing and coughing exercises',
                },
              },
            },
          ],
          category: 'House dust mite allergy2',
          id: '3',
          periodStartText: '2019-01-02',
          status: 'unable-to-assess',
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

  it('render PatientCarePlanTable', () => {
    const { queryByText } = render(
      <PatientCarePlanTable patientId={'1'} isInitialize={true} />,
    )

    expect(queryByText('Allergy to bee venom')).toBeTruthy()
    expect(queryByText('House dust mite allergy2')).toBeTruthy()
  })

  // it('scroll PatientCarePlanTable', () => {
  //   const { queryByText, getByTestId, queryAllByText } = render(
  //     <div style={{ height: 100 }} data-testid='container'>
  //       <PatientCarePlanTable patientId={'1'} isInitialize={true} />
  //     </div>,
  //   )

  //   expect(queryByText('Allergy to bee venom')).toBeTruthy()
  //   expect(queryByText('House dust mite allergy2')).toBeTruthy()

  //   const element = getByTestId('container')
  //   element.scrollTop = 100
  //   const event = createEvent.scroll(element)
  //   fireEvent(element, event)

  //   expect(queryAllByText('Allergy to bee venom')).toHaveLength(2)
  //   // window.innerHeight +
  //   // (window.pageYOffset || document.documentElement.scrollTop) +
  //   // 200 <
  //   // document.documentElement.offsetHeight
  // })

  it('submit search data PatientCarePlanTable', async () => {
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
      return CarePlanServiceMock as CarePlanService
    })

    const carePlanServiceListMock = jest.fn()
    jest
      .spyOn(CarePlanServiceMock, 'list')
      .mockImplementation((params: any) => {
        carePlanServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              activity: [
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Recommendation to avoid exercise',
                    },
                  },
                },
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Deep breathing and coughing exercises',
                    },
                  },
                },
              ],
              category: 'Allergy to bee venom',
              id: '1',
              periodStartText: '2019-01-01',
              status: 'low',
            },
            {
              activity: [
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Recommendation to avoid exercise',
                    },
                  },
                },
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Deep breathing and coughing exercises',
                    },
                  },
                },
              ],
              category: 'House dust mite allergy1',
              id: '2',
              periodStartText: '2019-01-02',
              status: 'high',
            },
            {
              activity: [
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Recommendation to avoid exercise',
                    },
                  },
                },
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Deep breathing and coughing exercises',
                    },
                  },
                },
              ],
              category: 'House dust mite allergy2',
              id: '3',
              periodStartText: '2019-01-02',
              status: 'unable-to-assess',
            },
          ],
          error: null,
          totalCount: 3,
        })
      })

    const {
      getByTestId,
      queryAllByText,
      getByText,
      getAllByText,
      getByRole,
      getAllByRole,
      container,
    } = render(
      <PatientCarePlanTable
        patientId={'1'}
        initialFilter={{ status: 'active' }}
      />,
    )
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    userEvent.click(filterIconElement)

    const activeOptionElement = getAllByText('Acitve')

    userEvent.click(activeOptionElement[0])
    const draftOptionElement = getByText('Draft')
    userEvent.click(draftOptionElement)

    const submitButtonElement = getByTestId('modal-submit-button')
    userEvent.click(submitButtonElement)

    await waitForDomChange()
    expect(carePlanServiceListMock).toBeCalledTimes(1)
    expect(
      carePlanServiceListMock.mock.calls[0][0].filter.status,
    ).toStrictEqual('draft')
    expect(setResult).toBeCalledTimes(1)
    expect(setResult.mock.calls[0][0].data).toStrictEqual([
      {
        activity: [
          {
            detail: {
              code: {
                status: 'completed',
                text: 'Recommendation to avoid exercise',
              },
            },
          },
          {
            detail: {
              code: {
                status: 'completed',
                text: 'Deep breathing and coughing exercises',
              },
            },
          },
        ],
        category: 'Allergy to bee venom',
        id: '1',
        periodStartText: '2019-01-01',
        status: 'low',
      },
      {
        activity: [
          {
            detail: {
              code: {
                status: 'completed',
                text: 'Recommendation to avoid exercise',
              },
            },
          },
          {
            detail: {
              code: {
                status: 'completed',
                text: 'Deep breathing and coughing exercises',
              },
            },
          },
        ],
        category: 'House dust mite allergy1',
        id: '2',
        periodStartText: '2019-01-02',
        status: 'high',
      },
      {
        activity: [
          {
            detail: {
              code: {
                status: 'completed',
                text: 'Recommendation to avoid exercise',
              },
            },
          },
          {
            detail: {
              code: {
                status: 'completed',
                text: 'Deep breathing and coughing exercises',
              },
            },
          },
        ],
        category: 'House dust mite allergy2',
        id: '3',
        periodStartText: '2019-01-02',
        status: 'unable-to-assess',
      },
    ])
  })

  it('reset Search data PatientCarePlanTable', async () => {
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
      return CarePlanServiceMock as CarePlanService
    })

    const carePlanServiceListMock = jest.fn()
    jest
      .spyOn(CarePlanServiceMock, 'list')
      .mockImplementation((params: any) => {
        carePlanServiceListMock(params)
        return Promise.resolve({
          data: [
            {
              activity: [
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Recommendation to avoid exercise',
                    },
                  },
                },
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Deep breathing and coughing exercises',
                    },
                  },
                },
              ],
              category: 'Allergy to bee venom',
              id: '1',
              periodStartText: '2019-01-01',
              status: 'low',
            },
            {
              activity: [
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Recommendation to avoid exercise',
                    },
                  },
                },
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Deep breathing and coughing exercises',
                    },
                  },
                },
              ],
              category: 'House dust mite allergy1',
              id: '2',
              periodStartText: '2019-01-02',
              status: 'high',
            },
            {
              activity: [
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Recommendation to avoid exercise',
                    },
                  },
                },
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Deep breathing and coughing exercises',
                    },
                  },
                },
              ],
              category: 'House dust mite allergy2',
              id: '3',
              periodStartText: '2019-01-02',
              status: 'unable-to-assess',
            },
          ],
          error: null,
          totalCount: 3,
        })
      })

    const { getByTestId } = render(<PatientCarePlanTable patientId={'1'} />)
    expect(setResult).toBeCalledTimes(0)
    const filterIconElement = getByTestId('toolbar-filter-icon')

    fireEvent.click(filterIconElement)

    const resetButtonElement = getByTestId('modal-reset-button')
    fireEvent.click(resetButtonElement)
    await waitForDomChange()

    expect(carePlanServiceListMock.mock.calls[0][0].filter).toStrictEqual({
      category: '',
      patientId: '1',
      periodStart_lt: undefined,
      status: '',
    })
    expect(setResult).toBeCalledTimes(1)

    fireEvent.click(filterIconElement)
  })

  it('submit Search with error PatientCarePlanTable', async () => {
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
      return CarePlanServiceMock as CarePlanService
    })
    jest.spyOn(CarePlanServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId } = render(<PatientCarePlanTable patientId={'1'} />)
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

  it('reset Search with error PatientCarePlanTable', async () => {
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
      return CarePlanServiceMock as CarePlanService
    })
    jest.spyOn(CarePlanServiceMock, 'list').mockImplementation(() => {
      throw Error('error!!!')
    })

    const { getByTestId } = render(<PatientCarePlanTable patientId={'1'} />)
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

  it('error PatientCarePlanTable', () => {
    const errorText = 'Test Error'
    const useObservaionLaboratoryListResult: any = useInfinitScroll as any
    const results: any = {
      data: [
        {
          activity: [
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Recommendation to avoid exercise',
                },
              },
            },
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Deep breathing and coughing exercises',
                },
              },
            },
          ],
          category: 'Allergy to bee venom',
          id: '1',
          periodStartText: '2019-01-01',
          status: 'low',
        },
        {
          activity: [
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Recommendation to avoid exercise',
                },
              },
            },
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Deep breathing and coughing exercises',
                },
              },
            },
          ],
          category: 'House dust mite allergy1',
          id: '2',
          periodStartText: '2019-01-02',
          status: 'high',
        },
        {
          activity: [
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Recommendation to avoid exercise',
                },
              },
            },
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Deep breathing and coughing exercises',
                },
              },
            },
          ],
          category: 'House dust mite allergy2',
          id: '3',
          periodStartText: '2019-01-02',
          status: 'unable-to-assess',
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
      <PatientCarePlanTable patientId={'1'} isInitialize={true} />,
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
      isLoading: false,
      isMore: false,
      setIsFetch: jest.fn(),
      setIsMore: jest.fn(),
      setResult,
    }
    useObservaionLaboratoryListResult.mockImplementation(() => results)
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return CarePlanServiceMock as CarePlanService
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
      .spyOn(CarePlanServiceMock, 'list')
      .mockImplementation((params: any) => {
        testFn(params)
        // expect(params.filter.category).toStrictEqual('Respiratory therapy')
        return Promise.resolve({
          data: [
            {
              activity: [
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Recommendation to avoid exercise',
                    },
                  },
                },
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Deep breathing and coughing exercises',
                    },
                  },
                },
              ],
              category: 'Allergy to bee venom',
              id: '1',
              periodStartText: '2019-01-01',
              status: 'low',
            },
          ],
          error: null,
          totalCount: 1,
        })
      })
    const { getByTestId } = render(<PatientCarePlanTable patientId={'1'} />)

    const groupByCheckboxElement = getByTestId('check-by-type-input')
    userEvent.click(groupByCheckboxElement)
    await waitForDomChange()
    expect(testFn.mock.calls[0][0].filter.category).toStrictEqual(
      'Respiratory therapy',
    )

    userEvent.click(groupByCheckboxElement)
    await waitForDomChange()
    expect(testFn.mock.calls[1][0].filter.category).toStrictEqual(undefined)
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
      return CarePlanServiceMock as CarePlanService
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
      .spyOn(CarePlanServiceMock, 'list')
      .mockImplementation((params: any) => {
        testFn(params)
        // expect(params.filter.category).toStrictEqual('Respiratory therapy')
        return Promise.resolve({
          data: [
            {
              activity: [
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Recommendation to avoid exercise',
                    },
                  },
                },
                {
                  detail: {
                    code: {
                      status: 'completed',
                      text: 'Deep breathing and coughing exercises',
                    },
                  },
                },
              ],
              category: 'Allergy to bee venom',
              id: '1',
              periodStartText: '2019-01-01',
              status: 'low',
            },
          ],
          error: null,
          totalCount: 1,
        })
      })
    const { getByTestId, getAllByText } = render(
      <PatientCarePlanTable patientId={'1'} />,
    )

    const groupByCheckboxElement = getByTestId('check-by-type-input')
    userEvent.click(groupByCheckboxElement)
    await waitForDomChange()
    expect(testFn.mock.calls[0][0].filter.category).toStrictEqual(
      'Respiratory therapy',
    )

    const textTabElement = getAllByText('Self care')
    userEvent.click(textTabElement[0])
    await waitForDomChange()
    expect(testFn.mock.calls[1][0].filter.category).toStrictEqual('Self care')
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
      return CarePlanServiceMock as CarePlanService
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
      .spyOn(CarePlanServiceMock, 'categoryList')
      .mockImplementation((params: any) => {
        return Promise.reject(new Error('test error'))
      })
    const { getByTestId, queryByText } = render(
      <PatientCarePlanTable patientId={'1'} />,
    )

    const groupByCheckboxElement = getByTestId('check-by-type-input')
    userEvent.click(groupByCheckboxElement)
    await waitForDomChange()
    expect(setResult.mock.calls[0][0].error).toBe('test error')
  })
})
