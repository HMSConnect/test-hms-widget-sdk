class MedicationRequestServiceMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        authoredOnText: '2019-01-01',
        id: '1',
        medicationCodeableConcept: 'Acetaminophen 160 MG',
        status: 'active',
      },
      error: null,
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          authoredOnText: '2019-01-01',
          id: '1',
          medicationCodeableConcept: 'Acetaminophen 160 MG',
          status: 'active',
        },
        {
          authoredOnText: '2019-01-02',
          id: '2',
          medicationCodeableConcept: 'BB',
          status: 'completed',
        },
      ],
      error: null,
      totalCount: 2,
    })
  }
}

export default new MedicationRequestServiceMock()
