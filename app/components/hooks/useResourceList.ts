import { useEffect, useState } from 'react'

import { HMSService } from '@services/HMSServiceFactory'
import PatientService from '@services/PatientService'
import concat from 'lodash/concat'
import filter from 'lodash/filter'
import { IQueryResult } from './usePatientList'

const useResourceList = (id: string, options?: any): any => {
  const [result, setResult] = useState<IQueryResult>({
    data: [],
    error: null,
  })
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const patientService = HMSService.getService(
          'patient',
        ) as PatientService
        const entryList = await patientService.resourceList({
          id,
          options,
        })
        let resultsList = filter(entryList.data, entry => entry.totalCount > 0)
        resultsList = concat(
          { resourceType: 'patient', totalCount: 1, data: [] },
          resultsList,
        )

        setResult({
          ...entryList,
          data: resultsList,
        })
      } catch (error) {
        setResult((prevResult: IQueryResult) => ({
          ...prevResult,
          error: error.message ? error.message : error,
        }))
      } finally {
        setLoading(false)
      }
    })()
  }, [id])
  return { isLoading, ...result }
}

export default useResourceList
