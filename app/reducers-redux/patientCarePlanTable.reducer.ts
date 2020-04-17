type PatientCarePlanTable = 'INIT_PATIENT_SUMMARY'

interface IPatientCarePlanTableAction {
  type: PatientCarePlanTable
  payload: any
}

const initialState: any = {}
const patientCarePlanTable = (
  state = initialState,
  action: IPatientCarePlanTableAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientCarePlanTable,
      }
    default:
      return state
  }
}

export default patientCarePlanTable
