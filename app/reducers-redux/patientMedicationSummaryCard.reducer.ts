type PatientMedicationSummaryCard = 'INIT_PATIENT_SUMMARY'

interface IPatientMedicationSummaryCardAction {
  type: PatientMedicationSummaryCard
  payload: any
}

const initialState: any = {}
const patientMedicationSummaryCard = (
  state = initialState,
  action: IPatientMedicationSummaryCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientMedicationSummaryCard,
      }
    default:
      return state
  }
}

export default patientMedicationSummaryCard
