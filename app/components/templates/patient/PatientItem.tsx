import * as React from 'react'

import Highlighter from '@components/base/Highlighter'
import {
  Avatar,
  makeStyles,
  TableCell,
  Theme,
  Typography,
} from '@material-ui/core'
import get from 'lodash/get'

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
  content: {
    padding: 0,
  },
  root: {},
}))

const PatientItem: React.FunctionComponent<{
  patient: any
  highlightText?: string
}> = ({ highlightText, patient }) => {
  const classes = useStyles()
  return (
    <>
      <TableCell>
        <Avatar variant='rounded' className={classes.avatar}></Avatar>
      </TableCell>
      <TableCell align='center'>
        <Typography>
          {highlightText ? (
            <strong>
              <Highlighter
                text={get(patient, 'name.given[0]')}
                highlightText={highlightText}
              />{' '}
              <Highlighter
                text={get(patient, 'name.family')}
                highlightText={highlightText}
              />
            </strong>
          ) : (
            <>
              {get(patient, 'name.given[0]')} {get(patient, 'name.family')}
            </>
          )}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body2'>
          {get(patient, 'gender') || 'Unknow'}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='body2'>
          {get(patient, 'birthDate') || 'Unknow'}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='body2'>
          {get(patient, 'identifier.id.value') || 'Unknow'}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='body2'>
          {get(patient, 'identifier.mr.value') || 'Unknow'}
        </Typography>
      </TableCell>
    </>
  )
}

export default PatientItem
