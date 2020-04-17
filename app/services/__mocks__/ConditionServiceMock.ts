class ConditionServiceMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        clinicalStatus: 'resolved',
        codeText: 'Viral sinusitis',
        id: '1',
        onset: '2019-01-01',
      },
      error: null,
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          clinicalStatus: 'resolved',
          codeText: 'Viral sinusitis',
          id: '1',
          onset: '2019-01-01',
        },
        {
          clinicalStatus: 'active',
          codeText: 'Acute bronchitis',
          id: '2',
          onset: '2019-01-02',
        },
      ],
      error: null,
      totalCount: 2,
    })
  }
}

export default new ConditionServiceMock()
