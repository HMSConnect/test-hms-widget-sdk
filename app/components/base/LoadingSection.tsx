import { Grid } from '@material-ui/core'
import * as React from 'react'

const LoadingSection: React.FunctionComponent<{ label?: string }> = ({
  label,
}) => {
  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={{ backgroundColor: '#81d4fa' }}
    >
      <Grid>{label ? label : 'loading..'}</Grid>
    </Grid>
  )
}

export default LoadingSection
