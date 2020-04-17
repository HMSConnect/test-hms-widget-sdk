import DataManager from './DataManager'

class PatientDataManager extends DataManager {
  // customize operation if needed
  resourceList(id: string | number, query?: any): Promise<any> {
    return this.adaptor.doRequest(
      `${this.resource}/${id}/resource-list/`,
      query,
    )
  }
}

export default PatientDataManager
