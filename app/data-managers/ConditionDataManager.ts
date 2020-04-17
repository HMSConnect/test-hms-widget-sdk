import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IConditionListQuery extends IListDefaultQuery {
  filter?: IConditionListFilterQuery
}

export interface IConditionListFilterQuery {
  patientId?: string
  onsetDateTime_lt?: Date | string
  clinicalStatus?: string
  codeText?: string
  verificationStatus?: string
}

export function mergeWithConditionInitialFilterQuery(
  initialFilter: IConditionListFilterQuery,
  fixFilter?: any,
): IConditionListFilterQuery {
  return defaults(initialFilter, {
    clinicalStatus: '',
    codeText: '',
    onsetDateTime_lt: undefined,
    patientId: get(fixFilter, 'patientId'),
    verificationStatus: '',
  })
}

class ConditionDataManager extends DataManager {}

export default ConditionDataManager
