type ObservationLaboratoryTableType = 'INIT_PATIENT_SUMMARY'

interface IObservationLaboratoryTableAction {
  type: ObservationLaboratoryTableType
  payload: any
}

export const initialState: any = {}
const observationLaboratoryTable = (
  state = initialState,
  action: IObservationLaboratoryTableAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationLaboratoryTable,
      }
    default:
      return state
  }
}

export default observationLaboratoryTable
