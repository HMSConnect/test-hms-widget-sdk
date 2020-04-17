import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import ValidatorManager from '@validators/ValidatorManager'
import IService from './IService'

export default abstract class AbstractService implements IService {
  dataManager: DataManager
  constructor(private resource: string, private adapter: IAdapter) {
    this.dataManager = this.createDataManager(resource, adapter)
  }
  getResource(): string {
    return this.resource
  }

  abstract createDataManager(resource: string, adapter: IAdapter): DataManager

  async load(id: string, options?: any): Promise<any> {
    // console.info(`[service] loading resource id = ${id}`)
    const result = await this.dataManager.load(id, options)
    const validator = ValidatorManager.compile(result.schema)

    if (validator) {
      return {
        ...result,
        data: validator.parse(result.data),
      }
    } else {
      throw Error('not support this schema.')
    }
  }

  async list(params: any): Promise<any> {
    // console.info(`[service] loading resource list`, params)
    const result = await this.dataManager.list(params)

    const validator = ValidatorManager.compile(result.schema)
    if (validator) {
      return {
        ...result,
        data: result.data.map((result: any) => validator.parse(result)),
      }
    } else {
      throw Error('not support this schema.')
    }
  }
}
