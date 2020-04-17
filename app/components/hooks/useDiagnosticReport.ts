import DiagnosticReportService from '@services/DiagnosticReportService'
import { HMSService } from '@services/HMSServiceFactory'
import { IServiceResult } from '@utils/types'
import usePromise from './utils/usePromise'

const useDiagnosticReport = (id: string): IServiceResult => {
  return usePromise(() => {
    const diagnosticReportService = HMSService.getService(
      'diagnostic_report',
    ) as DiagnosticReportService
    return diagnosticReportService.load(id)
  }, [id])
}

export default useDiagnosticReport
