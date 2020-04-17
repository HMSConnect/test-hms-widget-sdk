type PatientPractitionerListType = 'INIT_PATIENT_SUMMARY'

interface IPatientPractitionerListAction {
  type: PatientPractitionerListType
  payload: any
}

export const initialState: any = {}
const patientPractitioner = (
  state = initialState,
  action: IPatientPractitionerListAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientPractitioner,
      }
    default:
      return state
  }
}

export default patientPractitioner
