type PatientAlleryListListType = 'INIT_PATIENT_SUMMARY'

interface IPatientAlleryListListAction {
  type: PatientAlleryListListType
  payload: any
}

export const initialState: any = {}
const patientAllergyList = (
  state = initialState,
  action: IPatientAlleryListListAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientAllergyList,
      }
    default:
      return state
  }
}

export default patientAllergyList
