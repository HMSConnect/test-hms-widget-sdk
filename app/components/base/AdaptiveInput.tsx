import * as React from 'react'

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import SelectOption, { IOptionItem } from './SelectOption'

type AdaptiveInputType =
  | 'text'
  | 'number'
  | 'choice'
  | 'boolean'
  // | 'date'
  | 'options'
  | 'checkbox-group'

export interface IAdaptiveInput {
  type: AdaptiveInputType
  name: string
  label: string
  choices?: IOptionItem[]
  group?: any[]
  keyValue?: string
}

const AdaptiveInput: React.FunctionComponent<{
  name: string
  type: AdaptiveInputType
  label: string
  value: any
  id: string
  choices?: IOptionItem[]
  group?: any
  keyValue?: string
  onChange: (type: string, value: any) => void
}> = ({
  name,
  type,
  label,
  value = {},
  id,
  group,
  onChange,
  choices,
  keyValue = name,
}) => {
  switch (type) {
    case 'checkbox-group':
      if (!group || isEmpty(group)) {
        return <Typography variant='body2'>Need group..</Typography>
      }
      const filterMui = value[keyValue]
      return (
        <FormControl component='fieldset'>
          <FormLabel component='legend'>{label}</FormLabel>
          <FormGroup>
            {map(group, (option, index) => (
              <FormControlLabel
                key={`mul-select${index}`}
                control={
                  <Checkbox
                    checked={filterMui[option.name]}
                    onChange={event =>
                      onChange(
                        `selection[${option.name}]`,
                        event.target.checked,
                      )
                    }
                    value={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </FormControl>
      )
    case 'options':
      if (!choices || isEmpty(choices)) {
        return <Typography variant='body2'>Need choices..</Typography>
      }
      return (
        <SelectOption
          label={label}
          labelId={id}
          id={id}
          value={value[keyValue]}
          options={choices}
          data-testid={`adaptive-input-select-option-${name}`}
          onChange={(
            event: React.ChangeEvent<{ name?: string; value: unknown }>,
          ) => {
            onChange(name, event.target.value)
          }}
          fullwidth
        />
      )
    case 'boolean':
      return (
        <FormControlLabel
          control={
            <Switch
              checked={value[keyValue]}
              onChange={event => onChange(name, event.target.checked)}
              color='primary'
              data-testid={`adaptive-input-boolean-${name}`}
            />
          }
          label={label}
        />
      )
    case 'number':
      return (
        <TextField
          id={id}
          label={label}
          fullWidth
          variant='outlined'
          value={value[keyValue]}
          onChange={event => onChange(name, event.target.value)}
          type='number'
          inputProps={{
            'data-testid': `adaptive-input-number-${name}`,
          }}
        />
      )
    case 'text':
      return (
        <TextField
          id={id}
          label={label}
          fullWidth
          variant='outlined'
          value={value[keyValue]}
          onChange={event => onChange(name, event.target.value)}
          inputProps={{
            'data-testid': `adaptive-input-text-${name}`,
          }}
        />
      )
    default:
      return (
        <TextField
          id={id}
          label={label}
          fullWidth
          variant='outlined'
          value={value[keyValue]}
          onChange={event => onChange(name, event.target.value)}
          inputProps={{
            'data-testid': `adaptive-input-default-${name}`,
          }}
        />
      )
  }
}

export default AdaptiveInput
