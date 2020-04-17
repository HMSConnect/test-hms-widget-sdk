import usePatientList, { IPaginationOption } from '@components/hooks/usePatientList'
import { routesMock } from '@routes/__mocks__/routesMock'
import { cleanup, fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { stringify } from 'qs'
import * as React from 'react'
import routes from '../../../../routes'
import PatientSearch from '../../patient/PatientSearch'


beforeEach(() => {
  cleanup()
})

jest.mock('@components/hooks/usePatientList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('../../../../routes', () => ({
  __esModule: true,
  default: routesMock,
}))

describe('<PatientSearch />', () => {
  let mockQuery: IPaginationOption
  beforeAll(() => {
    mockQuery = {
      filter: {
        gender: 'all',
        searchText: '',
      },
      max: 10,
      offset: 0,
      page: 0,
      sort: {
        order: 'desc',
        orderBy: 'id',
      },
    }
    const usePatientListResult: any = usePatientList as any
    const results: any = {
      data: [],
      totalCount: 20,
    }
    for (let i = 0; i < 20; i++) {
      results.data.push({
        gender: i % 2 === 0 ? 'male' : 'female',
        name: {
          family: `FTest${i}`,
          given: [`Test${i}`],
        },
      })
    }
    usePatientListResult.mockImplementation(() => results)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientSearch', () => {
    const { queryByText } = render(<PatientSearch query={mockQuery} />)
    expect(queryByText('Test1 FTest1')).toBeTruthy()
  })

  // it('render searchText name PatientSearch', () => {
  //   const newMockQuery = {
  //     ...mockQuery,
  //     filter: {
  //       gender: 'all',
  //       searchText: 'Test1',
  //     },
  //   }
  //   const { queryByText } = render(<PatientSearch query={newMockQuery} />)
  //   expect(queryByText('Test1 FTest1')).toBeTruthy()
  //   // expect(queryByText('Test1 FTest1')).toBeTruthy()
  //   // expect(queryByText('Test2 FTest2')).toBeFalsy()
  // })

  it('select patient PatientSearch', () => {
    const { queryByText, getByText } = render(
      <PatientSearch query={mockQuery} />,
    )

    const patientElement = getByText('Test1 FTest1')

    fireEvent.click(patientElement)

    expect(queryByText('Test1 FTest1')).toBeTruthy()
    const pushRouteFn = routes.Router.pushRoute

    expect(pushRouteFn).toBeCalled()
  })

  it('sort by gender patient PatientSearch', () => {
    const { getAllByText } = render(<PatientSearch query={mockQuery} />)
    const genderTitleElement = getAllByText('Gender')[1]

    fireEvent.click(genderTitleElement)
    const replaceRouteFn = routes.Router.replaceRoute

    expect(replaceRouteFn).toBeCalled()

    expect(replaceRouteFn.mock.calls[0][0]).toStrictEqual(
      `/patient-search?${stringify({
        ...mockQuery,
        sort: {
          order: 'desc',
          orderBy: 'gender',
        },
      })}`,
    )
  })

  it('change page patient PatientSearch', () => {
    const { getByTestId } = render(<PatientSearch query={mockQuery} />)
    fireEvent.click(getByTestId('next-page'))

    const replaceRouteFn = routes.Router.replaceRoute
    expect(replaceRouteFn).toBeCalled()
    const paginationOptionMock = {
      max: 10,
      offset: 10,
      page: 1,
    }
    expect(replaceRouteFn.mock.calls[0][0]).toStrictEqual(
      `/patient-search?${stringify({
        ...paginationOptionMock,
        filter: {
          gender: 'all',
          searchText: '',
        },
        sort: {
          order: 'desc',
          orderBy: 'id',
        },
      })}`,
    )
  })

  it('search submit/reset by gender patient PatientSearch', async () => {
    const { getAllByText, getByTestId, getByText } = render(
      <PatientSearch query={mockQuery} />,
    )
    const genderOption = getByTestId('select-option-input-gender-select')
    userEvent.click(getAllByText('All')[0])
    userEvent.click(getByText('Male'))

    const textFieldElement = getByTestId('text-field')
    fireEvent.change(textFieldElement, { target: { value: 'test' } })

    fireEvent.click(getByTestId('submit-button'))
    const replaceRouteFn = routes.Router.replaceRoute

    expect(replaceRouteFn).toBeCalled()
    expect(replaceRouteFn.mock.calls[0][0]).toStrictEqual(
      `/patient-search?${stringify({
        ...mockQuery,
        filter: {
          gender: 'male',
          searchText: 'test',
        },
      })}`,
    )

    const resetButtonElement = getByTestId('reset-button')
    fireEvent.click(resetButtonElement)

    expect(replaceRouteFn).toHaveBeenCalledTimes(2)
    expect(replaceRouteFn.mock.calls[1][0]).toStrictEqual(`/patient-search`)
  })
})
