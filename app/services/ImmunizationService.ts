import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import ImmunizationDataManager from '@data-managers/ImmunizationDataManager'
import ObservationDataManager from '@data-managers/ObservationDataManager'
import AbstractService from './AbstractService'

export default class ImmunizationService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new ImmunizationDataManager(resource, adapter)
  }

  async typeList(params?: any): Promise<any> {
    // console.info(`[service] loading resource typeList`, params)
    const dataManager = this.dataManager as ImmunizationDataManager
    const result = await dataManager.typeList(params || {})
    return {
      ...result,
      data: result.data,
    }
  }
}
