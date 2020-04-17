import * as React from 'react'

export const appContextState = {
    DEMOGRAPHIC_SUMMARY_WIDGET: {

    },
    HISTORY_OBSERVATION_WIDGET: {

    }
}

export function appContextReducer(state: any = {}, action: any) {
    switch (action.type) {
        case 'TEST':
            return {
                ...state
            }
        case 'UPDATE_STATE':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
    }
}


export const AppContext = React.createContext({})


