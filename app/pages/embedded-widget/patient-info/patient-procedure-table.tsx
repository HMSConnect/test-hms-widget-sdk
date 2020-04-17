import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientProcedureTable from '@components/widget/patient/PatientProcedureTable'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientProcedureWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['patient', 'procedure']}>
      <>
        <CssBaseline />
        <PatientProcedureTable
          patientId={get(query, 'patientId')}
          max={get(query, 'max')}
          isInitialize={get(query, 'isInitialize') || true}
          initialFilter={get(query, 'initialFilter')}
          isContainer={false}
          name={get(query, 'name')}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientProcedureWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientProcedureWidget)
