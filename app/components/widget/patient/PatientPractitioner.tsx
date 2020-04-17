import * as React from 'react'

import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useEncounter from '@components/hooks/useEncounter'
import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
  bigAvatar: {
    height: theme.spacing(10),
    margin: 10,
    width: theme.spacing(10),
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  contentText: {
    color: '#37474f',
    fontWeight: 'normal',
  },
  groupAvatar: {
    height: theme.spacing(9),
    width: theme.spacing(9),
  },
  headerTitle: {
    color: 'grey',
  },
  nameTitle: {
    color: '#808080',
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    // flexGrow: 1,
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 14,
  },
  topicTitle: {
    color: 'grey',
  },
}))

export const PatientPractitionerWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.patientPractitioner)
  return (
    // <TrackerMouseClick>
    <PatientPractitioner
      encounterId={state?.encounterId}
      mouseTrackCategory={state?.mouseTrackCategory}
      maxDisplay={state?.maxDisplay}
    />
    // </TrackerMouseClick>
  )
}

// const mockPhysicians = [
//   {
//     name: 'Mr. John Doe',
//     phone: '081-22334455',
//     specialist: 'Internist',
//   },
//   {
//     name: 'Mrs. Jan Doe',
//     phone: '081-22334455',
//     specialist: 'Cardiologist',
//   },
// ]

const PatientPractitioner: React.FunctionComponent<{
  encounterId: string
  maxDisplay?: number
  customOnClickEvent?: any
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  encounterId,
  maxDisplay,
  customOnClickEvent,
  mouseTrackCategory = 'patient_practitioner',
  mouseTrackLabel = 'patient_practitioner',
}) => {
  const classes = useStyles({})
  const { data, error, isLoading } = useEncounter(encounterId)
  if (isLoading) {
    return <LoadingSection />
  }
  if (error) {
    return <ErrorSection error={error} />
  }
  if (_.isArray(data.participant) && data.participant.length >= 2) {
    return (
      <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
        <div className={classes.root}>
          <PatientPractitionerGroupView
            participants={data.participant}
            maxDisplay={maxDisplay}
          />
        </div>
      </TrackerMouseClick>
    )
  }
  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div className={classes.root}>
        <PatientPractitionerSingleView
          participant={
            _.isArray(data.participant) ? data.participant[0] : data.participant
          }
        />
      </div>
    </TrackerMouseClick>
  )
}

// PatientPractitioner.defaultProps = {
//   info: mockPhysicians[Math.round(Math.random() * (mockPhysicians.length - 1))],
// }

export default PatientPractitioner

export const PatientPractitionerGroupView: React.FunctionComponent<{
  participants: any[]
  maxDisplay?: number
}> = ({ participants, maxDisplay = 2 }) => {
  const classes = useStyles()
  if (_.isEmpty(participants)) {
    return (
      <div className={classes.root}>
        <Typography variant='h6' style={{ textAlign: 'center' }}>
          No Practitioner to Display
        </Typography>
      </div>
    )
  }

  const renderGroupIcon = (participants: any, maxDisplay: number) => {
    const iconArray = []
    const minNumber = _.min([participants.length, maxDisplay])
    for (
      let i = 0;
      _.get(participants[i], 'name[0].given[0]') !== undefined && i < minNumber;
      i++
    ) {
      iconArray.push(
        <Avatar key={`avatar-${i}`} className={classes.groupAvatar}>
          <Typography variant='h5' component='span' style={{ color: 'white' }}>
            {_.upperCase(
              _.get(participants[i], 'name[0].given[0]')?.substr(0, 2),
            )}
          </Typography>
        </Avatar>,
      )
    }
    return iconArray
  }

  const renderGroupName = (participants: any, maxDisplay: number) => {
    const displayNames = []
    const minNumber = _.min([participants.length, maxDisplay])
    for (
      let i = 0;
      _.get(participants[i], 'name[0].given[0]') !== undefined && i < minNumber;
      i++
    ) {
      displayNames.push(_.get(participants[i], 'name[0].given[0]'))
    }
    return `${_.join(displayNames, ', ')} ${
      participants.length - minNumber > 0 ? '...' : ''
    }`
  }
  const info = participants[0]
  return (
    <>
      <Typography
        component='div'
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <AvatarGroup>
          {renderGroupIcon(participants, maxDisplay)}
          {participants.length - maxDisplay > 0 ? (
            <Avatar className={classes.groupAvatar}>
              <Typography
                variant='h5'
                component='span'
                style={{ color: 'white' }}
              >
                +{participants.length - maxDisplay}
              </Typography>
            </Avatar>
          ) : null}
        </AvatarGroup>
      </Typography>
      <Typography variant='h6' component='h6' style={{ textAlign: 'center' }}>
        {renderGroupName(participants, maxDisplay)}
      </Typography>
    </>
  )
}

export const PatientPractitionerSingleView: React.FunctionComponent<any> = ({
  participant: info,
}) => {
  const classes = useStyles()
  if (!info) {
    return (
      <div className={classes.root}>
        <Typography variant='h6' style={{ textAlign: 'center' }}>
          No Practitioner to Display
        </Typography>
      </div>
    )
  }
  return (
    <>
      <Typography
        component='div'
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Avatar className={classes.bigAvatar}>
          <Typography variant='h5' component='span' style={{ color: 'white' }}>
            {_.get(info, 'name[0].family')}
          </Typography>
        </Avatar>
      </Typography>
      <Typography className={classes.title} color='textSecondary' gutterBottom>
        {_.get(info, 'qualification')}
      </Typography>
      <Typography variant='h5' component='h2'>
        {_.get(info, 'displayName')}
      </Typography>
      <Typography className={classes.pos} color='textSecondary'>
        {_.get(info, 'telecom')}
      </Typography>
    </>
  )
}
