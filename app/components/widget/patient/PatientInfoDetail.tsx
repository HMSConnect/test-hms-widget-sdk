import React, { useState } from 'react'

import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import { CircularProgress, Grid, makeStyles, Paper } from '@material-ui/core'
import { sendMessage } from '@utils'
import * as _ from 'lodash'
import routes from '../../../routes'
import RouteManager from '../../../routes/RouteManager'
import { IEnhancedTableProps } from '../../base/EnhancedTableHead'
import usePatient from '../../hooks/usePatient'
import useResourceList from '../../hooks/useResourceList'
import PatientInfoTable from '../../templates/patient/PatientInfoTable'
import PatientMenuList from '../../templates/patient/PatientMenuList'
import PatientAllergyIntoleranceTable from './PatientAllergyIntoleranceTable'
import PatientCarePlanTable from './PatientCarePlanTable'
import PatientClaimTable from './PatientClaimTable'
import PatientConditionTable from './PatientConditionTable'
import { PatientDemographicWithConnector } from './PatientDemographic'
import PatientEncounterTimeline from './PatientEncounterTimeline'
import PatientImagingStudyTable from './PatientImagingStudyTable'
import PatientImmunizationTable from './PatientImmunizationTable'
import PatientMedicationRequestTable from './PatientMedicationRequestTable'
import PatientObservationTable from './PatientObservationTable'
import PatientProcedureTable from './PatientProcedureTable'

export interface IPatientTableProps {
  entry: any[]
  headerCells: IEnhancedTableProps[]
  bodyCells: any
}

export interface IPatientTableData {
  tableData: any
  tableNavigate: string
}
const useStyles = makeStyles((theme) => ({
  bigAvatar: {
    height: 156,
    margin: 10,
    width: 156,
  },
  detailSelector: {
    flex: 1,
  },
  infoPanel: {
    padding: 8,
  },
  menuList: {
    margin: 8,
    position: 'sticky',
    top: 0,
  },
  patientContent: {
    flex: 1,
    margin: 8,
  },
  root: { height: '100%', display: 'flex' },
}))

const PatientInfoDetail: React.FunctionComponent<{
  query: any
  name?: string
}> = ({ query, name = 'patientInfoDetail' }) => {
  const classes = useStyles()
  const { isLoading: isPatientLoading, data: patient, error } = usePatient(
    _.get(query, 'patientId') || _.get(query, 'id'),
  )

  if (error) {
    return <ErrorSection error={error} />
  }

  if (isPatientLoading) {
    return <LoadingSection />
  }

  return (
    <>
      <div className={classes.infoPanel}>
        <Paper>
          <PatientDemographicWithConnector
            patientId={_.get(query, 'patientId') || _.get(query, 'id')}
          />
        </Paper>
      </div>
      <div className={classes.detailSelector}>
        <PatientDetailSelector patient={patient} query={query} name={name} />
      </div>
    </>
  )
}

const PatientDetailSelector: React.FunctionComponent<any> = ({
  query,
  patient,
  name = 'patientDetailSelector',
}) => {
  const PatientDetail = PatientDetailSub

  return (
    <PatientDetail patient={patient} query={query} name={name}></PatientDetail>
  )
}

const PatientDetailSub: React.FunctionComponent<{
  patient: any
  query: any
  name?: string
}> = ({ patient, query, name = 'patientDetailSub' }) => {
  const classes = useStyles()
  const {
    isLoading: isGroupResourceListLoading,
    data: groupResourceList,
    error,
  } = useResourceList(_.get(patient, 'identifier.id.value'), {
    ...query,
    max: query.max || 20,
  })
  const [menuNavigate, setMenuNavigate] = useState(
    query.menuNavigate || 'patient',
  )

  const handleNavigateChange = (newNavigateValue: string) => {
    const params = {
      menuNavigate: newNavigateValue,
      patientId: _.get(patient, 'identifier.id.value'),
    }
    const path = RouteManager.getPath(`patient-info-with-table`, {
      matchBy: 'url',
      params,
    })
    sendMessage({
      message: 'handleNavigateChange',
      name,
      params,
      path,
    })
    routes.Router.replaceRoute(path)
    setMenuNavigate(newNavigateValue)
  }

  const renderInformationTable = (navigate: string) => {
    switch (navigate) {
      case 'patient':
        return <PatientInfoTable patient={patient} />
      case 'encounter':
        return (
          <PatientEncounterTimeline
            patientId={_.get(patient, 'identifier.id.value')}
            name={`${name}EncounterTimeline`}
            isInitialize={true}
            max={query.max}
            isRouteable={false}
          />
        )
      case 'condition':
        return (
          <PatientConditionTable
            patientId={_.get(patient, 'identifier.id.value')}
            name={`${name}ConditionTable`}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'allergy_intolerance':
        return (
          <PatientAllergyIntoleranceTable
            patientId={_.get(patient, 'identifier.id.value')}
            name={`${name}AllergyIntoleranceTable`}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'immunization':
        return (
          <PatientImmunizationTable
            patientId={_.get(patient, 'identifier.id.value')}
            name={`${name}ImmunizationTable`}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'procedure':
        return (
          <PatientProcedureTable
            patientId={_.get(patient, 'identifier.id.value')}
            name={`${name}ProcedureTable`}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'medication_request':
        return (
          <PatientMedicationRequestTable
            patientId={_.get(patient, 'identifier.id.value')}
            name={`${name}MedicationRequestTable`}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'observation':
        return (
          <PatientObservationTable
            patientId={_.get(patient, 'identifier.id.value')}
            name={`${name}ObservationTable`}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'imaging_study':
        return (
          <PatientImagingStudyTable
            patientId={_.get(patient, 'identifier.id.value')}
            name={`${name}ImagingStudyTable`}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'claim':
        return (
          <PatientClaimTable
            patientId={_.get(patient, 'identifier.id.value')}
            name={`${name}ClaimTable`}
            isInitialize={true}
            max={query.max}
          />
        )
      case 'care_plan':
        return (
          <PatientCarePlanTable
            patientId={_.get(patient, 'identifier.id.value')}
            name={`${name}CarePlanTable`}
            isInitialize={true}
            max={query.max}
          />
        )
      default:
        return <div style={{ padding: 8 }}> Comming soon </div>
    }
  }

  if (isGroupResourceListLoading) {
    return <CircularProgress />
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={3}>
        <Paper className={classes.menuList}>
          <PatientMenuList
            menuList={groupResourceList}
            navigate={menuNavigate}
            onNavigateChange={handleNavigateChange}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Paper className={classes.patientContent}>
          {renderInformationTable(menuNavigate)}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default PatientInfoDetail
