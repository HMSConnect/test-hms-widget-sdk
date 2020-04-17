import { IAllergyIntoleranceListQuery } from '@data-managers/AllergyIntoleranceDataManager'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import { HMSService } from '@services/HMSServiceFactory'
import { validQueryParams } from '@utils'
import { IServiceResult } from '@utils/types'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import values from 'lodash/values'
import usePromise from './utils/usePromise'

const useAllergyIntoleranceList = (
  options: IAllergyIntoleranceListQuery,
  optionNeedParams?: string[],
): IServiceResult => {
  return usePromise(() => {
    const validParams = validQueryParams(optionNeedParams, options.filter)
    if (!isEmpty(validParams)) {
      return Promise.reject(new Error(join(validParams, ', ')))
    }
    const alleryIntoleranceService = HMSService.getService(
      'allergy_intolerance',
    ) as AllergyIntoleranceService
    return alleryIntoleranceService.list(options)
  }, values(options.filter))
}

export default useAllergyIntoleranceList
