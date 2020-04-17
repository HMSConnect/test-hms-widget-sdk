import * as React from 'react'

import { render } from '@testing-library/react'

import SelectOption from '../SelectOption'

describe('<SelectOption />', () => {
  it('render <SelectOption />', () => {
    const label = 'Gender'
    const labelId = 'gender-select'
    const id = 'gender-select'
    const options = [
      { value: 'all', label: 'All' },
      { value: 'male', label: 'Male' }
    ]
    const onChange = jest.fn()
    const { findAllByText } = render(
      <SelectOption
        label={label}
        labelId={labelId}
        id={id}
        value='male'
        options={options}
        onChange={onChange}
      />
    )
    expect(findAllByText('male')).toBeTruthy()
  })
})
