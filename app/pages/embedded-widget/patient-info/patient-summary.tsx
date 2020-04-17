import * as React from 'react'

import Tracker from '@components/base/Tracker'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientSummary from '@components/widget/patient/PatientSummary'
import { CssBaseline, makeStyles, Paper, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import get from 'lodash/get'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientSummaryWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper
      dependencies={[
        'allergy_intolerance',
        'condition',
        'diagnostic_report',
        'encounter',
        'observation',
        'patient',
        'immunization',
        'procedure',
        'medication_request',
        'imaging_study',
        'claim',
        'care_plan',
        'organization',
        'practitioner',
      ]}
    >
      <Tracker>
        <>
          <CssBaseline />
          <Paper>
            <PatientSummary
              patientId={get(query, 'patientId')}
              encounterId={get(query, 'encounterId')}
              name={get(query, 'name')}
            />
          </Paper>
        </>
      </Tracker>
    </BootstrapWrapper>
  )
}

PatientSummaryWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default PatientSummaryWidget
