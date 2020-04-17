class ClaimServiceMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        billablePeriodStartText: '2019-01-01',
        id: '1',
        status: 'complete',
        totalPrice: '3000',
      },
      error: null,
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          billablePeriodStartText: '2019-01-01',
          id: '1',
          status: 'complete',
          totalPrice: '3000',
        },
        {
          billablePeriodStartText: '2019-01-02',
          id: '2',
          status: 'active',
          totalPrice: '600',
        },
      ],
      error: null,
      totalCount: 2,
    })
  }
}

export default new ClaimServiceMock()
