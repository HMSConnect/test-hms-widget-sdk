import React from 'react'

import GridLayoutWithComponentSelector from '@components/base/GridLayoutWithComponentSelector'
import { makeStyles } from '@material-ui/core'
import * as _ from 'lodash'
import { useDispatch } from 'react-redux'
import { IEnhancedTableProps } from '../../base/EnhancedTableHead'
import { ObservationBloodPressureCardWithConnector } from '../observation/ObservationBloodPressureCard'
import { ObservationBodyMeasurementCardWithConnector } from '../observation/ObservationBodyMeasurementCard'
import { ObservationHeartRateCardWithConnector } from '../observation/ObservationHeartRateCard'
import { ObservationHistoryGraphWithConnector } from '../observation/ObservationHistoryGraph'
import { ObservationLaboratoryTableWithConnector } from '../observation/ObservationLaboratoryTable'
import { ObservationSummaryGraphWithConnector } from '../observation/ObservationSummaryGraph'
import { ObservationTemperatureCardWithConnector } from '../observation/ObservationTemperatureCard'
import { ObservationTobaccoSmokingStatusCardWithConnector } from '../observation/ObservationTobaccoSmokingStatusCard'
import { PatientAllergyListWithConnector } from './PatientAllergyList'
import { PatientAllergySummerCardWithConnector } from './PatientAllergySummaryCard'
import { PatientCarePlanTableWithConnector } from './PatientCarePlanTable'
import { PatientconditionTableWithConnector } from './PatientConditionTable'
import { PatientDemographicWithConnector } from './PatientDemographic'
import { PatientEncounterTimelineWithConnector } from './PatientEncounterTimeline'
import { PatientImmunizationSummerCardWithConnector } from './PatientImmunizationSummaryCard'
import { PatientImmunizationTableWithConnector } from './PatientImmunizationTable'
import { PatientMedicationListWithConnector } from './PatientMedication'
import { PatientMedicationSummaryCardWithConnector } from './PatientMedicationSummaryCard'
import { PatientPractitionerWithConnector } from './PatientPractitioner'
import { PatientProcedureTableWithConnector } from './PatientProcedureTable'
import { PatientSummaryCardsWithConnector } from './PatientSummaryCards'

export interface IPatientTableProps {
  entry: any[]
  headerCells: IEnhancedTableProps[]
  bodyCells: any
}

