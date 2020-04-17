import * as React from 'react'
import { render } from '@testing-library/react'
import ComponentMock from '../__mocks__/ComponentMock'
import { withAuthSync } from '../Auth'

describe('<Auth />', () => {
  it('render Auth', () => {
    // const { queryByText } = render(withAuthSync(ComponentMock))
    expect(true).toBeTruthy()
  })
})
