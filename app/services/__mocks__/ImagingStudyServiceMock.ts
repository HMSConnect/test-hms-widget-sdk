class ImagingStudyServiceMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        id: '1',
        series: [
          {
            instance: [
              {
                title: 'Image of ankle',
              },
            ],
          },
        ],
        startedText: '2019-01-01',
      },
      error: null,
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          id: '1',
          series: [
            {
              instance: [
                {
                  title: 'Image of ankle',
                },
              ],
            },
          ],
          startedText: '2019-01-01',
        },
        {
          id: '2',
          series: [
            {
              instance: [
                {
                  title: 'Image of Neck',
                },
              ],
            },
            {
              instance: [
                {
                  title: 'Image of Head',
                },
              ],
            },
          ],
          startedText: '2019-01-02',
        },
      ],
      error: null,
      totalCount: 2,
    })
  }
}

export default new ImagingStudyServiceMock()
