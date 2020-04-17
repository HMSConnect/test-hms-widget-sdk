import EncounterServiceMock from '@services/__mocks__/EncounterServiceMock'
import EncounterService from '@services/EncounterService'
import { renderHook } from '@testing-library/react-hooks'
import { HMSService } from '../../../services/HMSServiceFactory'
import useEncounterList from '../useEncounterList'

describe('useEncounterList', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })
  })

  it('initial useEncounterList', async () => {
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useEncounterList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual([
      {
        id: '1',
        reason: 'Test1',
        serviceProvider: {
          name: `ServiceTest1`,
        },
        type: 'ADMS',
      },
      {
        id: '2',
        reason: 'Test1',
        serviceProvider: {
          name: `ServiceTest2`,
        },
        type: 'EECM',
      },
    ])
    expect(result.current.totalCount).toStrictEqual(2)
  })

  it('error useEncounterList', async () => {
    jest.spyOn(EncounterServiceMock, 'list').mockImplementation(() => {
      return Promise.reject(Error('error!!!'))
    })
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useEncounterList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!!')
  })
})
