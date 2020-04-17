import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import _ from 'lodash'
import * as moment from 'moment'
import * as React from 'react'
import { ObjectInspector } from 'react-inspector'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    code: {
      background: 'rgb(36, 36, 36)',
      borderRadius: 8,
      height: '100%',
      minHeight: '20vh',
      padding: 16,
    },
    eventResponse: {
      height: '30vh',
      overflow: 'scroll',
      padding: theme.spacing(2),
      width: '100%',
    },
  }),
)

const WidgetManagerOutputEvent: React.FC<{ outputEventData: any }> = ({
  outputEventData,
}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.eventResponse}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h6'>Event Response</Typography>
        </Grid>
        <Grid className={classes.code} item xs={12}>
          {_.map(outputEventData, ({ timestamp, log }, index: number) => {
            return (
              <Grid container key={index}>
                <Grid item style={{ width: 150 }}>
                  <Typography
                    variant='caption'
                    color='secondary'
                    style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}
                  >
                    {moment.default(timestamp).format('DD/MM/YYYY HH:mm:ss')}
                  </Typography>
                </Grid>
                <Grid item xs='auto' style={{ marginTop: 4 }}>
                  <ObjectInspector
                    data={log}
                    expandLevel={3}
                    theme={'chromeDark'}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Paper>
  )
}
export default WidgetManagerOutputEvent
