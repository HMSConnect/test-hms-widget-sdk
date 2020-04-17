class CarePlanServiceMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        activity: [
          {
            detail: {
              code: {
                status: 'completed',
                text: 'Recommendation to avoid exercise',
              },
            },
          },
          {
            detail: {
              code: {
                status: 'completed',
                text: 'Deep breathing and coughing exercises',
              },
            },
          },
        ],
        category: 'Allergy to bee venom',
        id: '1',
        periodStartText: '2019-01-01',
        status: 'low',
      },
      error: null,
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          activity: [
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Recommendation to avoid exercise',
                },
              },
            },
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Deep breathing and coughing exercises',
                },
              },
            },
          ],
          category: 'Allergy to bee venom',
          id: '1',
          periodStartText: '2019-01-01',
          status: 'low',
        },
        {
          activity: [
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Recommendation to avoid exercise',
                },
              },
            },
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Deep breathing and coughing exercises',
                },
              },
            },
          ],
          category: 'House dust mite allergy1',
          id: '2',
          periodStartText: '2019-01-02',
          status: 'high',
        },
        {
          activity: [
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Recommendation to avoid exercise',
                },
              },
            },
            {
              detail: {
                code: {
                  status: 'completed',
                  text: 'Deep breathing and coughing exercises',
                },
              },
            },
          ],
          category: 'House dust mite allergy2',
          id: '3',
          periodStartText: '2019-01-02',
          status: 'unable-to-assess',
        },
      ],
      error: null,
      totalCount: 3,
    })
  }

  async categoryList(params?: any): Promise<any> {
    // console.info(`[service] loading resource typeList`, params)
    return Promise.resolve({
      data: [
        {
          totalCounr: 130,
          type: 'Respiratory therapy',
        },
        {
          totalCounr: 10,
          type: 'Self care',
        },
      ],
    })
  }
}

export default new CarePlanServiceMock()
