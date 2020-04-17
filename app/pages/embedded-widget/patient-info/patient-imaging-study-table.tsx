import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientImagingStudyTable from '@components/widget/patient/PatientImagingStudyTable'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientImagingStudyTableWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['patient', 'imaging_study']}>
      <>
        <CssBaseline />
        <PatientImagingStudyTable
          patientId={get(query, 'patientId')}
          max={get(query, 'max')}
          isInitialize={get(query, 'isInitialize') || true}
          initialFilter={get(query, 'initialFilter')}
          name={get(query, 'name')}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientImagingStudyTableWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientImagingStudyTableWidget)
