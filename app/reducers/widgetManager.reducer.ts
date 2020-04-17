import _ from 'lodash'
import outputReducer, {
  IOutputReducerAction,
  OutputActionType,
} from './widgetManagerOutput.reducer'

type WidgetActionType =
  | 'LOADING'
  | 'INIT'
  | 'TAB_CHANGE'
  | 'SELECT_WIDGET'
  | 'IFRAME_QUERY_PARAMS_CHANGE'
  | 'IFRAME_PARAMETERS_CHANGE'
  | 'IFRAME_RESET'
  | 'IFRAME_REPLACE'
  | 'IFRAME_BACK'
  | 'IFRAME_NEXT'
  | 'IFRAME_REFRESH'
  | 'IFRAME_SUBMIT'
  | 'UPDATE_URL_TEXT'
interface IWidgetReducerAction {
  type: WidgetActionType | OutputActionType
  payload?: any
}

export const widgetState = {
  iframeState: {
    parameters: {},
    queryParams: {},
    url: '', // store url for change iframe
  },
  loading: true,
  outputs: [],
  selectedWidget: {},
  tabState: 0,
  urlText: '', // store url display
}

export function widgetReducer(state: any = {}, action: IWidgetReducerAction) {
  if (_.includes(action.type, 'OUTPUT')) {
    return {
      ...state,
      outputs: outputReducer(state.outputs, action as IOutputReducerAction),
    }
  }

  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'INIT':
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    case 'TAB_CHANGE':
      return {
        ...state,
        tabState: action.payload,
      }
    case 'SELECT_WIDGET':
      return {
        ...state,
      }
    case 'IFRAME_QUERY_PARAMS_CHANGE':
      return {
        ...state,
        iframeState: {
          ...state.iframeState,
          queryParams: {
            ...state.iframeState.queryParams,
            [action.payload.type]: action.payload.value,
          },
        },
      }
    case 'IFRAME_PARAMETERS_CHANGE':
      return {
        ...state,
        iframeState: {
          ...state.iframeState,
          parameters: {
            ...state.iframeState.queryParams,
            [action.payload.type]: action.payload.value,
          },
        },
        outputs: [],
      }

    case 'IFRAME_RESET':
      const split = _.split(_.get(state.widgetSelected, 'path') || '', '#')
      return {
        ...state,
        outputs: [],
        widgetSelected: {
          ...state.widgetSeleted,
          path: split[1] ? split[0] : split[0] + '#reset',
        },
      }
    case 'IFRAME_REPLACE':
      return {
        ...state,
        iframeState: {
          ...state.iframeState,
          ...action.payload,
        },
      }
    case 'IFRAME_BACK':
    case 'IFRAME_NEXT':
    case 'IFRAME_REFRESH':
      return {
        ...state,
        outputs: [],
      }
    case 'IFRAME_SUBMIT':
      return {
        ...state,
        urlText: action.payload,
      }
    case 'UPDATE_URL_TEXT':
      return {
        ...state,
        urlText: action.payload,
      }
    default:
      return state
  }
}
