import PatientServiceMock from '@services/__mocks__/PatientServiceMock'
import { renderHook } from '@testing-library/react-hooks'
import { HMSService } from '../../../services/HMSServiceFactory'
import PatientService from '../../../services/PatientService'
import usePatientList from '../usePatientList'

describe('usePatientList', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return PatientServiceMock as PatientService
    })
  })

  it('initial usePatientList', async () => {
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      usePatientList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual([
      {
        birth: '2018/11/11',
        id: '1',
        name: 'test1',
      },
      {
        birth: '2019/01/01',
        id: '2',
        name: 'test2',
      },
    ])
    expect(result.current.totalCount).toStrictEqual(2)
  })

  it('error usePatientList', async () => {
    jest.spyOn(PatientServiceMock, 'list').mockImplementation(() => {
      return Promise.reject(Error('error Test'))
    })
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      usePatientList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error Test')
  })
})
