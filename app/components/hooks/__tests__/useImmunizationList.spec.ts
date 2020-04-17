import ImmunizationServiceMock from '@services/__mocks__/ImmunizationServiceMock'
import ImmunizationService from '@services/ImmunizationService'
import { renderHook } from '@testing-library/react-hooks'
import { HMSService } from '../../../services/HMSServiceFactory'
import useImmunizationList from '../useImmunizationList'

describe('useImmunizationList', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return ImmunizationServiceMock as ImmunizationService
    })
  })

  it('initial useImmunizationList', async () => {
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useImmunizationList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual([
      {
        dateText: '2019-01-01',
        id: '1',
        status: 'completed',
        vaccineCode: 'Influenza, seasonal, injectable, preservative free',
      },
      {
        dateText: '2019-01-02',
        id: '2',
        status: 'not-done',
        vaccineCode: 'Td (adult) preservative free',
      },
    ])
    expect(result.current.totalCount).toStrictEqual(2)
  })

  it('error useImmunizationList', async () => {
    jest.spyOn(ImmunizationServiceMock, 'list').mockImplementation(() => {
      return Promise.reject(Error('error!!!'))
    })
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useImmunizationList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!!')
  })
})
