import { renderHook } from '@testing-library/react-hooks'
import usePromise from '../utils/usePromise'

describe('usePromise', () => {
  it('usePromise fn<Promise> can resolve', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePromise(() => {
        return Promise.resolve({ data: {}, error: null })
      })
    )

    expect(result.error).toBeUndefined()
    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()
  })

  it('usePromise not a function can resolve', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePromise(Promise.resolve({ data: {}, error: null }))
    )
    expect(result.error).toBeUndefined()
    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()
  })

  it('usePromise can handle data is null', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      usePromise(() => {
        return Promise.resolve({ data: null, error: null })
      })
    )

    expect(result.error).toBeUndefined()
    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()
    expect(result.current.data).toStrictEqual({})
  })
})
