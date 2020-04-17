import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import ObservationHeartRateGraph from '@components/widget/observation/ObservationHeartRateGraph'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import { get } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const ObservationHeartRateGraphWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <ObservationHeartRateGraph
          patientId={get(query, 'patientId')}
          optionStyle={get(query, 'optionStyle')}
        />
      </>
    </BootstrapWrapper>
  )
}

ObservationHeartRateGraphWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(ObservationHeartRateGraphWidget)
