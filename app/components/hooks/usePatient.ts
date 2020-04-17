import { HMSService } from '@services/HMSServiceFactory'
import PatientService from '@services/PatientService'
import { IServiceResult } from '@utils/types'
import usePromise from './utils/usePromise'

const usePatient = (patientId: string): IServiceResult => {
  return usePromise(() => {
    const patientService = HMSService.getService('patient') as PatientService
    return patientService.load(patientId)
  }, [patientId])
}

export default usePatient
