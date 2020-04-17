import * as React from 'react'

import { Grid, makeStyles, Theme } from '@material-ui/core'
import { sendMessage } from '@utils'
import * as _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { cardClick } from '../../../actions/patientsummaryCards.action'
import ObservationBloodPressureCard from '../observation/ObservationBloodPressureCard'
import ObservationBodyMeasurementCard from '../observation/ObservationBodyMeasurementCard'
import ObservationHeartRateCard from '../observation/ObservationHeartRateCard'
import ObservationTemperatureCard from '../observation/ObservationTemperatureCard'
import ObservationTabacoSmokingStatusCard from '../observation/ObservationTobaccoSmokingStatusCard'

const useStyles = makeStyles((theme: Theme) => ({
  bodyCard: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContainer: {
    display: 'flex',
  },
  cardContent: {
    height: 250,
    padding: theme.spacing(1),
  },
  contentText: {
    color: '#1b5e20',
  },
  footerContainer: { height: 36 },
  headerCardTitle: {
    color: 'grey',
  },
  headerContainer: { height: 64, backgroundColor: '#ddd4' },
  iconCard: {
    zoom: 3,
  },
  iconContainer: {
    textAlign: 'center',
  },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}))

export const PatientSummaryCardsWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.patientSummaryCards)

  return (
    <PatientSummaryCards
      key={`PatientSummaryCards${_.get(state, 'query.encounterId')}`}
      patientId={state.patientId}
      encounterId={state.encounterId}
      name={`${name}DemographicSuumary`}
    />
  )
}

const PatientSummaryCards: React.FunctionComponent<{
  patientId: string
  encounterId: string
  name?: string
}> = ({ patientId, encounterId, name = 'PatientSummaryCards' }) => {
  const patientSummaryCardsState = useSelector(
    (state: any) => state.patientSummaryCards,
  )
  const dispatch = useDispatch()
  const handleCardClick = (cardName: string) => {
    dispatch(cardClick(cardName))
    sendMessage({
      message: 'handleCardClick',
      name,
      params: {
        cardName,
      },
    })
  }
  return (
    <PatientSummaryCardsView
      patientId={patientId}
      encounterId={encounterId}
      onClickCard={handleCardClick}
      selectedCard={_.get(patientSummaryCardsState, 'selectedCard')}
    />
  )
}

export default PatientSummaryCards

export const PatientSummaryCardsView: React.FunctionComponent<{
  patientId: string
  encounterId: string
  onClickCard?: any
  selectedCard?: string
}> = ({ patientId, encounterId, onClickCard, selectedCard }) => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className={classes.cardContent}
      >
        <ObservationBodyMeasurementCard
          patientId={patientId}
          encounterId={encounterId}
          onClick={onClickCard}
          selectedCard={selectedCard}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className={classes.cardContent}
      >
        <ObservationBloodPressureCard
          patientId={patientId}
          encounterId={encounterId}
          onClick={onClickCard}
          selectedCard={selectedCard}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className={classes.cardContent}
      >
        <ObservationTemperatureCard
          patientId={patientId}
          encounterId={encounterId}
          onClick={onClickCard}
          selectedCard={selectedCard}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className={classes.cardContent}
      >
        <ObservationHeartRateCard
          patientId={patientId}
          encounterId={encounterId}
          onClick={onClickCard}
          selectedCard={selectedCard}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.cardContent}
      >
        <ObservationTabacoSmokingStatusCard
          patientId={patientId}
          encounterId={encounterId}
          onClick={onClickCard}
          selectedCard={selectedCard}
        />
      </Grid>
    </Grid>
  )
}
