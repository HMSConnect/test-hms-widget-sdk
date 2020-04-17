import { act, renderHook } from '@testing-library/react-hooks'

import useLazyLoad from '../useLazyLoad'

describe('useLazyLoad', () => {
  it('initial useLazyLoad', () => {
    const mockResourceList = [
      {
        reason: 'Test1',
        type: 'ADMS'
      },
      {
        reason: 'Test1',
        type: 'EECM'
      }
    ]
    const fetchMoreAsync = jest.fn()
    const { result } = renderHook(() =>
      useLazyLoad(mockResourceList, fetchMoreAsync)
    )

    expect(result.error).toBeUndefined()

    expect(result.current.data).toStrictEqual([
      {
        reason: 'Test1',
        type: 'ADMS'
      },
      {
        reason: 'Test1',
        type: 'EECM'
      }
    ])
  })

  it('fetch useLazyLoad', async () => {
    const mockResourceList = [
      {
        reason: 'Test1',
        type: 'ADMS'
      },
      {
        reason: 'Test1',
        type: 'EECM'
      }
    ]
    const fetchMoreAsync = async () => {
      return await Promise.resolve([
        {
          reason: 'Test3',
          type: 'ADMS'
        },
        {
          reason: 'Test4',
          type: 'EECM'
        }
      ])
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useLazyLoad(mockResourceList, fetchMoreAsync)
    )
    await act(async () => {
      result.current.setIsFetch(true)
      await waitForNextUpdate()
    })

    expect(result.current.data).toStrictEqual([
      {
        reason: 'Test1',
        type: 'ADMS'
      },
      {
        reason: 'Test1',
        type: 'EECM'
      },
      {
        reason: 'Test3',
        type: 'ADMS'
      },
      {
        reason: 'Test4',
        type: 'EECM'
      }
    ])
  })

  it('fetch empty data useLazyLoad', async () => {
    const mockResourceList = [
      {
        reason: 'Test1',
        type: 'ADMS'
      },
      {
        reason: 'Test1',
        type: 'EECM'
      }
    ]
    const fetchMoreAsync = async () => {
      return await Promise.resolve([])
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useLazyLoad(mockResourceList, fetchMoreAsync)
    )
    await act(async () => {
      result.current.setIsFetch(true)
      await waitForNextUpdate()
    })

    expect(result.current.data).toStrictEqual([
      {
        reason: 'Test1',
        type: 'ADMS'
      },
      {
        reason: 'Test1',
        type: 'EECM'
      }
    ])

    expect(result.current.isMore).toBeFalsy()
  })

  it('throw error useLazyLoad', async () => {
    const mockResourceList = [
      {
        reason: 'Test1',
        type: 'ADMS'
      },
      {
        reason: 'Test1',
        type: 'EECM'
      }
    ]
    const fetchMoreAsync = async () => {
      return Promise.reject(Error('error Test'))
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useLazyLoad(mockResourceList, fetchMoreAsync)
    )
    await act(async () => {
      result.current.setIsFetch(true)
      await waitForNextUpdate()
    })

    expect(result.current.error).toBe('error Test')
  })
})
