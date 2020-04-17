import * as React from 'react'

import useObservationList from '@components/hooks/useObservationList'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import ObservationLaboratoryCard from '../../medical-records/ObservationLaboratoryCard'

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<ObservationLaboratoryCard />', () => {
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
  it('render ObservationLaboratoryCard', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [
        {
          codeText: 'Code Text1',
          id: '1',
          issued: '2019-01-01',
        },
        {
          codeText: 'Code Text2',
          id: '2',
          issued: '2019-01-01',
        },
      ],
      error: null,
      totalCount: 2,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText } = render(<ObservationLaboratoryCard />)

    expect(queryByText('Code Text1')).toBeTruthy()
  })

  it('loading ObservationLaboratoryCard', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      isLoading: true,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText } = render(<ObservationLaboratoryCard />)

    expect(queryByText('loading..')).toBeTruthy()
  })

  it('error ObservationLaboratoryCard', () => {
    const errorText = 'Test Error'
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: errorText,
      isLoading: false,
    }
    useObservationListResult.mockImplementation(() => results)
    const { queryByText } = render(<ObservationLaboratoryCard />)

    expect(queryByText('Test Error')).toBeTruthy()
  })
})
