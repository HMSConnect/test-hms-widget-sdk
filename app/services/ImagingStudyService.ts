import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import ImagingStudyDataManager from '@data-managers/ImagingStudyDataManager'
import AbstractService from './AbstractService'

export default class ImagingStudyService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new ImagingStudyDataManager(resource, adapter)
  }
}
