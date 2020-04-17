import { Grid, Typography } from '@material-ui/core'
import * as React from 'react'

const ErrorSection: React.FunctionComponent<{
  error: Error | string
}> = ({ error }) => {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      style={{ backgroundColor: '#ffcdd2' }}
    >
      <Grid item>
        <Typography variant='body1'>Something went wrong</Typography>
      </Grid>
      <Grid item>
        <Typography variant='caption'>{error}</Typography>
      </Grid>
    </Grid>
  )
}

export default ErrorSection
