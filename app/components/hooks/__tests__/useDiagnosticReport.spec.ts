import DiagnosticReportServiceMock from '@services/__mocks__/DiagnosticReportServiceMock'
import { renderHook } from '@testing-library/react-hooks'
import DiagnosticReportService from '../../../services/DiagnosticReportService'
import { HMSService } from '../../../services/HMSServiceFactory'
import useDiagnosticReport from '../useDiagnosticReport'
describe('useDiagnosticReport', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return DiagnosticReportServiceMock as DiagnosticReportService
    })
  })

  it('initial useDiagnosticReport', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useDiagnosticReport('1'),
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

  it('error useDiagnosticReport', async () => {
    jest.spyOn(DiagnosticReportServiceMock, 'load').mockImplementation(() => {
      return Promise.reject(Error('error!!!'))
    })
    const { result, waitForNextUpdate } = renderHook(() =>
      useDiagnosticReport('1'),
    )
    expect(result.error).toBeUndefined()

    expect(result.current.isLoading).toBeTruthy()
    await waitForNextUpdate()
    expect(result.current.isLoading).toBeFalsy()

    expect(result.current.error).toBe('error!!!')
  })
})
