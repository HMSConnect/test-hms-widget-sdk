import React, { useEffect, useState } from 'react'

import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
} from '@material-ui/core'

export interface IOptionItem {
  value: any
  label: string
}

const SelectOption: React.FunctionComponent<{
  label: string
  labelId: string
  id: string
  value: any
  options: IOptionItem[]
  onChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => void
  classOption?: any
  fullwidth?: boolean
}> = ({
  label,
  value,
  options,
  labelId,
  id,
  onChange,
  classOption,
  fullwidth = false,
}) => {
  const [labelWidth, setLabelWidth] = useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth)
  }, [])

  const inputLabel = React.useRef<HTMLLabelElement>(null)
  return (
    <FormControl
      variant='outlined'
      style={{ width: fullwidth ? '100%' : '' }}
      className={classOption}
      data-testid={`form-controll-select-option-label-${labelId}`}
    >
      <InputLabel
        ref={inputLabel}
        id={labelId}
        data-testid={`select-option-label-${labelId}`}
      >
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        onChange={onChange}
        variant='outlined'
        labelWidth={labelWidth}
        data-testid={`select-option-${id}`}
        inputProps={{
          'data-testid': `select-option-input-${id}`,
        }}
      >
        {options.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value}>
              <Typography variant='body2'>{item.label}</Typography>
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default SelectOption
