import { IEncounterListQuery } from '@data-managers/EncounterDataManager'
import EncounterService from '@services/EncounterService'
import { HMSService } from '@services/HMSServiceFactory'
import { IServiceResult } from '@utils/types'
import values from 'lodash/values'
import usePromise from './utils/usePromise'

const useEncounterList = (options: IEncounterListQuery): IServiceResult => {
  return usePromise(() => {
    const encounterService = HMSService.getService(
      'encounter',
    ) as EncounterService
    return encounterService.list(options)
  }, values(options.filter))
}

export default useEncounterList
