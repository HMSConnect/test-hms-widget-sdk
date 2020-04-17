import * as React from 'react'

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GenderSelector from '../GenderSelecter'

describe('PatientFilterBar', () => {
  it('render <PatientFilterBar />', () => {
    const value = 'male'
    const onGenderChange = jest.fn()
    const { findAllByText } = render(
      <GenderSelector value={value} onGenderChange={onGenderChange} />,
    )
    expect(findAllByText('male')).toBeTruthy()
  })

  it('change value <PatientFilterBar />', async () => {
    const value = 'male'
    const onGenderChange = jest.fn()
    const { findAllByText, getByTestId, getByText, getAllByText } = render(
      <GenderSelector value={value} onGenderChange={onGenderChange} />,
    )
    userEvent.click(getByText('Male'))
    userEvent.click(getByText('Female'))
    expect(onGenderChange).toBeCalled()
    expect(onGenderChange.mock.calls[0][1]).toBe('female')
  })
})
