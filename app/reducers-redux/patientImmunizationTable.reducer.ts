type PatientImmunizationTable = 'INIT_PATIENT_SUMMARY'

interface IPatientImmunizationTableAction {
  type: PatientImmunizationTable
  payload: any
}

const initialState: any = {}
const patientImmunizationTable = (
  state = initialState,
  action: IPatientImmunizationTableAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientImmunizationTable,
      }
    default:
      return state
  }
}

export default patientImmunizationTable
