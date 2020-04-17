import { renderHook } from '@testing-library/react-hooks'

import PatientServiceMock from '@services/__mocks__/PatientServiceMock'
import { HMSService } from '../../../services/HMSServiceFactory'
import PatientService from '../../../services/PatientService'
import usePatient from '../usePatient'

describe('UsePatient', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return PatientServiceMock as PatientService
    })
  })

  it('initial UsePatient', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePatient('1234'))
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual({
      birth: '2018/11/11',
      id: '1',
      name: 'test1',
    })
  })

  it('error UsePatient', async () => {
    jest.spyOn(PatientServiceMock, 'load').mockImplementation(() => {
      return Promise.reject(new Error('error Test'))
    })
    const { result, waitForNextUpdate } = renderHook(() => usePatient('1234'))
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error Test')
  })
})
