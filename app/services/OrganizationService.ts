import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import OrganizationDataManager from '@data-managers/OrganizationDataManager'
import AbstractService from './AbstractService'

export default class OrganizationService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new OrganizationDataManager(resource, adapter)
  }
}
