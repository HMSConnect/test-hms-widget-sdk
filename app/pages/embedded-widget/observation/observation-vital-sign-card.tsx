import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import ObservationVitalSignCard from '@components/widget/medical-records/ObservationVitalSignCard'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const ObservationVitalSignCardWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()

  return (
    <BootstrapWrapper dependencies={['observation']}>
      <>
        <CssBaseline />
        <ObservationVitalSignCard />
      </>
    </BootstrapWrapper>
  )
}

ObservationVitalSignCardWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(ObservationVitalSignCardWidget)
