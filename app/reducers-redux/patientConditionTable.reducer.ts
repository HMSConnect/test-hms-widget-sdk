type PatientConditionTable = 'INIT_PATIENT_SUMMARY'

interface IPatientConditionTableAction {
  type: PatientConditionTable
  payload: any
}

const initialState: any = {}
const patientConditionTable = (
  state = initialState,
  action: IPatientConditionTableAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientConditionTable,
      }
    default:
      return state
  }
}

export default patientConditionTable
