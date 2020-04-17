class ProcedureServiceMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        code: '4411',
        codeText: 'Depression',
        id: '1',
        performedPerios: {
          end: '2019-01-02',
          start: '2019-01-01',
        },
      },
      error: null,
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          code: '4411',
          codeText: 'Depression',
          id: '1',
          performedPerios: {
            end: '2019-01-02',
            start: '2019-01-01',
          },
        },
        {
          code: '1144',
          codeText: 'ChildBirth',
          id: '2',
          performedPerios: {
            end: '2019-01-03',
            start: '2019-01-04',
          },
        },
      ],
      error: null,
      totalCount: 2,
    })
  }
}

export default new ProcedureServiceMock()
