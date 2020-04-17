import * as React from 'react'

import { OBSERVATION_CODE } from '@config/observation'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'
import ObservationBloodPressureGraph from './ObservationBloodPressureGraph'
import ObservationBodyHeightGraph from './ObservationBodyHeightGraph'
import ObservationBodyMassIndexGraph from './ObservationBodyMassIndexGraph'
import ObservationBodyTemperatureGraph from './ObservationBodyTemperatureGraph'
import ObservationBodyWeightGraph from './ObservationBodyWeightGraph'
import ObservationHeartRateGraph from './ObservationHeartRateGraph'

const useStyles = makeStyles(theme => ({
  virtalSignCard: {
    height: '100%',
    // overflow: 'auto',
  },
}))

export const ObservationHistoryGraphWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.observationHistoryGraph)
  return <ObservationHistoryGraph patientId={state.patientId} />
}

const ObservationHistoryGraph: React.FunctionComponent<{
  patientId: string
  selectedCard?: string
}> = ({ patientId, selectedCard = '' }) => {
  const [Component, setComponent] = React.useState<any>(<EmptyComponent />)
  const classes = useStyles()
  const state = useSelector((state: any) => state.patientSummaryCards)

  React.useEffect(() => {
    setComponent(renderGraph(selectedCard || _.get(state, 'selectedCard')))
  }, [state])

  const renderGraph = (selected: string) => {
    switch (selected) {
      case OBSERVATION_CODE.BODY_WEIGHT.value:
        return (
          <ObservationBodyWeightGraph
            patientId={patientId}
            mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
          />
        )
      case OBSERVATION_CODE.BODY_HEIGHT.value:
        return (
          <ObservationBodyHeightGraph
            patientId={patientId}
            mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
          />
        )
      case OBSERVATION_CODE.BODY_MASS_INDEX.value:
        return (
          <ObservationBodyMassIndexGraph
            patientId={patientId}
            mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
          />
        )
      case OBSERVATION_CODE.BLOOD_PRESSURE.value:
        return (
          <ObservationBloodPressureGraph
            patientId={patientId}
            mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
          />
        )
      case OBSERVATION_CODE.BODY_TEMPERATURE.value:
        return (
          <ObservationBodyTemperatureGraph
            patientId={patientId}
            mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
          />
        )
      case OBSERVATION_CODE.HEART_RATE.value:
        return (
          <ObservationHeartRateGraph
            patientId={patientId}
            mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
          />
        )
      default:
        return <EmptyComponent />
    }
  }
  return <Paper className={classes.virtalSignCard}>{Component}</Paper>
}

export default ObservationHistoryGraph

const EmptyComponent: React.FunctionComponent<any> = () => {
  const classes = useStyles()
  return (
    <Paper
      className={classes.virtalSignCard}
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography>Empty</Typography>
    </Paper>
  )
}
