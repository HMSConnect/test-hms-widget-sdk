import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BreadcrumbsBase from '@components/base/BreadcrumbsBase'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientInfoDetail from '@components/widget/patient/PatientInfoDetail'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { IStatelessPage } from '@pages/patient-search'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // height: '100vh',
    // paddingTop: '30px',
  },
}))

const PatientMeidicalPanel: IStatelessPage<{
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
        ]}
      >
        <>
          {/* <Container maxWidth='lg'> */}
          <Typography component='div' className={classes.root}>
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
            <PatientInfoDetail query={query} />
          </Typography>
          {/* </Container> */}
        </>
      </BootstrapWrapper>
    </React.Fragment>
  )
}

PatientMeidicalPanel.getInitialProps = async ({ req, res, query }) => {
  return {
    query,
  }
}

export default withAuthSync(PatientMeidicalPanel)
