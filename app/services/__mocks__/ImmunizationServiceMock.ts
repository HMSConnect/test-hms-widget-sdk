class ImmunizationServieMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        clinicalStatus: 'completed',
        dateText: '2019-01-01',
        id: '1',
        vaccineCode: 'Influenza, seasonal, injectable, preservative free',
      },
      error: null,
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          status: 'completed',
          dateText: '2019-01-01',
          id: '1',
          vaccineCode: 'Influenza, seasonal, injectable, preservative free',
        },
        {
          status: 'not-done',
          dateText: '2019-01-02',
          id: '2',
          vaccineCode: 'Td (adult) preservative free',
        },
      ],
      error: null,
      totalCount: 2,
    })
  }

  async typeList(params?: any): Promise<any> {
    // console.info(`[service] loading resource typeList`, params)
    return Promise.resolve({
      data: [
        {
          type: 'Influenza, seasonal, injectable, preservative free',
          totalCount: 10,
        },
        {
          type: 'Td (adult) preservative free',
          totalCount: 12,
        },
      ],
    })
  }
}

export default new ImmunizationServieMock()
