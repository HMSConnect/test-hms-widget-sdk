import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IImmunizationListQuery extends IListDefaultQuery {
  filter?: IImmunizationListFilterQuery
}

export interface IImmunizationListFilterQuery {
  patientId?: string
  date_lt?: Date | string
  status?: string
  vaccineCode?: string
}

export function mergeWithImmunizationInitialFilterQuery(
  initialFilter: IImmunizationListFilterQuery,
  fixFilter?: any,
): IImmunizationListFilterQuery {
  return defaults(initialFilter, {
    date_lt: undefined,
    patientId: get(fixFilter, 'patientId'),
    status: '',
    vaccineCode: '',
  })
}

class ImmunizationDataManager extends DataManager {
  typeList(query: any): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/type`, query)
  }
}

export default ImmunizationDataManager
