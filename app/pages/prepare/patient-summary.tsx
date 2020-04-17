import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PreparePatientData from '@components/widget/PreparePatientData'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import * as _ from 'lodash'

// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'

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
    <BootstrapWrapper dependencies={['encounter']}>
      <>
        <CssBaseline />
        <Typography component='div'>
          {/* <BreadcrumbsBase
            currentPath='Patient Info'
            parentPath={[
              {
                icon: <HomeIcon />,
                url: '/',
              },
              {
                label: 'Patient Search',
              },
            ]}
          /> */}
          <PreparePatientData query={query} name={_.get(query, 'name')} />
          {/* <PatientInfoDetail query={query} /> */}
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

export default PatientInfoView
