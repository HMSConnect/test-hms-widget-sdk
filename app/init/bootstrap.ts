import '@validators/standard/sfhir/SFHIRCarePlanV1Validator'
import '@validators/standard/sfhir/SFHIRDiagnosticReportV1Validator'
import '@validators/standard/sfhir/SFHIREncounterV1Validator'
import '@validators/standard/sfhir/SFHIRObservationV1Validator'
import '@validators/standard/sfhir/SFHIROrganizationV1Validator'
import '@validators/standard/sfhir/SFHIRPatientV1Validator'
import '@validators/standard/sfhir/SFHIRXV1Validator' // For Mockup

import DevelopmentAdapter from '@adapters/DevelopmentAdapter'
import DiagnosticReportService from '@services/DiagnosticReportService'
import EncounterService from '@services/EncounterService'
import { HMSService } from '@services/HMSServiceFactory'
import PatientService from '@services/PatientService'

console.info('HMSServiceFactory Initialize...')
const devAdapter = new DevelopmentAdapter(
  `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart-fhir`
)

HMSService.register('patient', PatientService)
HMSService.register('encounter', EncounterService)
HMSService.register('diagnostic_report', DiagnosticReportService)
HMSService.setDefaultAdapter(devAdapter)
