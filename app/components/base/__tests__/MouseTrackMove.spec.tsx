import * as React from 'react'
import { GoogleAnalytics } from '@services/GoogleAnalyticsService'
import { render, fireEvent, wait, act } from '@testing-library/react'
import routes from '../../../routes'
import MouseTrackMove from '../MouseTrackMove'
import { async } from 'rxjs/internal/scheduler/async'
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
// jest.mock('window', () => ({
//   __esModule: true,
//   default: {
//     location: {
//       pathname: 'test',
//       reload: jest.fn(),
//     },
//   },
// }))
jest.useFakeTimers()
describe('<Tracker />', () => {
  // beforeAll(() => {
  //   jest.spyOn(window.location.pathname, 'adawd')
  // })
  it('render <Tracker />', async () => {
    const googleAnalyticTrackpageFn = jest.fn()
    jest.spyOn(GoogleAnalytics, 'createEvent').mockImplementation(param => {
      googleAnalyticTrackpageFn(param)
    })
    const { getByText } = render(
      <div style={{ width: '400px', height: '400px' }}>
        <MouseTrackMove category='test'>
          <>
            <div style={{ width: '100%', height: '200px' }}>box1</div>
            <div style={{ width: '100%', height: '200px' }}>box2</div>
          </>
        </MouseTrackMove>
        ,
      </div>,
    )
    // getByText('awdawd')
    // expect(googleAnalyticTrackpageFn).toHaveBeenCalled()
    act(() => {
      fireEvent.mouseMove(getByText('box1'))
      jest.runAllTimers()
    })

    act(() => {
      fireEvent.mouseMove(getByText('box2'))
      jest.runAllTimers()
    })
    // expect(false).toBeTruthy()
    expect(googleAnalyticTrackpageFn).toHaveBeenCalled()
    // expect(googleAnalyticTrackpageFn.mock.calls[0][0]).toStrictEqual('test')
  })
})
