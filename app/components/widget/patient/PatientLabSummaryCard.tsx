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

const useStyles = makeStyles((theme: Theme) => ({
  bodyCard: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  clickable: {
    cursor: 'pointer',
  },
  contentText: {
    fontWeight: 'normal',
  },
  hover: {
    '&:hover': {
      backgroundColor: '#ddd4',
    },
    textDecoration: 'none',
  },
  infoIcon: {
    color: '#1976d2',
    zoom: 0.7,
  },
  selectedCard: {
    backgroundColor: '#ddd4',
    border: '2px solid #00b0ff',
    borderRadius: 4,
  },
  unitText: {
    fontWeight: 'normal',
  },
}))

const PatientLabSummaryCard: React.FunctionComponent<any> = ({
  patientId,
  mouseTrackCategory = 'patient_lab_summary_card',
  mouseTrackLabel = 'patient_lab_summary_card',
}) => {
  const {
    isLoading: isGroupResourceListLoading,
    data: groupResourceList,
    error,
  } = useResourceList(patientId, {
    filter: { domainResouce: 'allergy_intolerance' },
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
        <PatientLabSummaryCardView labResource={groupResourceList[1]} />
      </div>
    </TrackerMouseClick>
  )
}

export default PatientLabSummaryCard

const PatientLabSummaryCardView: React.FunctionComponent<any> = ({
  labResource,
}) => {
  const classes = useStyles()
  return (
    <CardLayout
      header='Total Lab'
      option={{
        isHideIcon: true,
        style: {
          backgroundColor: lighten('#3c8dbc', 0.85),
          color: '#3c8dbc',
        },
      }}
    >
      <Grid container style={{ height: '100%' }}>
        <Typography
          component='div'
          variant='body1'
          style={{
            backgroundColor: '#3c8dbc',
            flex: 1,
            paddingLeft: 16,
            paddingRight: 16,
          }}
          className={clsx(classes.bodyCard)}
        >
          <Icon
            style={{ color: 'white', zoom: '3em', textAlign: 'center' }}
            className={clsx('fas fa-thermometer-quarter')}
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
            className={classes.contentText}
            style={{
              color: get(labResource, 'totalCount') === 0 ? undefined : 'gray',
              paddingRight: 8,
            }}
          >
            {get(labResource, 'totalCount') || '0'}
          </Typography>{' '}
        </Typography>
      </Grid>
    </CardLayout>
  )
}
