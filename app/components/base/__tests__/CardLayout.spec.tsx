import * as React from 'react'

import { render } from '@testing-library/react'
import CardLayout, { CardHeader } from '../CardLayout'

describe('<CardLayout />', () => {
  it('render CardLayout', () => {
    const { queryByText } = render(<CardLayout header='Test Header' />)

    expect(queryByText('Test Header')).toBeTruthy()
  })
  it('render CardHeader', () => {
    const { queryByText } = render(<CardHeader />)

    expect(queryByText('Header')).toBeTruthy()
  })
})
