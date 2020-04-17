import IAdapter from '@adapters/IAdapter'
import AllergyIntoleranceDataManager from '@data-managers/AllergyIntoleranceDataManager'
import DataManager from '@data-managers/DataManager'
import AbstractService from './AbstractService'

export default class AllergyIntoleranceService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new AllergyIntoleranceDataManager(resource, adapter)
  }
}
