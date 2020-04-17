import * as React from 'react'

import { Grid, makeStyles, Theme } from '@material-ui/core'
import map from 'lodash/map'
import AdaptiveInput, { IAdaptiveInput } from './AdaptiveInput'

const useStyles = makeStyles((theme: Theme) => ({
  inputField: {
    padding: theme.spacing(0.5),
  },
  root: {},
}))
const TableFilterPanel: React.FC<{
  filter: any
  onParameterChange: (type: string, value: any) => void
  filterOptions: IAdaptiveInput[]
  onSearchSubmit: (event: React.FormEvent, filter: any) => void
  containerStyles?: any
}> = ({
  filter,
  filterOptions,
  onSearchSubmit,
  onParameterChange,
  containerStyles,
}) => {
  const classes = useStyles()
  return (
    <form
      style={containerStyles}
      onSubmit={(event: React.FormEvent) => onSearchSubmit(event, filter)}
    >
      <Grid container>
        {map(filterOptions, (option, index) => (
          <Grid
            className={classes.inputField}
            item
            xs={12}
            key={`container ${option.name} ${index}`}
          >
            <AdaptiveInput
              name={option.name}
              type={option.type}
              label={option.label}
              value={filter}
              id={`${option.name}-${index}`}
              onChange={onParameterChange}
              choices={option.choices}
              group={option.group}
            />
          </Grid>
        ))}
      </Grid>
    </form>
  )
}

export default TableFilterPanel
