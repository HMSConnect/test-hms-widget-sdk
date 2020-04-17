class DiagnosticReportServiceMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        codeText: 'Code Text1',
        id: '1',
        issued: '2019-01-01'
      },
      error: null
    })
  }

  async last(): Promise<any> {
    return Promise.resolve({
      data: {
        codeText: 'Code Text1',
        id: '1',
        issued: '2019-01-01'
      },
      error: null
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          codeText: 'Code Text1',
          id: '1',
          issued: '2019-01-01'
        },
        {
          codeText: 'Code Text2',
          id: '2',
          issued: '2019-01-01'
        }
      ],
      error: null,
      totalCount: 2
    })
  }
}

export default new DiagnosticReportServiceMock()
