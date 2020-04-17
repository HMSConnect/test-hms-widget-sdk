import ConditionServiceMock from '@services/__mocks__/ConditionServiceMock'
import ConditionService from '@services/ConditionService'
import { HMSService } from '@services/HMSServiceFactory'
import { renderHook } from '@testing-library/react-hooks'
import useConditionList from '../useConditionList'

describe('useConditionList', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return ConditionServiceMock as ConditionService
    })
  })

  it('initial useConditionList', async () => {
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useConditionList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual([
      {
        clinicalStatus: 'resolved',
        codeText: 'Viral sinusitis',
        id: '1',
        onset: '2019-01-01',
      },
      {
        clinicalStatus: 'active',
        codeText: 'Acute bronchitis',
        id: '2',
        onset: '2019-01-02',
      },
    ])
    expect(result.current.totalCount).toStrictEqual(2)
  })

  it('error useConditionList', async () => {
    jest.spyOn(ConditionServiceMock, 'list').mockImplementation(() => {
      return Promise.reject(Error('error!!!'))
    })
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useConditionList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!!')
  })
})
