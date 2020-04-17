import DevelopmentAdapter from '@adapters/DevelopmentAdapter'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import CarePlanService from '@services/CarePlanService'
import ClaimService from '@services/ClaimService'
import ConditionService from '@services/ConditionService'
import DiagnosticReportService from '@services/DiagnosticReportService'
import EncounterService from '@services/EncounterService'
import ImagingStudyService from '@services/ImagingStudyService'
import ImmunizationService from '@services/ImmunizationService'
import MedicationRequestService from '@services/MedicationRequestService'
import ObservationService from '@services/ObservationService'
import PatientService from '@services/PatientService'
import ProcedureService from '@services/ProcedureService'
import SFHIRAllergyIntoleranceV1Validator from '@validators/standard/sfhir/SFHIRAllergyIntoleranceV1Validator'
import SFHIRCarePlanV1Validator from '@validators/standard/sfhir/SFHIRCarePlanV1Validator'
import SFHIRClaimV1Validator from '@validators/standard/sfhir/SFHIRClaimV1Validator'
import SFHIRConditionV1Validator from '@validators/standard/sfhir/SFHIRConditionV1Validator'
import SFHIRDiagnosticReportV1Validator from '@validators/standard/sfhir/SFHIRDiagnosticReportV1Validator'
import SFHIREncounterV1Validator from '@validators/standard/sfhir/SFHIREncounterV1Validator'
import SFHIRImagingStudyV1Validator from '@validators/standard/sfhir/SFHIRImagingStudyV1Validator'
import SFHIRImmunizationV1Validator from '@validators/standard/sfhir/SFHIRImmunizationV1Validator'
import SFHIRMedicationRequestV1Validator from '@validators/standard/sfhir/SFHIRMedicationRequestV1Validator'
import SFHIRObservationV1Validator from '@validators/standard/sfhir/SFHIRObservationV1Validator'
import SFHIROrganizationV1Validator from '@validators/standard/sfhir/SFHIROrganizationV1Validator'
import SFHIRPatientV1Validator from '@validators/standard/sfhir/SFHIRPatientV1Validator'
import SFHIRPractitionerV1Validator from '@validators/standard/sfhir/SFHIRPractitionerV1Validator'
import SFHIRProcedureV1Validator from '@validators/standard/sfhir/SFHIRProcedureV1Validator'
import {
  allergyIntoleranceCriticalityOption,
  allergyIntoleranceTypeOption,
  carePlanStatusOption,
  claimStatusOption,
  conditionClinicalStatusOption,
  conditionVerificationStatusOption,
  encounterStatusOption,
  immunizationStatusOption,
  medicationRequestStatusOption,
} from './patient'

export interface IWidgetPatameter {
  type: 'text' | 'boolean' | 'number' | 'options'
  label: string
  value: any
  defaultValue?: any
  choices?: any[]
}

export interface IWidgetGroup {
  label: string
  child: IWidgetChild[]
  value: string
  parameters?: IWidgetPatameter[]
  queryParams?: IWidgetPatameter[]
}

export interface IWidgetChild {
  label: string
  value: string
  document?: string
  path?: string
  pathType?: 'url' | 'static'
  parameters?: IWidgetPatameter[]
  queryParams?: IWidgetPatameter[]
}

export const serviceConfig = {
  ['$ALLERGY_INTOLERANCE']: { clazz: AllergyIntoleranceService },
  ['$DIAGNOSTIC_REPORT']: { clazz: DiagnosticReportService },
  ['$ENCOUNTER']: { clazz: EncounterService },
  ['$PATIENT']: { clazz: PatientService },
  ['$OBSERVATION']: { clazz: ObservationService },
  ['$CLAIM']: { clazz: ClaimService },
  ['$CONDITION']: { clazz: ConditionService },
  ['$IMAGING_STUDY']: { clazz: ImagingStudyService },
  ['$IMMUNIZATION']: { clazz: ImmunizationService },
  ['$PROCEDURE']: { clazz: ProcedureService },
  ['$MEDICATION_REQUEST']: { clazz: MedicationRequestService },
  ['$CARE_PLAN']: { clazz: CarePlanService },
}

export const validatorConfig = {
  ['$SFHIR_ALLERGY_INTOLERANCE_V1']: {
    clazz: SFHIRAllergyIntoleranceV1Validator,
    priority: 1,
  },
  ['$SFHIR_PATIENT_V1']: { clazz: SFHIRPatientV1Validator, priority: 1 },
  ['$SFHIR_CARE_PLAN_V1']: { clazz: SFHIRCarePlanV1Validator, priority: 1 },
  ['$SFHIR_DIAGNOSTIC_REPORT_V1']: {
    clazz: SFHIRDiagnosticReportV1Validator,
    priority: 1,
  },
  ['$SFHIR_ENCOUNTER_V1']: { clazz: SFHIREncounterV1Validator, priority: 1 },
  ['$SFHIR_OBSERVATION_V1']: {
    clazz: SFHIRObservationV1Validator,
    priority: 1,
  },
  ['$SFHIR_ORGANIZATION_V1']: {
    clazz: SFHIROrganizationV1Validator,
    priority: 1,
  },
  ['$SFHIR_PRACTITIONER_V1']: {
    clazz: SFHIRPractitionerV1Validator,
    priority: 1,
  },
  ['$SFHIR_CLAIM_V1']: {
    clazz: SFHIRClaimV1Validator,
    priority: 1,
  },
  ['$SFHIR_CONDITION_V1']: {
    clazz: SFHIRConditionV1Validator,
    priority: 1,
  },
  ['$SFHIR_IMAGING_STUDY_V1']: {
    clazz: SFHIRImagingStudyV1Validator,
    priority: 1,
  },
  ['$SFHIR_IMMUNIZATION_V1']: {
    clazz: SFHIRImmunizationV1Validator,
    priority: 1,
  },
  ['$SFHIR_PROCEDURE_V1']: {
    clazz: SFHIRProcedureV1Validator,
    priority: 1,
  },
  ['$SFHIR_MEDICATION_REQUEST_V1']: {
    clazz: SFHIRMedicationRequestV1Validator,
    priority: 1,
  },
}

export const adapterConfig = {
  ['$DEVELOP']: { clazz: DevelopmentAdapter },
}

export const noneOption = { label: 'None', value: '' }
export const selectOptions = {
  patient: {
    allergyIntoleranceCriticalityOption,
    allergyIntoleranceTypeOption,
    carePlanStatusOption,
    claimStatusOption,
    conditionClinicalStatusOption,
    conditionVerificationStatusOption,
    encounterStatusOption,
    immunizationStatusOption,
    medicationRequestStatusOption,
  },
}
