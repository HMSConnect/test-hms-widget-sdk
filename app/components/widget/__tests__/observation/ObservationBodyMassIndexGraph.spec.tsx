import useObservationList from '@components/hooks/useObservationList'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import * as React from 'react'
import ObservationBodyMassIndexGraph from '../../observation/ObservationBodyMassIndexGraph'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<ObservationBodyMassIndexGraph />', () => {
  beforeAll(() => {
    const router = jest.spyOn(nextRouter, 'useRouter') as any
    router.mockImplementation(() => ({
      query: {
        encounterId: '0001',
        patientId: '0001',
      },
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  // it('render ObservationBodyMassIndexGraph', () => {
  //   const useObservationListResult: any = useObservationList as any
  //   const results: any = {
  //     data: [
  //       {
  //         codeText: 'Code Text1',
  //         id: '1',
  //         issued: '2019-01-01',
  //         valueModal: [
  //           {
  //             code: 'Systolic Blood Pressure',
  //             unit: 'mmHg',
  //             value: 120,
  //           },
  //           {
  //             code: 'Diastolic Blood Pressure',
  //             unit: 'mmHg',
  //             value: 89,
  //           },
  //         ],
  //       },
  //     ],
  //     error: null,
  //     totalCount: 2,
  //   }
  //   useObservationListResult.mockImplementation(() => results)
  //   const query = {
  //     encounterId: '1',
  //     patientId: '1',
  //   }
  //   const { queryByText, queryAllByText } = render(
  //     <ObservationBodyMassIndexGraph patientId={'1'} />,
  //   )

  //   expect(queryByText('31')).toBeTruthy()
  //   expect(queryAllByText('C')).toBeTruthy()
  // })

  it('loading ObservationBodyMassIndexGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      isLoading: true,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText, queryAllByText } = render(
      <ObservationBodyMassIndexGraph patientId={query.patientId} />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })

  it('error ObservationBodyMassIndexGraph', () => {
    const errorText = 'Error'
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: errorText,
      isLoading: true,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText } = render(
      <ObservationBodyMassIndexGraph patientId={query.patientId} />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
