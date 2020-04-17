type TableWithFilterActionType =
  | 'INIT_FILTER'
  | 'SUBMIT_SEARCH'
  | 'GROUP_BY'
  | 'UN_GROUP_BY'
  | 'CHANGE_TAB'
  | 'FILTER_ON_CHANGE'
  | 'FILTER_ON_CHANGE_SELECTION'

interface ITableWithFilterReducerAction {
  type: TableWithFilterActionType
  payload?: any
}

export const tableWithFilterState = {
  filter: {},
  isGroup: false,
  submitedFilter: {},
  tab: {
    selectedTab: '',
    tabList: [],
  },
}

export const tableWithFilterReducer = (
  state: any = {},
  action: ITableWithFilterReducerAction,
) => {
  switch (action.type) {
    case 'INIT_FILTER':
      return {
        ...state,
        filter: action.payload,
        submitedFilter: action.payload,
      }
    case 'SUBMIT_SEARCH':
      return {
        ...state,
        filter: action.payload,
        submitedFilter: action.payload,
      }
    case 'GROUP_BY':
      return {
        ...state,
        isGroup: true,
        tab: {
          ...state.tab,
          selectedTab: action.payload.selectedTab,
          tabList: action.payload.tabList,
        },
      }
    case 'UN_GROUP_BY':
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action?.payload?.filter,
        },
        isGroup: false,
        tab: {
          ...state.tab,
          selectedTab: '',
          tabList: [],
        },
      }
    case 'CHANGE_TAB':
      return {
        ...state,
        filter: action.payload.filter,
        submitedFilter: action.payload.filter,
        tab: {
          ...state.tab,
          selectedTab: action.payload.selectedTab,
        },
      }
    case 'FILTER_ON_CHANGE':
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      }
    case 'FILTER_ON_CHANGE_SELECTION':
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
          selection: {
            ...state.filter.selection,
            ...action.payload.selection,
          },
        },
      }
  }
}
