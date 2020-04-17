import * as React from 'react'

import { GoogleAnalytics } from '@services/GoogleAnalyticsService'
import { render } from '@testing-library/react'
import ComponentMock from '../__mocks__/ComponentMock'
import userEvent from '@testing-library/user-event'
import TrackerMouseClick from '../TrackerMouseClick'

describe('<TrackMouseClick />', () => {
  it('render TrackMouseClick', async () => {
    const googleAnalyticTrackpageFn = jest.fn()
    jest.spyOn(GoogleAnalytics, 'createEvent').mockImplementation(param => {
      googleAnalyticTrackpageFn(param)
    })
    const { getByText } = render(
      <TrackerMouseClick category='testClick'>
        <div style={{ height: '100%' }}>
          <ComponentMock title='test click' />
        </div>
      </TrackerMouseClick>,
    )
    userEvent.click(getByText('test click'))
    expect(googleAnalyticTrackpageFn).toHaveBeenCalled()
    expect(googleAnalyticTrackpageFn.mock.calls[0][0].category).toStrictEqual(
      'testClick',
    )
  })
})
