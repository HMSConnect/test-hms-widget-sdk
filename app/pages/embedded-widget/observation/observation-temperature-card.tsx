import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import ObservationTemperatureCard from '@components/widget/observation/ObservationTemperatureCard'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import get from 'lodash/get'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const ObservationTemperatureCardWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <BootstrapWrapper dependencies={['patient', 'observation']}>
      <>
        <CssBaseline />
        <div style={{ height: '100vh' }}>
          {/* <div style={_.get(query, 'optionStyle')}> */}
          <ObservationTemperatureCard
            patientId={get(query, 'patientId')}
            encounterId={get(query, 'encounterId')}
          />
        </div>
      </>
    </BootstrapWrapper>
  )
}

ObservationTemperatureCardWidget.getInitialProps = async ({
  req,
  res,
  query,
}) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(ObservationTemperatureCardWidget)
