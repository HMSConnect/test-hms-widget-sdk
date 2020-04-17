import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IProcedureListQuery extends IListDefaultQuery {
  filter?: IProcedureListFilterQuery
}

export interface IProcedureListFilterQuery {
  patientId?: string
  encounterId?: string
  periodStart_lt?: Date | string
  code?: string
}

export function mergeWithProcedureInitialFilterQuery(
  initialFilter: IProcedureListFilterQuery,
  fixFilter?: any,
): IProcedureListFilterQuery {
  return defaults(initialFilter, {
    code: '',
    patientId: get(fixFilter, 'patientId'),
    periodStart_lt: undefined,
  })
}

class ProcedureDataManager extends DataManager {}

export default ProcedureDataManager
