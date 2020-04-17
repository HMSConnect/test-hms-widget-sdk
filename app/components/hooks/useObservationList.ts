import * as React from 'react'

import { IObservationListQuery } from '@data-managers/ObservationDataManager'
import { HMSService } from '@services/HMSServiceFactory'
import ObservationService from '@services/ObservationService'
import { validQueryParams } from '@utils'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import values from 'lodash/values'
import usePromise from './utils/usePromise'

const useObservationList = (
  options: IObservationListQuery,
  optionNeedParams?: string[],
): any => {
  const [filter, setFilter] = React.useState<any>(options.filter)
  return {
    setFilter,
    ...usePromise(() => {
      const validParams = validQueryParams(optionNeedParams, filter)
      if (!isEmpty(validParams)) {
        return Promise.reject(new Error(join(validParams, ', ')))
      }
      const diagnosticReportService = HMSService.getService(
        'observation',
      ) as ObservationService
      return diagnosticReportService.list({ ...options, filter })
    }, values(filter)),
  }
}

export default useObservationList
