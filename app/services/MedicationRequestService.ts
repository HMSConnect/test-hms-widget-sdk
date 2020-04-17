import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import MedicationRequestDataManager from '@data-managers/MedicationRequestDataManager'
import AbstractService from './AbstractService'

export default class MedicationRequestService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new MedicationRequestDataManager(resource, adapter)
  }
}
