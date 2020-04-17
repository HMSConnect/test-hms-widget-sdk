import { useEffect, useState } from 'react'

import concat from 'lodash/concat'
import isEmpty from 'lodash/isEmpty'
import { IQueryResult } from './usePatientList'

export interface ILazyLoadOption {
  max: number
  filter?: any
}

const useLazyLoad = (
  defaultList: any[],
  fetchMoreAsync: () => Promise<any>,
): any => {
  const [result, setResult] = useState<IQueryResult>({
    data: [],
    error: null,
  })
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isMore, setIsMore] = useState<boolean>(true)

  const [isFetch, setIsFetch] = useState<boolean>(false)
  useEffect(() => {
    ;(async () => {
      if (isFetch) {
        try {
          setLoading(true)
          const moreDataList: any = await fetchMoreAsync()
          // TODO: handle fetchMoreAsync isn't promise
          if (!isEmpty(moreDataList)) {
            setResult((prevData: any) => ({
              ...prevData,
              data: concat(prevData.data, moreDataList),
            }))
          } else {
            setIsMore(false)
          }
        } catch (error) {
          setResult((prevResult: IQueryResult) => ({
            ...prevResult,
            error: error.message ? error.message : error,
          }))
        } finally {
          setLoading(false)
          setIsFetch(false)
        }
      }
    })()
  }, [isFetch])

  useEffect(() => {
    setResult((prevData: any) => ({
      ...prevData,
      data: defaultList,
    }))
    setLoading(false)
  }, [defaultList])

  return { isLoading, ...result, setResult, isMore, setIsFetch, setIsMore }
}

export default useLazyLoad
