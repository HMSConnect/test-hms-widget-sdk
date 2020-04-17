import * as React from 'react'

import BreadcrumbsBase from '@components/base/BreadcrumbsBase'
import MouseTrackMove from '@components/base/MouseTrackMove'
import Tracker from '@components/base/Tracker'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import AppNavBar from '@components/widget/AppNavBar'
import PatientSummary from '@components/widget/patient/PatientSummary'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { IStatelessPage } from '@pages/patient-search'
import get from 'lodash/get'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // height: '100vh',
    // paddingTop: '30px',
  },
}))

const PatientSummaryPage: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />

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
          <MouseTrackMove category='patient_summary'>
            <>
              {/* <Container maxWidth='lg'> */}
              <Typography component='div' className={classes.root}>
                <AppNavBar />
                <BreadcrumbsBase
                  currentPath='Patient Info'
                  parentPath={[
                    {
                      icon: <HomeIcon />,
                      label: 'Home',
                      url: '/',
                    },
                    {
                      label: 'Patient Search',
                    },
                  ]}
                ></BreadcrumbsBase>

                <PatientSummary
                  patientId={get(query, 'patientId')}
                  encounterId={get(query, 'encounterId')}
                  name={get(query, 'name')}
                />
                {/* <PatientInfoDetail query={query} /> */}
              </Typography>
              {/* </Container> */}
            </>
          </MouseTrackMove>
        </Tracker>
      </BootstrapWrapper>
    </React.Fragment>
  )
}

PatientSummaryPage.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default PatientSummaryPage
