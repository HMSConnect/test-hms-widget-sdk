type PatientEncounterTimelineType = 'INIT_PATIENT_SUMMARY'

interface IPatientEncounterTimelineAction {
  type: PatientEncounterTimelineType
  payload: any
}

const initialState: any = {}
const patientEncounterTimeline = (
  state = initialState,
  action: IPatientEncounterTimelineAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.patientEncounterTimeline,
      }
    default:
      return state
  }
}

export default patientEncounterTimeline
