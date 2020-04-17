import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface ICarePlanListQuery extends IListDefaultQuery {
  filter?: ICarePlanListFilterQuery
}

export interface ICarePlanListFilterQuery {
  patientId?: string
  periodStart_lt?: Date | string
  status?: string
  category?: string
}

export function mergeWithCarePlanInitialFilterQuery(
  initialFilter: ICarePlanListFilterQuery,
  fixFilter?: any,
): ICarePlanListFilterQuery {
  return defaults(initialFilter, {
    periodStart_lt: undefined,
    patientId: get(fixFilter, 'patientId'),
    status: '',
    category: '',
  })
}

class CarePlanDataManager extends DataManager {
  categoryList(query: any): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/category`, query)
  }
}

export default CarePlanDataManager
