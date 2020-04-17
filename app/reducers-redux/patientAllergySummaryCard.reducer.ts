type PatientAllergySummaryCard = 'INIT_PATIENT_SUMMARY'

interface IPatientAllergySummaryCardAction {
  type: PatientAllergySummaryCard
  payload: any
}

const initialState: any = {}
const patientAllergySummaryCard = (
  state = initialState,
  action: IPatientAllergySummaryCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientAllergySummaryCard,
      }
    default:
      return state
  }
}

export default patientAllergySummaryCard
