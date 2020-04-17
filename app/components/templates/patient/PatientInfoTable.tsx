import * as React from 'react'

import { makeStyles, Theme, Toolbar } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { lighten } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  highlight:
    theme.palette.type === 'light'
      ? {
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          color: theme.palette.secondary.main,
        }
      : {
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.text.primary,
        },
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    width: '100%',
  },
  title: {
    flex: '1 1 100%',
  },
}))

export default function PatientInfoTable({ patient: info }: any) {
  const classes = useStyles()
  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: true,
        })}
      >
        <Typography className={classes.title} variant='h6'>
          Patient
        </Typography>
      </Toolbar>
      <Grid container style={{ padding: 16 }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm={5}>
              <Typography variant='subtitle1'>
                <strong>Identifier</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant='subtitle1'>
                <strong>Name</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant='subtitle1'>
                <strong>Gender</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant='subtitle1'>
                <strong>Birth Date</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={5}>
              <Typography variant='subtitle2'>
                {info
                  ? info.identifier
                    ? Object.keys(info.identifier).map((keyName: any) => {
                        return (
                          <Typography variant='body2' key={keyName}>
                            {`${info.identifier[keyName].systemCode} : ${info.identifier[keyName].value}`}
                          </Typography>
                        )
                      })
                    : ''
                  : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant='body2'>
                {info
                  ? `${
                      info.name.prefix && Array.isArray(info.name.prefix)
                        ? info.name.prefix.join(` `)
                        : ''
                    }${
                      info.name.prefix
                        ? info.name.prefix.length > 0
                          ? ' '
                          : ''
                        : ''
                    }${
                      info.name.given && Array.isArray(info.name.given)
                        ? info.name.given.join(` `)
                        : ''
                    }${
                      info.name.given
                        ? info.name.given.length > 0
                          ? ' '
                          : ''
                        : ''
                    }${
                      info.name.family && Array.isArray(info.name.family)
                        ? info.name.family.map(
                            (v: any, i: any) =>
                              `${v}${
                                i < info.name.family.length - 1 ? ' ' : ''
                              }`,
                          )
                        : ''
                    }`
                  : 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant='body2'>
                {info ? (info.gender ? info.gender : '') : ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant='body2'>
                {info ? (info.birthDate ? info.birthDate : '') : ''}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
