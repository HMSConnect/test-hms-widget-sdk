import IAdapter from '@adapters/IAdapter'
import ClaimDataManager from '@data-managers/ClaimDataManager'
import DataManager from '@data-managers/DataManager'
import AbstractService from './AbstractService'

export default class ClaimService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new ClaimDataManager(resource, adapter)
  }
}
