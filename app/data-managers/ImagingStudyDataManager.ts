import { IListDefaultQuery } from '@utils/types'
import defaults from 'lodash/defaults'
import get from 'lodash/get'
import DataManager from './DataManager'

export interface IImagingStudyListQuery extends IListDefaultQuery {
  filter?: IImagingStudyListFilterQuery
}

export interface IImagingStudyListFilterQuery {
  patientId?: string
  encounterId?: string
  started_lt?: Date | string
}

export function mergeWithImagingStudyInitialFilterQuery(
  initialFilter: IImagingStudyListFilterQuery,
  fixFilter?: any,
): IImagingStudyListFilterQuery {
  return defaults(initialFilter, {
    started_lt: undefined,
    patientId: get(fixFilter, 'patientId'),
  })
}

class ImagingStudyDataManager extends DataManager {}

export default ImagingStudyDataManager
