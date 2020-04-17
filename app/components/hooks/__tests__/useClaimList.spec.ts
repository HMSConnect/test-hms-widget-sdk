import ClaimServiceMock from '@services/__mocks__/ClaimServiceMock'
import ClaimService from '@services/ClaimService'
import { HMSService } from '@services/HMSServiceFactory'
import { renderHook } from '@testing-library/react-hooks'
import useClaimList from '../useClaimList'

describe('useClaimList', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return ClaimServiceMock as ClaimService
    })
  })

  it('initial useClaimList', async () => {
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useClaimList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual([
      {
        billablePeriodStartText: '2019-01-01',
        id: '1',
        status: 'complete',
        totalPrice: '3000',
      },
      {
        billablePeriodStartText: '2019-01-02',
        id: '2',
        status: 'active',
        totalPrice: '600',
      },
    ])
    expect(result.current.totalCount).toStrictEqual(2)
  })

  it('error useClaimList', async () => {
    jest.spyOn(ClaimServiceMock, 'list').mockImplementation(() => {
      return Promise.reject(Error('error!!!'))
    })
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useClaimList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!!')
  })
})
