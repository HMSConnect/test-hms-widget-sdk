import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import AllergyIntoleranceCard from '@components/widget/medical-records/AllergyIntoleranceCard'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const AllergyIntoleranceCardWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()

  return (
    <BootstrapWrapper dependencies={['allergy_intolerance']}>
      <>
        <CssBaseline />
        <AllergyIntoleranceCard />
      </>
    </BootstrapWrapper>
  )
}

AllergyIntoleranceCardWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(AllergyIntoleranceCardWidget)
