import ImagingStudyServiceMock from '@services/__mocks__/ImagingStudyServiceMock'
import ImagingStudyService from '@services/ImagingStudyService'
import { renderHook } from '@testing-library/react-hooks'
import { HMSService } from '../../../services/HMSServiceFactory'
import useImagingStudyList from '../useImagingStudyList'

describe('useImagingStudyList', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return ImagingStudyServiceMock as ImagingStudyService
    })
  })

  it('initial useImagingStudyList', async () => {
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useImagingStudyList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual([
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
    ])
    expect(result.current.totalCount).toStrictEqual(2)
  })

  it('error useImagingStudyList', async () => {
    jest.spyOn(ImagingStudyServiceMock, 'list').mockImplementation(() => {
      return Promise.reject(Error('error!!!'))
    })
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useImagingStudyList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!!')
  })
})
