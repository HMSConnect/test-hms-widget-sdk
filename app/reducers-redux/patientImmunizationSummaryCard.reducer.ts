type PatientImmunizationSummaryCard = 'INIT_PATIENT_SUMMARY'

interface IPatientImmunizationSummaryCardAction {
  type: PatientImmunizationSummaryCard
  payload: any
}

const initialState: any = {}
const patientImmunizationSummaryCard = (
  state = initialState,
  action: IPatientImmunizationSummaryCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientImmunizationSummaryCard,
      }
    default:
      return state
  }
}

export default patientImmunizationSummaryCard
