import * as React from 'react'

import { sendMessage } from '@utils'
import * as _ from 'lodash'
import { IQueryResult } from './usePatientList'

export interface ILazyLoadOption {
  max?: number
  filter?: any
}

const useInfinitScroll = (
  refElement: HTMLDivElement | null,
  fetchMoreAsync: (lastEntry: any) => Promise<any>,
  defaultList?: any[],
  option?: ILazyLoadOption,
): any => {
  const [result, setResult] = React.useState<IQueryResult>({
    data: [],
    error: null,
  })
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [isMore, setIsMore] = React.useState<boolean>(true)
  const [isFetch, setIsFetch] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!refElement) {
      window.addEventListener('scroll', handleWindowScroll)
      return () => window.removeEventListener('scroll', handleWindowScroll)
    } else {
      const myscrollRef = (refElement as any) as HTMLDivElement
      myscrollRef.addEventListener('scroll', () =>
        handleElementScroll(myscrollRef),
      )
      return () =>
        myscrollRef.removeEventListener('scroll', () => {
          console.info('remove infinite scroll event')
        })
    }
  }, [refElement])

  React.useEffect(() => {
    ;(async () => {
      if (isFetch && isMore) {
        try {
          setLoading(true)
          const lastEntry = _.last(result.data)
          const entryData: any = await fetchMoreAsync(lastEntry)
          if (!_.isEmpty(entryData)) {
            setResult((prevData: any) => ({
              ...prevData,
              data: _.concat(prevData.data, entryData),
              error: null,
            }))
            if (option && option.max && entryData.length < option.max) {
              setIsMore(false)
            }
          } else {
            setIsMore(false)
          }
        } catch (error) {
          sendMessage({
            error,
            message: 'handleLoadMore',
            name,
          })
          setResult((prevResult: IQueryResult) => {
            return {
              ...prevResult,
              error: error.message ? error.message : error,
            }
          })
          setIsMore(false)
        } finally {
          setLoading(false)
          setIsFetch(false)
        }
      }
      setIsFetch(false)
    })()
  }, [isFetch])

  React.useEffect(() => {
    if (defaultList) {
      setResult((prevData: any) => ({
        ...prevData,
        data: defaultList,
      }))
    }
    setLoading(false)
  }, [defaultList])

  function handleElementScroll(myscrollRef: HTMLDivElement) {
    if (
      myscrollRef.scrollTop + myscrollRef.clientHeight >=
      myscrollRef.scrollHeight
    ) {
      setIsFetch(true)
    }
  }

  function handleWindowScroll() {
    if (
      window.innerHeight +
        (window.pageYOffset || document.documentElement.scrollTop) +
        200 <
        document.documentElement.offsetHeight ||
      isFetch
    ) {
      return
    }
    setIsFetch(true)
  }

  return {
    isFetch,
    isLoading,
    isMore,
    ...result,
    setIsFetch,
    setIsMore,
    setResult,
  }
}

export default useInfinitScroll
