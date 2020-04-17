import IAdapter from "@adapters/IAdapter"
import DataManager from "@data-managers/DataManager"
import PatientDataManager from "@data-managers/PatientDataManager"

class EncounterServiceMock {
  getResource(): string {
    return 'get Resource'
  }
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new PatientDataManager(resource, adapter)
  }

  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        id: '1',
        reason: 'Test1',
        serviceProvider: {
          name: `ServiceTest1`,
        },
        type: 'ADMS',
      },
      error: null,
      totalCount: 1,
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          id: '1',
          reason: 'Test1',
          serviceProvider: {
            name: `ServiceTest1`,
          },
          type: 'ADMS',
        },
        {
          id: '2',
          reason: 'Test1',
          serviceProvider: {
            name: `ServiceTest2`,
          },
          type: 'EECM',
        },
      ],
      error: null,
      totalCount: 2,
    })
  }

  async typeList(params?: any): Promise<any> {
    return {
      data: [
        {
          totalCount: 1,
          type: 'ADMS',
        },
        {
          totalCount: 1,
          type: 'EECM',
        },
      ],
      error: null,
    }
  }
}

export default new EncounterServiceMock()
