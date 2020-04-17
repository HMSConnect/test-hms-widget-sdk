import { IClaimListQuery } from '@data-managers/ClaimDataManager'
import ClaimService from '@services/ClaimService'
import { HMSService } from '@services/HMSServiceFactory'
import { IServiceResult } from '@utils/types'
import values from 'lodash/values'
import usePromise from './utils/usePromise'

const useClaimList = (options: IClaimListQuery): IServiceResult => {
  return usePromise(() => {
    const claimService = HMSService.getService('claim') as ClaimService
    return claimService.list(options)
  }, values(options.filter))
}

export default useClaimList
