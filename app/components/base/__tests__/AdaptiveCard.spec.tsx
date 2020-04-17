import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'
import templatePayload from '../__mocks__/mock.template.json'
import AdaptiveCard from '../AdaptiveCard'

describe('<AdaptiveCard />', () => {
  it('render <AdaptiveCard />', () => {
    const { findAllByText } = render(
      <AdaptiveCard
        templatePayload={templatePayload}
        data={{
          title: 'title',
        }}
      />,
    )
    expect(findAllByText('title')).toBeTruthy()
  })

  // it('should click submit and response to onExecuteAction', () => {
  //   const onExecuteAction = jest.fn()

  //   const { getByText } = render(
  //     <AdaptiveCard
  //       templatePayload={templatePayload}
  //       data={{
  //         title: 'title',
  //       }}
  //       onExecuteAction={onExecuteAction}
  //     />,
  //   )

  //   fireEvent.click(getByText('Show All'))
  //   expect(onExecuteAction).toBeCalled()
  // })

  it('should error when data or template payload empty', () => {
    const onExecuteAction = jest.fn()

    const { getByTestId } = render(
      <AdaptiveCard
        templatePayload={templatePayload}
        data={{}}
        onExecuteAction={onExecuteAction}
      />,
    )

    expect(getByTestId('adaptive-card-error')).toBeTruthy()
  })
})
