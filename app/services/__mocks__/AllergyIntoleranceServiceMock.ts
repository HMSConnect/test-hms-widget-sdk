class AllergyIntoleranceServiceMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        assertedDateText: '2019-01-01',
        codeText: 'Allergy to bee venom',
        id: '1',
      },
      error: null,
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          assertedDateText: '2019-01-01',
          codeText: 'Allergy to bee venom',
          criticality: 'low',
          id: '1',
        },
        {
          assertedDateText: '2019-01-02',
          codeText: 'House dust mite allergy1',
          criticality: 'high',
          id: '2',
        },
        {
          assertedDateText: '2019-01-02',
          codeText: 'House dust mite allergy2',
          criticality: 'unable-to-assess',
          id: '3',
        },
      ],
      error: null,
      totalCount: 3,
    })
  }
}

export default new AllergyIntoleranceServiceMock()
