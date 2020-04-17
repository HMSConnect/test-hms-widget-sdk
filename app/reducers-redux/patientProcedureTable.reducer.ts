type PatientProcedureTable = 'INIT_PATIENT_SUMMARY'

interface IPatientProcedureTableAction {
  type: PatientProcedureTable
  payload: any
}

const initialState: any = {}
const patientProcedureTable = (
  state = initialState,
  action: IPatientProcedureTableAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientProcedureTable,
      }
    default:
      return state
  }
}

export default patientProcedureTable
