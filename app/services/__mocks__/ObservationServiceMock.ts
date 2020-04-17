class ObservationServiceMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        categoryText: 'Code Text1',
        codeText: 'Code Text1',
        id: '1',
        issued: '2019-01-01',
      },
      error: null,
    })
  }

  async categoryList(params?: any): Promise<any> {
    // console.info(`[service] loading resource typeList`, params)
    return Promise.resolve({
      data: [
        {
          totalCounr: 130,
          type: 'Laboratory',
        },
        {
          totalCounr: 10,
          type: 'Vital-signs',
        },
      ],
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          code: '55284-4',
          codeText: 'Blood pressure',
          id: '1',
          issued: '2019-01-01',
          valueModal: [
            {
              code: 'Systolic Blood Pressure',
              unit: 'mmHg',
              value: 120,
            },
            {
              code: 'Diastolic Blood Pressure',
              unit: 'mmHg',
              value: 89,
            },
          ],
        },
        {
          code: '8302-2',
          codeText: 'Body Height',
          id: '2',
          issued: '2019-01-01',
          value: 168,
        },
        {
          code: '29463-7',
          codeText: 'Body Weight',
          id: '3',
          issued: '2019-01-01',
          value: 59,
        },
        {
          code: '39156-5',
          codeText: 'Body Mass Index',
          id: '4',
          issued: '2019-01-01',
          value: 24,
        },
      ],
      error: null,
      totalCount: 4,
    })
  }
}

export default new ObservationServiceMock()
