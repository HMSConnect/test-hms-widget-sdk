import * as React from 'react'

import { IPaginationOption } from '@components/hooks/usePatientList'
import InvalidToken from '@components/widget/InvalidToken'
import { CssBaseline, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  body: {},
  root: {
    height: '100vh',
  },
}))

export interface IStatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const InvalidTokenPage: IStatelessPage<{
  query: IPaginationOption
}> = ({ query }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography component='div' className={classes.root}>
        <InvalidToken />
      </Typography>
    </React.Fragment>
  )
}

export default InvalidTokenPage
