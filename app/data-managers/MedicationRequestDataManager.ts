import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IMedicationRequestQuery extends IListDefaultQuery {
  filter?: IMedicationRequestFilterQuery
}

export interface IMedicationRequestFilterQuery {
  patientId?: string
  encounterId?: string
  authoredOn_lt?: Date | string
  medicationCodeableConcept?: string
  status?: string
}

export function mergeWithMedicationRequestInitialFilterQuery(
  initialFilter: IMedicationRequestFilterQuery,
  fixFilter?: any,
): IMedicationRequestFilterQuery {
  return defaults(initialFilter, {
    authoredOn_lt: undefined,
    medicationCodeableConcept: '',
    patientId: get(fixFilter, 'patientId'),
    status: '',
  })
}

class MedicationRequestDataManager extends DataManager {}

export default MedicationRequestDataManager
