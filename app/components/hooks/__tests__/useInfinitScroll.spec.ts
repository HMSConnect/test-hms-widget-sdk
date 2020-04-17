import { act, renderHook } from '@testing-library/react-hooks'
import useInfinitScroll from '../useInfinitScroll'
import { fireEvent } from '@testing-library/react'

describe('useInfinitScroll', () => {
  it('initial useInfinitScroll', async () => {
    const fetchMoreAsync = jest.fn()
    const div = document.createElement('div')
    const initialResourceList = [
      {
        type: 'ADMS',
      },
      {
        type: 'EECM',
      },
    ]
    const { result, waitForNextUpdate } = renderHook(() =>
      useInfinitScroll(div, fetchMoreAsync, initialResourceList),
    )
    expect(result.current.data).toStrictEqual(initialResourceList)
  })
  it('initial useInfinitScroll without ref', async () => {
    const fetchMoreAsync = jest.fn()
    const initialResourceList = [
      {
        type: 'ADMS',
      },
      {
        type: 'EECM',
      },
    ]
    const { result, waitForNextUpdate } = renderHook(() =>
      useInfinitScroll(null, fetchMoreAsync, initialResourceList),
    )
    expect(result.current.data).toStrictEqual(initialResourceList)
  })

  it('window infinit scroll call useInfinitScroll', async () => {
    const fetchMoreAsync = jest.fn()
    const initialResourceList = [
      {
        type: 'ADMS',
      },
      {
        type: 'EECM',
      },
    ]
    const { result, waitForNextUpdate } = renderHook(() =>
      useInfinitScroll(null, fetchMoreAsync, initialResourceList),
    )
    expect(result.current.data).toStrictEqual(initialResourceList)
    // await act(async () => {
    //   result.current.setIsFetch(true)
    //   await waitForNextUpdate()
    // })

    // console.log('div,scrollTop  :', div.scrollTop)
    // div.scrollTop = 100
    // window.scrollTo(0, 100)
    // console.log('div,scrollTop  :', div.scrollTop)

    // expect(result.current.isFetch).toBeTruthy()

    // fireEvent.scroll(window, { target: { scrollY: 100 } })
    await act(async () => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } })
      // await waitForNextUpdate()
    })

    await act(async () => {
      fireEvent.scroll(window, { target: { pageYOffset: 1000 } })
      await waitForNextUpdate()
    })

    // expect(elementMock.addEventListener).toBeCalled()
    expect(fetchMoreAsync).toHaveBeenCalled()
    expect(fetchMoreAsync).toBeCalledTimes(1)
    // expect(false).toBeTruthy()
  })

  it('ref infinit scroll call useInfinitScroll', async () => {
    const fetchMoreAsync = jest.fn()
    const div = document.createElement('div')
    // div.style.height = '2800px'
    div.style.maxHeight = '50px'
    div.style.overflow = 'auto'
    const div2 = document.createElement('div')
    div.style.height = '2800px'
    div.appendChild(div2)
    const initialResourceList = [
      {
        type: 'ADMS',
      },
      {
        type: 'EECM',
      },
    ]
    const { result, waitForNextUpdate } = renderHook(() =>
      useInfinitScroll(div, fetchMoreAsync, initialResourceList),
    )
    expect(result.current.data).toStrictEqual(initialResourceList)
    await act(async () => {
      fireEvent.scroll(div, { target: { scrollTop: 100 } })
      // await waitForNextUpdate()
    })
    await act(async () => {
      fireEvent.scroll(div, { target: { scrollTop: 1000 } })
      await waitForNextUpdate()
    })
    expect(fetchMoreAsync).toHaveBeenCalled()
    expect(fetchMoreAsync).toBeCalledTimes(1)
  })

  it('initial useInfinitScroll with manual fetch', async () => {
    const initialResourceList = [
      {
        type: 'ADMS',
      },
      {
        type: 'EECM',
      },
    ]
    const fetchMoreAsync = async () => {
      return await Promise.resolve(initialResourceList)
    }
    const div = document.createElement('div')

    const { result, waitForNextUpdate } = renderHook(() =>
      useInfinitScroll(div, fetchMoreAsync),
    )

    await act(async () => {
      result.current.setIsFetch(true)
      await waitForNextUpdate()
    })
    expect(result.current.data).toStrictEqual(initialResourceList)
  })

  it('initial useInfinitScroll with empty data', async () => {
    const fetchMoreAsync = async () => {
      return await Promise.resolve([])
    }
    const div = document.createElement('div')

    const { result, waitForNextUpdate } = renderHook(() =>
      useInfinitScroll(div, fetchMoreAsync),
    )

    await act(async () => {
      result.current.setIsFetch(true)
      await waitForNextUpdate()
    })
    expect(result.current.data).toStrictEqual([])
    expect(result.current.isMore).toBeFalsy()
  })

  it('throw error useInfinitScroll', async () => {
    const fetchMoreAsync = async () => {
      return Promise.reject(Error('error Test'))
    }
    const div = document.createElement('div')
    const { result, waitForNextUpdate } = renderHook(() =>
      useInfinitScroll(div, fetchMoreAsync),
    )

    await act(async () => {
      result.current.setIsFetch(true)
      await waitForNextUpdate()
    })

    expect(result.current.error).toBe('error Test')
  })
})
