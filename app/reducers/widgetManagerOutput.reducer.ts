export type OutputActionType =
  | 'OUTPUT_INIT'
  | 'OUTPUT_RESET'
  | 'OUTPUT_RESET'
  | 'OUTPUT_ADD_LOG'

export interface IOutputReducerAction {
  type: OutputActionType
  payload?: any
}

export default function outputReducer(
  state: any = [],
  action: IOutputReducerAction,
) {
  switch (action.type) {
    case 'OUTPUT_INIT':
    case 'OUTPUT_RESET':
      return []
    case 'OUTPUT_ADD_LOG':
      return [
        {
          log: action.payload,
          timestamp: new Date(),
        },
        ...state,
      ]
    default:
      return state
  }
}
