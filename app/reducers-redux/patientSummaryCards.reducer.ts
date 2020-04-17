import { OBSERVATION_CODE } from '@config/observation'

type PatientSummaryCardsType = 'UPDATE_SELECTED_CARD' | 'INIT_PATIENT_SUMMARY'

interface IPatientSummaryCardsAction {
  type: PatientSummaryCardsType
  payload: any
}

export const patientSummaryCardsInitialState: any = {
  selectedCard: OBSERVATION_CODE.BLOOD_PRESSURE.value,
}

const patientSummaryCards = (
  state = patientSummaryCardsInitialState,
  action: IPatientSummaryCardsAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientSummaryCards,
      }
    case 'UPDATE_SELECTED_CARD':
      return {
        ...state,
        selectedCard: action.payload.name,
      }
    default:
      return state
  }
}

export default patientSummaryCards
