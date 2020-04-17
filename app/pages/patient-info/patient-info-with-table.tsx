import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientInfoDetail from '@components/widget/patient/PatientInfoDetail'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // height: '100vh',
  },
}))

const PatientInfoView: IStatelessPage<{
  query: any
}> = ({ query }) => {
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
      ]}
    >
      <>
        <CssBaseline />
        <Typography component='div'>
          <PatientInfoDetail query={query} />
        </Typography>
      </>
    </BootstrapWrapper>
  )
}

PatientInfoView.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default withAuthSync(PatientInfoView)
