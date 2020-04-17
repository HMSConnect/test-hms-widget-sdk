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
    backgroundColor: theme.palette.septenary?.light || '',
    color: theme.palette.septenary?.main || '',
  },
  iconContainer:
    theme.palette.type === 'dark'
      ? {
          backgroundColor: theme.palette.septenary?.light || '',
          flex: 1,
          paddingLeft: 16,
          paddingRight: 16,
        }
      : {
          backgroundColor: theme.palette.septenary?.main || '',
          flex: 1,
          paddingLeft: 16,
          paddingRight: 16,
        },
  noneItem: {
    color: theme.palette.text.secondary,
  },
  unitText: {
    fontWeight: 'normal',
  },
}))
export const PatientMedicationSummaryCardWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.patientMedicationSummaryCard)
  return (
    <PatientMedicationSummaryCard
      patientId={get(state, 'patientId')}
      mouseTrackCategory={get(state, 'mouseTrackCategory')}
    />
  )
}

const PatientMedicationSummaryCard: React.FunctionComponent<any> = ({
  patientId,
  mouseTrackCategory = 'patient_medication_summary_card',
  mouseTrackLabel = 'patient_medication_summary_card',
}) => {
  const {
    isLoading: isGroupResourceListLoading,
    data: groupResourceList,
    error,
  } = useResourceList(patientId, {
    filter: { domainResouce: 'medication_request' },
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
        <PatientMedicationSummaryCardView
          medicationResource={groupResourceList[1]}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default PatientMedicationSummaryCard

const PatientMedicationSummaryCardView: React.FunctionComponent<any> = ({
  medicationResource,
}) => {
  const classes = useStyles()
  return (
    <CardLayout
      header='Total Medication'
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
            className={clsx('fas fa-pills')}
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
              [classes.noneItem]: get(medicationResource, 'totalCount') === 0,
            })}
            style={{
              paddingRight: 8,
            }}
          >
            {get(medicationResource, 'totalCount') || '0'}
          </Typography>{' '}
        </Typography>
      </Grid>
    </CardLayout>
  )
}
