import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IOrganizationListQuery extends IListDefaultQuery {
  filter?: IOrganizationListFilterQuery
}

export interface IOrganizationListFilterQuery {
  patientId?: string
  codeText?: string
  criticality?: string
  type?: string
  category?: string
  assertedDate_lt?: Date | string
}

export function mergeWithOrganizationInitialFilterQuery(
  initialFilter: IOrganizationListFilterQuery,
  fixFilter?: any,
): IOrganizationListFilterQuery {
  return defaults(initialFilter, {
    assertedDate_lt: undefined,
    category: '',
    codeText: '',
    criticality: '',
    patientId: get(fixFilter, 'patientId'),
    type: '',
  })
}

class OrganizationDataManager extends DataManager {}

export default OrganizationDataManager
