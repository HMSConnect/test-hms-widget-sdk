import DiagnosticReportServiceMock from '@services/__mocks__/DiagnosticReportServiceMock'
import { renderHook } from '@testing-library/react-hooks'
import DiagnosticReportService from '../../../services/DiagnosticReportService'
import { HMSService } from '../../../services/HMSServiceFactory'
import useLastDiagnosticReport from '../useLastDiagnosticReport'

describe('useLastDiagnosticReport', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return DiagnosticReportServiceMock as DiagnosticReportService
    })
  })

  it('initial useLastDiagnosticReport', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useLastDiagnosticReport({}),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.data).toStrictEqual({
      codeText: 'Code Text1',
      id: '1',
      issued: '2019-01-01',
    })
  })

  it('have require filter useAllergyIntoleranceList', async () => {
    const options = {
      filter: {},
      max: 10,
      offset: 0,
      page: 1,
    }
    const { result, waitForNextUpdate } = renderHook(() =>
      useLastDiagnosticReport(options, ['patientId']),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()

    expect(result.current.error).toBe('Need the patientId')
  })

  it('handler error useLastDiagnosticReport', async () => {
    jest.spyOn(DiagnosticReportServiceMock, 'last').mockImplementation(() => {
      return Promise.reject(new Error('error!!'))
    })

    const { result, waitForNextUpdate } = renderHook(() =>
      useLastDiagnosticReport({}),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!')
  })
})
