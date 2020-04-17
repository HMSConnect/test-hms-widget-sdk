import AdaptiveInput from '@components/base/AdaptiveInput'
import SelectOption from '@components/base/SelectOption'
import { IWidgetPatameter } from '@config'
import {
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import _ from 'lodash'
import React from 'react'

const WidgetManagerParameter: React.FC<{
  parameters: any
  selectedWidget: any
  onParameterChange: (type: string, value: any) => void
  label?: string
  type?: string
}> = ({
  parameters,
  selectedWidget,
  onParameterChange,
  label = 'Query Params',
  type = 'queryParams',
}) => {
  if (_.isEmpty(selectedWidget[type] || _.isEmpty(parameters))) {
    return null
  }
  return (
    <>
      <Typography variant='h5'>{label}</Typography>
      <br />
      {_.map(selectedWidget[type], (parameter, index) => (
        <React.Fragment key={`${parameter.value}parameters${index}`}>
          <AdaptiveInput
            name={`${parameter.value}`}
            type={parameter.type}
            label={parameter.label}
            value={parameters}
            id={`${parameter.value} ${index}`}
            onChange={onParameterChange}
            choices={parameter.choices}
          />
          <br />
          <br />
        </React.Fragment>
      ))}
    </>
  )
}

export default WidgetManagerParameter
