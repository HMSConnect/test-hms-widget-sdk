import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import ProcedureDataManager from '@data-managers/ProcedureDataManager'
import AbstractService from './AbstractService'

export default class ProcedureService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new ProcedureDataManager(resource, adapter)
  }
}
