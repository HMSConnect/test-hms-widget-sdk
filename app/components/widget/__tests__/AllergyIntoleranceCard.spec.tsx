import useAllergyIntoleranceList from '@components/hooks/useAllergyIntoleranceList'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import * as React from 'react'
import AllergyIntoleranceCard from '../medical-records/AllergyIntoleranceCard'

jest.mock('@components/hooks/useAllergyIntoleranceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<AllergyIntoleranceCard />', () => {
  beforeAll(() => {
    const router = jest.spyOn(nextRouter, 'useRouter') as any
    router.mockImplementation(() => ({
      query: {
        encounterId: '0001',
        patientId: '0001',
      },
    }))
    // jest.spyOn(HMSService, 'getService').mockImplementation(() => {
    //   return AllergyIntoleranceServiceMock as AllergyIntoleranceService
    // })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('render AllergyIntoleranceCard', () => {
    const useAllergyIntoleranceListResult: any = useAllergyIntoleranceList as any
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
          codeText: 'House dust mite allergy',
          criticality: 'high',
          id: '2',
        },
        {
          assertedDateText: '2019-01-02',
          codeText: 'House dust mite allergy',
          criticality: 'unable-to-assess',
          id: '3',
        },
      ],
      error: null,
      totalCount: 3,
    }
    useAllergyIntoleranceListResult.mockImplementation(() => results)
    const { queryByText } = render(<AllergyIntoleranceCard />)

    expect(queryByText('Allergy to bee venom')).toBeTruthy()
  })

  it('loading AllergyIntoleranceCard', () => {
    const useAllergyIntoleranceListResult: any = useAllergyIntoleranceList as any
    const results: any = {
      data: [],
      error: null,
      isLoading: true,
    }
    useAllergyIntoleranceListResult.mockImplementation(() => results)
    const { queryByText } = render(<AllergyIntoleranceCard />)

    expect(queryByText('loading..')).toBeTruthy()
  })

  it('error AllergyIntoleranceCard', () => {
    const errorText = 'Test Error'
    const useAllergyIntoleranceListResult: any = useAllergyIntoleranceList as any
    const results: any = {
      data: [],
      error: errorText,
      isLoading: false,
    }
    useAllergyIntoleranceListResult.mockImplementation(() => results)
    const { queryByText } = render(<AllergyIntoleranceCard />)

    expect(queryByText('Test Error')).toBeTruthy()
  })
})
