import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientCarePlanTable from '@components/widget/patient/PatientCarePlanTable'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientCarePlanTableWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['patient', 'care_plan']}>
      <>
        <CssBaseline />
        <PatientCarePlanTable
          patientId={get(query, 'patientId')}
          max={get(query, 'max')}
          isInitialize={get(query, 'isInitialize') || true}
          isContainer={false}
          initialFilter={get(query, 'initialFilter')}
          name={get(query, 'name')}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientCarePlanTableWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientCarePlanTableWidget)
