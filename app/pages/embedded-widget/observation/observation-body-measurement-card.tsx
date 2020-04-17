import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import ObservationBodyMeasurementCard from '@components/widget/observation/ObservationBodyMeasurementCard'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import get from 'lodash/get'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const ObservationBodyMeasurementCardWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <div style={{ height: '100vh' }}>
          {/* <div style={_.get(query, 'optionStyle')}> */}
          <ObservationBodyMeasurementCard
            patientId={get(query, 'patientId')}
            encounterId={get(query, 'encounterId')}
          />
        </div>
      </>
    </BootstrapWrapper>
  )
}

ObservationBodyMeasurementCardWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(ObservationBodyMeasurementCardWidget)
