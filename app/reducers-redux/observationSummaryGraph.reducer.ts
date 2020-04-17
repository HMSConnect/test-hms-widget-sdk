type ObservationSummaryGraphType = 'INIT_PATIENT_SUMMARY'

interface IObservationSummaryGraphAction {
  type: ObservationSummaryGraphType
  payload: any
}

const initialState: any = {}
const observationSummaryGraph = (
  state = initialState,
  action: IObservationSummaryGraphAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationSummaryGraph,
      }
    default:
      return state
  }
}

export default observationSummaryGraph
