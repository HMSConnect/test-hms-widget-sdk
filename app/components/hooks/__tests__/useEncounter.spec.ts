import EncounterServiceMock from '@services/__mocks__/EncounterServiceMock'
import { renderHook } from '@testing-library/react-hooks'
import EncounterService from '../../../services/EncounterService'
import { HMSService } from '../../../services/HMSServiceFactory'
import useEncounter from '../useEncounter'
describe('useEncounter', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })
  })

  it('initial useEncounter', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useEncounter('e00001'),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual({
      id: '1',
      reason: 'Test1',
      serviceProvider: {
        name: `ServiceTest1`,
      },
      type: 'ADMS',
    })
  })

  it('handler error useEncounter', async () => {
    jest.spyOn(EncounterServiceMock, 'load').mockImplementation(() => {
      return Promise.reject(new Error('error!!'))
    })

    const { result, waitForNextUpdate } = renderHook(() =>
      useEncounter('e00001'),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!')
  })
})
