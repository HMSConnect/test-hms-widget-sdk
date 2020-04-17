import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import PatientDataManager from '@data-managers/PatientDataManager'
import ValidatorManager from '@validators/ValidatorManager'
import * as _ from 'lodash'
import AbstractService from './AbstractService'

interface IResourceListParams {
  id: string
  options?: any
}

export default class PatientService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new PatientDataManager(resource, adapter)
  }

  async resourceList(params: IResourceListParams): Promise<any> {
    console.info(`[service] loading resource resourceList`, params)
    const dataManager = this.dataManager as PatientDataManager
    const result = await dataManager.resourceList(
      params.id,
      params.options || {},
    )
    return {
      ...result,
      data: _.map(result.data, (result: any) => {
        const validator = ValidatorManager.compile(result.schema)
        if (validator) {
          const test = _.map(result.data, (entry: any) => {
            return validator.parse(entry)
          })
          return {
            ...result,
            data: _.map(result.data, (entry: any) => {
              return validator.parse(entry)
            }),
          }
        }
        // throw Error('not support this schema.')
        return result
      }),
    }
  }
}
