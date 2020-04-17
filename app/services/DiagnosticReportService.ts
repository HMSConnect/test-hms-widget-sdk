import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import DiagnosticDataManager, {
  IDiagnosticReportLastQuery,
} from '@data-managers/DiagnosticReportDataManager'
import ValidatorManager from '@validators/ValidatorManager'
import AbstractService from './AbstractService'

class DiagnosticReportService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new DiagnosticDataManager(resource, adapter)
  }

  async last(params?: IDiagnosticReportLastQuery): Promise<any> {
    // console.info(`[service] loading diagnostic report lasted`, params)
    const dataManager = this.dataManager as DiagnosticDataManager
    const result = await dataManager.last(params || {})

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
}

export default DiagnosticReportService
