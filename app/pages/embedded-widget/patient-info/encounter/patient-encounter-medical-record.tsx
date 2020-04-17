import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientInfoDetail from '@components/widget/patient/PatientInfoDetail'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import * as _ from 'lodash'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientInfoWidget: IStatelessPage<{
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
      ]}
    >
      <>
        <CssBaseline />
        <PatientInfoDetail query={query} name={_.get(query, 'name')} />
      </>
    </BootstrapWrapper>
  )
}

PatientInfoWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default withAuthSync(PatientInfoWidget)
