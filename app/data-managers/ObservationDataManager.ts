import { IListDefaultQuery } from '@utils/types'
import defaultsDeep from 'lodash/defaultsDeep'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IObservationNeededParams {
  id?: boolean
  patientId?: boolean
  encounterId?: boolean
}
export interface IObservationListQuery extends IListDefaultQuery {
  filter?: IObservationListFilterQuery
  _lasted?: boolean
  max?: number
}

export interface IObservationListFilterQuery {
  patientId?: string
  encounterId?: string
  categoryCode?: string
  issued_lt?: Date | string
  code?: string
  codes?: string
}

export function mergeWithObservationInitialFilterQuery(
  initialFilter: IObservationListFilterQuery,
  fixFilter?: any,
): IObservationListFilterQuery {
  return defaultsDeep(initialFilter, {
    categoryCode: undefined,
    code: get(fixFilter, 'code') || '',
    codes: get(fixFilter, 'codes') || '',
    encounterId: get(fixFilter, 'encounterId') || undefined,
    issued_lt: undefined,
    patientId: get(fixFilter, 'patientId') || -1,
    status: '',
  })
}

class ObservationDataManager extends DataManager {
  categoryList(query: any): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/category`, query)
  }
}

export default ObservationDataManager
