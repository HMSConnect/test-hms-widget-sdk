import ObservationServiceMock from '@services/__mocks__/ObservationServiceMock'
import ObservationService from '@services/ObservationService'
import { renderHook } from '@testing-library/react-hooks'
import { HMSService } from '../../../services/HMSServiceFactory'
import useObservationList from '../useObservationList'

describe('useObservationList', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return ObservationServiceMock as ObservationService
    })
  })

  it('initial useObservationList', async () => {
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useObservationList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual([
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
    ])
    expect(result.current.totalCount).toStrictEqual(4)
  })

  it('have require filter useAllergyIntoleranceList', async () => {
    const options = {
      filter: {},
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useObservationList(options, ['patientId']),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()

    expect(result.current.error).toBe('Need the patientId')
  })

  it('error useObservationList', async () => {
    jest.spyOn(ObservationServiceMock, 'list').mockImplementation(() => {
      return Promise.reject(Error('error!!!'))
    })
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useObservationList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!!')
  })
})
