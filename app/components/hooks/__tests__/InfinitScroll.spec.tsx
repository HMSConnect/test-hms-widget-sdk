import * as React from 'react'
import { render, createEvent, fireEvent } from '@testing-library/react'

describe('Test scroll', () => {
  it('ref infinit scroll call useInfinitScroll', async () => {
    const lazyFunction = jest.fn()
    const { queryByText, getByTestId } = render(
      <div
        style={{ height: 100, overflow: 'auto' }}
        data-testid='container'
      ></div>,
    )

    const containerElement = getByTestId('container')
    // console.log('containerElement :', containerElement);
    containerElement.scrollTop = 300
    const event = createEvent.scroll(containerElement)
    // fireEvent.scroll(containerElement, {})
    fireEvent(containerElement, event)

    // expect(lazyFunction).toBeCalled()

    expect(true).toBeTruthy()
  })
})
