type ObservationHistoryGraphType = 'INIT_PATIENT_SUMMARY'

interface IObservationHistoryGraphAction {
  type: ObservationHistoryGraphType
  payload: any
}

const initialState: any = {}
const observationHistoryGraph = (
  state = initialState,
  action: IObservationHistoryGraphAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationHistoryGraph,
      }
    default:
      return state
  }
}

export default observationHistoryGraph
