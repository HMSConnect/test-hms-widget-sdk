import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientAllergyIntoleranceTable from '@components/widget/patient/PatientAllergyIntoleranceTable'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientAllergyIntoleranceTableWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'allergy_intolerance']}>
      <>
        <CssBaseline />
        <PatientAllergyIntoleranceTable
          patientId={get(query, 'patientId') || '-1'}
          max={get(query, 'max')}
          isInitialize={get(query, 'isInitialize') || true}
          initialFilter={get(query, 'initialFilter')}
          name={get(query, 'name')}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientAllergyIntoleranceTableWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientAllergyIntoleranceTableWidget)
