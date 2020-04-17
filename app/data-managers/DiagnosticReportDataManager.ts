import { IListDefaultQuery } from '@utils/types'
import DataManager from './DataManager'

export interface IDiagnosticReportLastQuery extends IListDefaultQuery {
  filter?: IDiagnosticReportFilterQuery
  _lasted?: boolean
  withObservation?: boolean
}

export interface IDiagnosticReportFilterQuery {
  encounterId?: string
  id?: string
  issued_lt?: Date | string
  patientId?: string
}

class DiagnosticReportDataManager extends DataManager {
  // customize operation if needed
  last(query: IDiagnosticReportLastQuery | {}): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}`, {
      ...query,
      _lasted: true,
    })
  }
}

export default DiagnosticReportDataManager
