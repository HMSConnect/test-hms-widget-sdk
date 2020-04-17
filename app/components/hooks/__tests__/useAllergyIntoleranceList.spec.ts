import AllergyIntoleranceServiceMock from '@services/__mocks__/AllergyIntoleranceServiceMock'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import { renderHook } from '@testing-library/react-hooks'
import { HMSService } from '../../../services/HMSServiceFactory'
import useAllergyIntoleranceList from '../useAllergyIntoleranceList'

describe('useAllergyIntoleranceList', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return AllergyIntoleranceServiceMock as AllergyIntoleranceService
    })
  })

  it('initial useAllergyIntoleranceList', async () => {
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useAllergyIntoleranceList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual([
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
    ])
    expect(result.current.totalCount).toStrictEqual(3)
  })

  it('have require filter useAllergyIntoleranceList', async () => {
    const options = {
      filter: {},
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useAllergyIntoleranceList(options, ['patientId']),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()

    expect(result.current.error).toBe('Need the patientId')
  })

  it('error useAllergyIntoleranceList', async () => {
    jest.spyOn(AllergyIntoleranceServiceMock, 'list').mockImplementation(() => {
      return Promise.reject(Error('error!!!'))
    })
    const options = {
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useAllergyIntoleranceList(options),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!!')
  })
})