export interface IPatientTableData {
  tableData: any
  tableNavigate: string
}
const useStyles = makeStyles(theme => ({
  associatedPatientCard: {
    flex: 1,
    height: '15em',
    margin: theme.spacing(1),
    marginTop: 0,
    overflow: 'auto',
    paddingBottom: '1em',
  },
  detailSelector: {
    flex: 1,
  },
  infoPanel: {
    height: '30em',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  laboratoryCardContent: {
    height: '34em',
    margin: theme.spacing(1),
    overflow: 'auto',
  },
  menuList: {
    height: '44em',
    margin: theme.spacing(1),
    overflow: 'auto',
    top: 0,
  },
  patientContent: {
    flex: 1,
    height: '100',
    margin: theme.spacing(1),
  },
  root: { height: '100%', display: 'flex' },
  virtalSignCard: {
    flex: 1,
    margin: theme.spacing(1),
    overflow: 'auto',
  },
}))

const componentResource: any = {
  observationBloodPressureCard: {
    component: ObservationBloodPressureCardWithConnector,
    defaultPosition: { x: 6, y: 8 },
    layout: { h: 4, w: 2, isCard: true },
  },
  observationBodyMeasurementCard: {
    component: ObservationBodyMeasurementCardWithConnector,
    defaultPosition: { x: 4, y: 8 },
    layout: { h: 4, w: 2, isCard: true },
  },
  observationHeartRateCard: {
    component: ObservationHeartRateCardWithConnector,
    defaultPosition: { x: 6, y: 12 },
    layout: { h: 4, w: 2, isCard: true },
  },
  observationHistoryGraph: {
    component: ObservationHistoryGraphWithConnector,
    defaultPosition: { x: 8, y: 4 },
    layout: { h: 12, w: 4, isCard: true },
  },
  observationLaboratoryTable: {
    component: ObservationLaboratoryTableWithConnector,
    defaultPosition: { x: 0, y: 34 },
    layout: { h: 9, w: 8, isCard: true },
  },
  observationSummaryGraph: {
    component: ObservationSummaryGraphWithConnector,
    defaultPosition: { x: 8, y: 34 },
    layout: { h: 9, w: 4, isCard: true },
  },
  observationTabacoSmokingstatusCard: {
    component: ObservationTobaccoSmokingStatusCardWithConnector,
    defaultPosition: { x: 4, y: 16 },
    layout: { h: 2, w: 4, isCard: true },
  },
  observationTemperatureCard: {
    component: ObservationTemperatureCardWithConnector,
    defaultPosition: { x: 4, y: 12 },
    layout: { h: 4, w: 2, isCard: true },
  },
  patientAllergyList: {
    component: PatientAllergyListWithConnector,
    defaultPosition: { x: 8, y: 0 },
    layout: { h: 4, w: 2, isCard: true },
  },
  patientAllergySummaryCard: {
    component: PatientAllergySummerCardWithConnector,
    defaultPosition: { x: 2, y: 43 },
    layout: { h: 2, w: 2, isCard: true },
  },
  patientCarePlanTable: {
    component: PatientCarePlanTableWithConnector,
    defaultPosition: { x: 6, y: 25 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientConditionTable: {
    component: PatientconditionTableWithConnector,
    defaultPosition: { x: 6, y: 20 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientDemographic: {
    component: PatientDemographicWithConnector,
    defaultPosition: { x: 0, y: 0 },
    layout: { h: 4, w: 6, isCard: true },
  },
  patientEncounterTimeline: {
    component: PatientEncounterTimelineWithConnector,
    defaultPosition: { x: 0, y: 4 },
    layout: { h: 12, w: 4, isCard: true },
  },
  patientImmunizationSummaryCard: {
    component: PatientImmunizationSummerCardWithConnector,
    defaultPosition: { x: 0, y: 43 },
    layout: { h: 2, w: 2, isCard: true },
  },
  patientImmunizationTable: {
    component: PatientImmunizationTableWithConnector,
    defaultPosition: { x: 0, y: 20 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientMedicationList: {
    component: PatientMedicationListWithConnector,
    defaultPosition: { x: 12, y: 0 },
    layout: { h: 4, w: 2, isCard: true },
  },
  patientMedicationSummaryCard: {
    component: PatientMedicationSummaryCardWithConnector,
    defaultPosition: { x: 0, y: 45 },
    layout: { h: 2, w: 2, isCard: true },
  },
  // patientInfoDashboard: {
  //   component: PatientInfoDashboard,
  //   defaultPosition: { x: 8, y: 0 },
  //   layout: { h: 4, w: 4, isCard: true },
  // },
  patientPractitioner: {
    component: PatientPractitionerWithConnector,
    defaultPosition: { x: 6, y: 0 },
    layout: { h: 4, w: 2, isCard: true },
  },
  patientProcedureTable: {
    component: PatientProcedureTableWithConnector,
    defaultPosition: { x: 0, y: 25 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientSummaryCards: {
    component: PatientSummaryCardsWithConnector,
    // defaultPosition: { x: 4, y: 4 },
    layout: { h: 12, w: 4, isCard: false },
  },
}
let index = 0
const defaultItems = _.chain(componentResource)
  .omitBy(c => _.isEmpty(c.defaultPosition))
  .map((c, componentKey) => {
    return {
      componentKey,
      i: `${componentKey}_${index++}`,
      // i: `init_${componentKey}`,
      ...(c?.defaultPosition || { x: 0, y: 9 }),
      ...(c?.layout || {}),
    }
  })
  .value()

const PatientSummary: React.FunctionComponent<{
  patientId: string
  encounterId: string
  name?: string
}> = ({ patientId, encounterId, name = 'patientSummary' }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  React.useEffect(() => {
    dispatch({
      payload: {
        observationHistoryGraph: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        observationLaboratoryTable: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        observationSummaryGraph: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientAllergyList: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientAllergySummaryCard: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientCarePlanTable: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientConditionTable: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientDemographic: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientEncounterTimeline: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientImmunizationSummaryCard: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientImmunizationTable: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientMedicationList: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientMedicationSummaryCard: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientPractitioner: {
          encounterId,
          maxDisplay: 2,
          mouseTrackCategory: 'patient_summary',
        },
        patientProcedureTable: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientSummaryCards: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
      },
      type: 'INIT_PATIENT_SUMMARY',
    })
  }, [patientId, encounterId])

  return (
    <>
      <GridLayoutWithComponentSelector
        componentResource={componentResource}
        defaultItems={defaultItems}
      />
    </>
  )
}

export default PatientSummary
