import * as React from 'react'

import ErrorSection from '@components/base/ErrorSection'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import usePatient from '@components/hooks/usePatient'
import {
  Avatar,
  Chip,
  CircularProgress,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
  bigAvatar: {
    height: theme.spacing(10),
    margin: 10,
    width: theme.spacing(10),
  },
  contentText: {
    color: theme.palette.text.primary,
    fontWeight: 'normal',
  },
  headerTitle: {
    color: theme.palette.text.secondary,
  },
  nameTitle: {
    color: theme.palette.text.primary,
    // color: '#808080',
  },
  root: {
    height: '100%',
    padding: theme.spacing(2),
  },
  topicTitle: {
    color: theme.palette.text.secondary,
  },
}))

export const PatientDemographicWithConnector: React.FunctionComponent<{
  patientId?: string
  mouseTrackCategory?: string
  name?: string
}> = ({ patientId, mouseTrackCategory, name }) => {
  const state = useSelector((state: any) => state.patientDemographic)
  return (
    <PatientDemographic
      patientId={patientId || state.patientId}
      mouseTrackCategory={mouseTrackCategory || state.mouseTrackCategory}
      structure={state.structure}
      name={name}
    />
  )
}

const PatientDemographic: React.FunctionComponent<{
  patientId: string
  structure: any
  name?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  patientId,
  structure,
  name = 'PatientDemographic',
  mouseTrackCategory = 'patient_demographic',
  mouseTrackLabel = 'patient_demographic',
}) => {
  const { isLoading: isPatientLoading, data: patient, error } = usePatient(
    patientId,
  )
  const classes = useStyles()
  if (error) {
    return <ErrorSection error={error} />
  }

  if (isPatientLoading) {
    return <CircularProgress />
  }

  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <Grid container className={classes.root} spacing={1}>
        <PatientDemographicView patient={patient} structure={structure} />
      </Grid>
    </TrackerMouseClick>
  )
}

export const PatientDemographicView: React.FunctionComponent<{
  patient: any
  structure: any
}> = ({ patient: info, structure }) => {
  const classes = useStyles()
  return (
    <Grid item sm={12} md={12} lg={12}>
      {/* <div className={classes.root}> */}
      <Grid
        container
        style={{
          alignContent: 'center',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Grid container alignItems='center'>
          <Grid item sm={12} md={12} lg={2}>
            <Grid container alignItems='center'>
              <Avatar
                alt='Image'
                src='../../../../../static/images/mock-person-profile.png'
                className={classes.bigAvatar}
              />
            </Grid>
          </Grid>
          <Grid item sm={12} md={12} lg={9} style={{ paddingLeft: '1em' }}>
            <Grid container>
              {_.get(structure, 'nameField') ? (
                <Typography variant='h4' className={classes.nameTitle}>
                  {_.isArray(_.get(info, 'name.prefix'))
                    ? _.join(_.get(info, 'name.prefix'), ' ')
                    : _.get(info, 'name.prefix')}{' '}
                  {_.isArray(_.get(info, 'name.given'))
                    ? _.join(_.get(info, 'name.given'), ' ')
                    : _.get(info, 'name.given')}{' '}
                  {_.isArray(_.get(info, 'name.family'))
                    ? _.join(_.get(info, 'name.family'), ' ')
                    : _.get(info, 'name.family')}
                </Typography>
              ) : null}
            </Grid>
            <Grid container>
              {/* <Paper elevation={0}> */}
              {_.get(structure, 'languageField')
                ? _.map(info.communication, (com: string, index: any) => {
                    return (
                      <Chip
                        key={`lan-${index}`}
                        label={com}
                        style={{ margin: '4px' }}
                        size='small'
                      />
                    )
                  })
                : null}

              {/* </Paper> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignContent='space-between'
              >
                {_.get(structure, 'ageField') ? (
                  <Grid item xs={12}>
                    <Typography
                      variant='body1'
                      className={classes.topicTitle}
                      component='span'
                    >
                      Age :{' '}
                    </Typography>
                    <Typography
                      component='span'
                      variant='body1'
                      className={classes.contentText}
                    >
                      {_.get(info, 'age') || 'Unknow'}
                    </Typography>
                  </Grid>
                ) : null}
                {_.get(structure, 'genderField') ? (
                  <Grid item xs={12}>
                    <Typography component='div' variant='body1'>
                      <Typography
                        variant='body1'
                        className={classes.topicTitle}
                        component='span'
                      >
                        Gender :{' '}
                      </Typography>
                      <Typography
                        component='span'
                        variant='body1'
                        className={classes.contentText}
                      >
                        {_.startCase(_.get(info, 'gender')) || 'Unknow'}
                      </Typography>
                    </Typography>
                  </Grid>
                ) : null}
                {_.get(structure, 'dobField') ? (
                  <Grid item xs={12}>
                    <Typography
                      variant='body1'
                      className={classes.topicTitle}
                      component='span'
                    >
                      DOB :{' '}
                    </Typography>
                    <Typography
                      component='span'
                      variant='body1'
                      className={classes.contentText}
                    >
                      {_.get(info, 'birthDate')}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid container>
                {_.get(structure, 'phoneField') ? (
                  <Grid item xs={12}>
                    <Typography
                      variant='body1'
                      className={classes.topicTitle}
                      component='span'
                    >
                      Phone :{' '}
                    </Typography>
                    <Typography
                      component='span'
                      variant='body1'
                      className={classes.contentText}
                    >
                      {_.get(info, 'telecom')
                        ? _.isArray(_.get(info, 'telecom'))
                          ? _.join(
                              _.map(_.get(info, 'telecom'), (tel: any) =>
                                _.get(tel, 'value'),
                              ),
                              ' ',
                            )
                          : _.get(info, 'telecom')
                        : 'Unknow'}
                    </Typography>
                  </Grid>
                ) : null}
                {_.get(structure, 'emailField')
                  ? info.email && (
                      <Grid item xs={12}>
                        <Typography
                          variant='body1'
                          className={classes.topicTitle}
                          component='span'
                        >
                          Email :{' '}
                        </Typography>
                        <Typography
                          component='span'
                          variant='body1'
                          className={classes.contentText}
                        >
                          {_.get(info, 'email') || 'Unknow'}
                        </Typography>
                      </Grid>
                    )
                  : null}
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid container>
                {_.get(structure, 'addressField') ? (
                  <Grid item xs={12}>
                    <Typography
                      variant='body1'
                      className={classes.topicTitle}
                      component='span'
                    >
                      Address :{' '}
                    </Typography>
                    <Typography
                      component='span'
                      variant='body1'
                      className={classes.contentText}
                    >
                      {_.get(info, 'address')
                        ? `${
                            _.isArray(_.get(info, 'address[0].line'))
                              ? _.join(_.get(info, 'address[0].line'), ' ')
                              : _.get(info, 'address[0].line')
                          } ${_.get(info, 'address[0].postalCode')} ${_.get(
                            info,
                            'address[0].city',
                          )} ${_.get(info, 'address[0].country')}`
                        : 'Unknow'}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* </div> */}
    </Grid>
  )
}

export default PatientDemographic
