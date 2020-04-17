import { IImmunizationListQuery } from '@data-managers/ImmunizationDataManager'
import { HMSService } from '@services/HMSServiceFactory'
import ImmunizationService from '@services/ImmunizationService'
import { IServiceResult } from '@utils/types'
import values from 'lodash/values'
import usePromise from './utils/usePromise'

const useImmunizationList = (options: IImmunizationListQuery): IServiceResult => {
  return usePromise(() => {
    const immunizationService = HMSService.getService(
      'immunization',
    ) as ImmunizationService
    return immunizationService.list(options)
  }, values(options.filter))
}

export default useImmunizationList
