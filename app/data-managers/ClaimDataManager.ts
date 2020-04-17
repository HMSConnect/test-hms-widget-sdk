import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IClaimListQuery extends IListDefaultQuery {
  filter?: IClaimListFilterQuery
}

export interface IClaimListFilterQuery {
  patientId?: string
  organizationId?: string
  status?: string
  billablePeriodStart_lt?: Date | string
  billablePeriodStart_gt?: Date | string
  billablePeriodEnd_lt?: Date | string
  billablePeriodEnd_gt?: Date | string
}

export function mergeWithClaimInitialFilterQuery(
  initialFilter: IClaimListFilterQuery,
  fixFilter?: any,
): IClaimListFilterQuery {
  return defaults(initialFilter, {
    billablePeriodStart_lt: undefined,
    organizationId: undefined,
    patientId: get(fixFilter, 'patientId'),
    status: '',
  })
}

class ClaimDataManager extends DataManager {}

export default ClaimDataManager
