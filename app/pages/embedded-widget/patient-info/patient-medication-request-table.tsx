import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientMedicationRequestTable from '@components/widget/patient/PatientMedicationRequestTable'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientMedicationRequestTableWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'medication_request']}>
      <>
        <CssBaseline />
        <PatientMedicationRequestTable
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

PatientMedicationRequestTableWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientMedicationRequestTableWidget)
