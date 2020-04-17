import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import ObservationBloodPressureGraph from '@components/widget/observation/ObservationBloodPressureGraph'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const ObservationBloodPressureGraphWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <ObservationBloodPressureGraph
          patientId={get(query, 'patientId')}
          optionStyle={get(query, 'optionStyle')}
        />
      </>
    </BootstrapWrapper>
  )
}

ObservationBloodPressureGraphWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(ObservationBloodPressureGraphWidget)
