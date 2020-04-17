import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IAllergyIntoleranceListQuery extends IListDefaultQuery {
  filter?: IAllergyIntoleranceListFilterQuery
}

export interface IAllergyIntoleranceListFilterQuery {
  patientId?: string
  codeText?: string
  criticality?: string
  type?: string
  category?: string
  assertedDate_lt?: Date | string
}

export function mergeWithAllergyIntoleranceInitialFilterQuery(
  initialFilter: IAllergyIntoleranceListFilterQuery,
  fixFilter?: any,
): IAllergyIntoleranceListFilterQuery {
  return defaults(initialFilter, {
    assertedDate_lt: undefined,
    category: '',
    codeText: '',
    criticality: '',
    patientId: get(fixFilter, 'patientId'),
    type: '',
  })
}

class AllergyIntoleranceDataManager extends DataManager {}

export default AllergyIntoleranceDataManager
