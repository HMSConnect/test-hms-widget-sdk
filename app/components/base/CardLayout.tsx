import * as React from 'react'

import {
  Grid,
  Icon as IconMaterial,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import ToolbarWithFilter from './ToolbarWithFilter'

const useStyles = makeStyles((theme: Theme) => ({
  headerCardTitle: {
    color: 'grey',
  },
  headerContainer: { height: 64, backgroundColor: '#ddd4' },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}))

export const CardHeader: React.FunctionComponent<{
  title?: string
  Icon?: any
}> = ({
  title = 'Header',
  Icon = (
    <IconMaterial
      style={{ color: '#c62828fa' }}
      className={'fas fa-stethoscope'}
    />
  ),
}) => {
  const classes = useStyles()
  return (
    <Grid container alignItems='center' className={classes.headerContainer}>
      <Grid item xs={11} style={{ paddingLeft: '1em' }}>
        <Typography variant='body1' className={classes.headerCardTitle}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={1} style={{ paddingRight: '1em' }}>
        <Grid container justify='flex-end' style={{ marginRight: '16px' }}>
          <Typography variant='body1'>{Icon}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

const CardLayout: React.FunctionComponent<{
  header: string
  Icon?: any
  option?: any
}> = ({ header = 'Header Title', Icon, children, option }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paperContainer} elevation={1}>
      {/* <CardHeader title={header} Icon={Icon} /> */}
      <ToolbarWithFilter title={header} Icon={Icon} option={option} />
      {children}
    </Paper>
  )
}

export default CardLayout
