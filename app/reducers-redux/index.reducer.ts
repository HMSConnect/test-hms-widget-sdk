import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import observationHistoryGraph from './observationHistoryGraph.reducer'
import observationLaboratoryTable from './observationLaboratoryTable.reducer'
import observationSummaryGraph from './observationSummaryGraph.reducer'
import patientAllergyList from './patientAllergyList.reducer'
import patientAllergySummaryCard from './patientAllergySummaryCard.reducer'
import patientCarePlanTable from './patientCarePlanTable.reducer'
import patientConditionTable from './patientConditionTable.reducer'
import patientDemographic from './patientDemographic.reducer'
import patientEncounterTimeline from './patientEncounterTimeline.reducer'
import patientImmunizationSummaryCard from './patientImmunizationSummaryCard.reducer'
import patientImmunizationTable from './patientImmunizationTable.reducer'
import patientMedicationList from './patientMedicationList.reducer'
import patientMedicationSummaryCard from './patientMedicationSummaryCard.reducer'
import patientPractitioner from './patientPractitioner.reducer'
import patientProcedureTable from './patientProcedureTable.reducer'
import patientSummaryCards from './patientSummaryCards.reducer'
import themeType from './theme.reducer'

const middlewares: any[] = []

const composeEnhancers: any =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

export const rootReducer = combineReducers({
  observationHistoryGraph,
  observationLaboratoryTable,
  observationSummaryGraph,
  patientAllergyList,
  patientAllergySummaryCard,
  patientCarePlanTable,
  patientConditionTable,
  patientDemographic,
  patientEncounterTimeline,
  patientImmunizationSummaryCard,
  patientImmunizationTable,
  patientMedicationList,
  patientMedicationSummaryCard,
  patientPractitioner,
  patientProcedureTable,
  patientSummaryCards,
  themeType,
})

const store = createStore(rootReducer, enhancer)

export default store
