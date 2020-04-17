type PatientMedicationListType = 'INIT_PATIENT_SUMMARY'

interface IPatientMedicationListAction {
  type: PatientMedicationListType
  payload: any
}

const initialState: any = {}
const patientMedicationList = (
  state = initialState,
  action: IPatientMedicationListAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientMedicationList,
      }
    default:
      return state
  }
}

export default patientMedicationList
