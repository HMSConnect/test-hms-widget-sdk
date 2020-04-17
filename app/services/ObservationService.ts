import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import ObservationDataManager from '@data-managers/ObservationDataManager'
import AbstractService from './AbstractService'

export default class ObservationService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new ObservationDataManager(resource, adapter)
  }

  async categoryList(params?: any): Promise<any> {
    // console.info(`[service] loading resource typeList`, params)
    const dataManager = this.dataManager as ObservationDataManager
    const result = await dataManager.categoryList(params || {})
    return {
      ...result,
      data: result.data,
    }
  }
}
