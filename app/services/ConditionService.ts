import IAdapter from '@adapters/IAdapter'
import ConditionDataManager from '@data-managers/ConditionDataManager'
import DataManager from '@data-managers/DataManager'
import AbstractService from './AbstractService'

export default class ConditionService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new ConditionDataManager(resource, adapter)
  }
}
