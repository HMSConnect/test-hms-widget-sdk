import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IEncounterListQuery extends IListDefaultQuery {
  filter?: IEncounterListFilterQuery
  max?: number
  withOrganization?: boolean
  withPractitioner?: boolean
  withDiagnosis?: boolean
}

export interface IEncounterListFilterQuery {
  patientId?: string
  periodStart_lt?: Date | string
  type?: string
  status?: string
}

export function mergeWithEncounterInitialFilterQuery(
  initialFilter: IEncounterListFilterQuery,
  fixFilter?: any,
): IEncounterListFilterQuery {
  return defaults(initialFilter, {
    patientId: get(fixFilter, 'patientId'),
    periodStart_lt: undefined,
    status: '',
    type: undefined,
  })
}
class EncounterDataManager extends DataManager {
  // customize operation if needed
  typeList(query: any): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/type`, query)
  }

  resourceList(id: string): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/${id}/resource-list`, {})
  }
}

export default EncounterDataManager
