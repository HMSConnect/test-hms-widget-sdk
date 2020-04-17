import * as React from 'react'

import { GoogleAnalytics } from '@services/GoogleAnalyticsService'
import { render } from '@testing-library/react'
import Tracker from '../Tracker'

jest.mock('../../../routes', () => ({
  __esModule: true,
  default: {
    Router: {
      router: {
        pathname: 'test',
      },
    },
  },
}))

describe('<Tracker />', () => {
  it('render <Tracker />', () => {
    const googleAnalyticTrackpageFn = jest.fn()
    jest.spyOn(GoogleAnalytics, 'trackPage').mockImplementation(param => {
      googleAnalyticTrackpageFn('test', {})
    })
    render(<Tracker></Tracker>)
    expect(googleAnalyticTrackpageFn).toHaveBeenCalled()
  })
})
