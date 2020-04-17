import { useEffect, useState } from 'react'

import { IQueryResult } from '@utils/types'

export interface IPromiseResult extends IQueryResult {
  isLoading: boolean
}

export function resolvePromise(
  promise: Promise<IQueryResult> | (() => Promise<IQueryResult>),
) {
  if (typeof promise === 'function') {
    return promise()
  }
  return promise
}

export default function usePromise(
  fnPromise: Promise<IQueryResult> | (() => Promise<IQueryResult>),
  inputs: any[] = [],
): IPromiseResult {
  const [result, setResult] = useState<IQueryResult>({
    data: {},
    error: null,
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    resolvePromise(fnPromise)
      .then((result: any) => {
        setResult({ ...result, data: result.data || {}, error: null })
      })
      .catch((err: any) => {
        setResult((prevResult: IQueryResult) => ({
          ...prevResult,
          error: err.message,
        }))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, inputs)

  return { isLoading, ...result }
}
