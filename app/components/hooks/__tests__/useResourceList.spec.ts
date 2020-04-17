import PatientServiceMock from '@services/__mocks__/PatientServiceMock'
import { renderHook } from '@testing-library/react-hooks'
import { HMSService } from '../../../services/HMSServiceFactory'
import PatientService from '../../../services/PatientService'
import useResourceList from '../useResourceList'

describe('useResourceList', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return PatientServiceMock as PatientService
    })
  })

  it('initial useResourceList', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useResourceList('1234'),
    )
    expect(result.error).toBeUndefined()
    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.data).toStrictEqual([
      { resourceType: 'patient', totalCount: 1, data: [] },
      {
        data: [
          {
            type: 'ADMS',
          },
          {
            type: 'EECM',
          },
        ],
        resourceType: 'encounter',
        totalCount: 2,
      },
    ])
  })

  it('error useResourceList', async () => {
    jest.spyOn(PatientServiceMock, 'resourceList').mockImplementation(() => {
      return Promise.reject(Error('error Test'))
    })
    const { result, waitForNextUpdate } = renderHook(() =>
      useResourceList('1234'),
    )
    expect(result.error).toBeUndefined()
    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.error).toBe('error Test')
  })
})
