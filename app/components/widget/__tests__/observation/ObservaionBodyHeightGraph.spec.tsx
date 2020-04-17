import useObservationList from '@components/hooks/useObservationList'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import * as React from 'react'
import ObservationBodyHeightGraph from '../../observation/ObservationBodyHeightGraph'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))
describe('<ObservaionBloodPressureCard />', () => {
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
  //   it('render ObservaionBloodPressureCard', () => {
  //     const useObservationListResult: any = useObservationList as any
  //     const results: any = {
  //   data: [
  //     {
  //       code: '8302-2',
  //       codeText: 'Body Height',
  //       id: '2',
  //       issued: '2019-01-01',
  //       unit: 'm',
  //       value: 168,
  //     },
  //   ],
  //       error: null,
  //       totalCount: 2,
  //     }
  //     useObservationListResult.mockImplementation(() => results)
  //     const query = {
  //       encounterId: '1',
  //       patientId: '1',
  //     }
  //     const { queryByText, queryAllByText } = render(
  //       <ObservationBodyHeightGraph query={query} />,
  //     )

  //     expect(queryByText('31')).toBeTruthy()
  //     expect(queryAllByText('C')).toBeTruthy()
  //   })

  it('loading ObservaionBloodPressureCard', () => {
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
      <ObservationBodyHeightGraph patientId={query.patientId} />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })
  it('error ObservaionBloodPressureCard', () => {
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
    const { queryByText } = render(<ObservationBodyHeightGraph patientId={query.patientId} />)
    expect(queryByText('Error')).toBeTruthy()
  })
})
