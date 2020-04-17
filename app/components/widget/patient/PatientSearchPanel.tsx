import React, { useEffect, useState } from 'react'

import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core'
import { hexToRgb } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'

import PatientFilterBar, {
  IPatientFilterValue,
} from '../../templates/patient/PatientFilterBar'

export const ColorButton = withStyles((theme: Theme) => ({
  root: {
    '&:hover,&:focus': {
      backgroundColor: '#ff9800',
      boxShadow:
        '0 14px 26px -12px rgba(' +
        hexToRgb('#ff9800') +
        ', 0.42), 0 4px 23px 0px rgba(' +
        hexToRgb('#000') +
        ', 0.12), 0 8px 10px -5px rgba(' +
        hexToRgb('#ff9800') +
        ', 0.2)',
    },
    backgroundColor: '#ff9800',
    boxShadow:
      '0 2px 2px 0 rgba(' +
      hexToRgb('#ff9800') +
      ', 0.14), 0 3px 1px -2px rgba(' +
      hexToRgb('#ff9800') +
      ', 0.2), 0 1px 5px 0 rgba(' +
      hexToRgb('#ff9800') +
      ', 0.12)',
  },
}))(Button)

const useStyles = makeStyles((theme: Theme) => ({
  actionButton: {
    margin: '0.5em',
  },
  resize: {
    fontSize: 15,
  },
  searchBar: {},
}))

const PatientSearchPanel: React.FunctionComponent<{
  initialFilter: IPatientFilterValue
  onSearchSubmit: (filter: IPatientFilterValue) => void
  onPaginationReset?: (event: React.MouseEvent) => void
  onHightlightChange?: (value: string) => void
  name?: string
}> = ({
  initialFilter,
  onSearchSubmit,
  onPaginationReset,
  onHightlightChange,
  name = 'patientSearchPanel',
}) => {
  const classes = useStyles()
  const [filter, setFilter] = useState<IPatientFilterValue>(initialFilter)
  useEffect(() => {
    setFilter(initialFilter)
  }, [initialFilter])

  const handleFilterChange = (type: string, value: any): void => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [type]: value,
    }))
  }

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleFilterChange('searchText', event.target.value)
    if (onHightlightChange) {
      onHightlightChange(event.target.value)
    }
  }

  const handleSearchSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }
    onSearchSubmit(filter)
  }

  const handlePaginationReset = (event: React.MouseEvent) => {
    if (onPaginationReset) {
      onPaginationReset(event)
    }
  }

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <Grid container spacing={3}>
          <Grid container item xs={9}>
            <TextField
              id='standard-basic'
              label='Search'
              margin='normal'
              value={filter.searchText}
              onChange={handleSearchTextChange}
              className={classes.searchBar}
              variant='outlined'
              fullWidth
              placeholder={`Ex Christene`}
              inputProps={{
                'data-testid': 'text-field',
              }}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              // data-testid='text-field'
            />
          </Grid>
          <Grid item xs={3} container alignContent='center'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              endIcon={<SearchIcon></SearchIcon>}
              className={classes.actionButton}
              data-testid='submit-button'
            >
              <Typography variant='body2'>Search</Typography>
            </Button>
            <ColorButton
              variant='contained'
              endIcon={<ClearIcon></ClearIcon>}
              className={classes.actionButton}
              onClick={handlePaginationReset}
              data-testid='reset-button'
            >
              <Typography variant='body2'>Clear</Typography>
            </ColorButton>
          </Grid>
          <Grid container item xs={12}>
            <PatientFilterBar
              filter={filter}
              onFilterChange={handleFilterChange}
            />
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default PatientSearchPanel
