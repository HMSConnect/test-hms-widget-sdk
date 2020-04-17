import React from 'react'

import CardLayout from '@components/base/CardLayout'
import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useResourceList from '@components/hooks/useResourceList'
import {
  Grid,
  Icon,
  lighten,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import get from 'lodash/get'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
  bodyCard: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  contentText: {
    fontWeight: 'normal',
  },
  headerCard: {
    backgroundColor: theme.palette.denary?.light || '',
    color: theme.palette.denary?.main || '',
  },
  iconContainer:
    theme.palette.type === 'dark'
      ? {
          backgroundColor: theme.palette.denary?.light || '',
          flex: 1,
          paddingLeft: 16,
          paddingRight: 16,
        }
      : {
          backgroundColor: theme.palette.denary?.main || '',
          flex: 1,
          paddingLeft: 16,
          paddingRight: 16,
        },
  noneItem: {
    color: theme.palette.text.secondary,
  },
}))

export const PatientImmunizationSummerCardWithConnector: React.FunctionComponent = () => {
  const state = useSelector(
    (state: any) => state.patientImmunizationSummaryCard,
  )
  return (
    <PatientImmunizationSummerCard
      patientId={get(state, 'patientId')}
      mouseTrackCategory={get(state, 'mouseTrackCategory')}
    />
  )
}

const PatientImmunizationSummerCard: React.FunctionComponent<any> = ({
  patientId,
  mouseTrackCategory = 'patient_immunization_summary_card',
  mouseTrackLabel = 'patient_immunization_summary_card',
}) => {
  const {
    isLoading: isGroupResourceListLoading,
    data: groupResourceList,
    error,
  } = useResourceList(patientId, {
    filter: { domainResouce: 'immunization' },
  })
  if (error) {
    return <ErrorSection error={error} />
  }

  if (isGroupResourceListLoading) {
    return <LoadingSection />
  }
  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div style={{ height: '100%' }}>
        <PatientImmunizationSummerCardView
          immunization={groupResourceList[1]}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default PatientImmunizationSummerCard

const PatientImmunizationSummerCardView: React.FunctionComponent<any> = ({
  immunization,
}) => {
  const classes = useStyles()
  return (
    <CardLayout
      header='Total Immunization'
      option={{
        headerClass: classes.headerCard,
        isHideIcon: true,
      }}
    >
      <Grid container style={{ height: '100%' }}>
        <Typography
          component='div'
          variant='body1'
          className={clsx(classes.bodyCard, classes.iconContainer)}
        >
          <Icon
            style={{ color: 'white', fontSize: '2.2em', textAlign: 'center' }}
            className={clsx('fas fa-syringe')}
          />
        </Typography>
        <Typography
          component='div'
          variant='body1'
          style={{
            flex: 4,
            paddingLeft: 16,
            paddingRight: 16,
            textAlign: 'center',
          }}
          className={clsx(classes.bodyCard)}
        >
          <Typography
            component='span'
            variant='h4'
            className={clsx(classes.contentText, {
              [classes.noneItem]: get(immunization, 'totalCount') === 0,
            })}
            style={{
              paddingRight: 8,
            }}
          >
            {get(immunization, 'totalCount') || '0'}
          </Typography>{' '}
        </Typography>
      </Grid>
    </CardLayout>
  )
}
