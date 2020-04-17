import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientSummaryCards from '@components/widget/patient/PatientSummaryCards'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import get from 'lodash/get'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientDemographicSummaryWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <PatientSummaryCards
          patientId={get(query, 'patientId')}
          encounterId={get(query, 'encounterId')}
          name={get(query, 'name')}
        />
      </>
    </BootstrapWrapper>
  )
}

PatientDemographicSummaryWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientDemographicSummaryWidget)
