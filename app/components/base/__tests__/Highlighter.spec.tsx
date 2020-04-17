import * as React from 'react'

import { render } from '@testing-library/react'
import Highlighter from '../Highlighter'

describe('<Highlighter />', () => {
  it('render <Highlighter />', () => {
    const text = 'johnDoe'
    const highlightText = 'oh'
    const { queryByTestId } = render(
      <Highlighter highlightText={highlightText} text={text} />,
    )

    const hilightComponent = queryByTestId('1')
    expect(hilightComponent).toBeTruthy()
  })

  it('highlight Correct <Highlighter text="johnDoe" highlightText="oh" />', () => {
    const text = 'johnDoe'
    const highlightText = 'oh'
    const { queryByTestId } = render(
      <Highlighter highlightText={highlightText} text={text} />,
    )

    const hilightComponent = queryByTestId('1')
    expect(hilightComponent).toBeTruthy()
    const hilightComponentStyle = window.getComputedStyle(
      hilightComponent as HTMLElement,
    )
    expect(queryByTestId('0')).toBeTruthy()
    expect(queryByTestId('2')).toBeTruthy()
    expect(queryByTestId('3')).toBeNull()

    expect(hilightComponentStyle.color).toBe('blue')
    expect(hilightComponentStyle.backgroundColor).toBe('yellow')
  })

  it('highlight Correct <Highlighter text="johnDoe" highlightText="awd" />', () => {
    const text = 'johnDoe'
    const highlightText = 'awd'
    const { queryByTestId } = render(
      <Highlighter highlightText={highlightText} text={text} />,
    )

    const hilightComponent = queryByTestId('1')
    expect(hilightComponent).toBeNull()
    expect(queryByTestId('0')).toBeTruthy()
    expect(queryByTestId('2')).toBeNull()
    expect(queryByTestId('3')).toBeNull()
  })

  it('highlight Correct <Highlighter text="johnDoe" highlightText="johnDoe" />', () => {
    const text = 'johnDoe'
    const highlightText = 'johnDoe'
    const { queryByTestId } = render(
      <Highlighter highlightText={highlightText} text={text} />,
    )

    const hilightComponent = queryByTestId('1')
    expect(hilightComponent).toBeTruthy()
    const hilightComponentStyle = window.getComputedStyle(
      hilightComponent as HTMLElement,
    )
    expect(queryByTestId('0')).toBeTruthy()
    expect(queryByTestId('3')).toBeNull()

    expect(hilightComponentStyle.color).toBe('blue')
    expect(hilightComponentStyle.backgroundColor).toBe('yellow')
  })

  it('highlight Correct <Highlighter text="johnDoe" highlightText="JOhND" />', () => {
    const text = 'johnDoe'
    const highlightText = 'JOhND'
    const { queryByTestId } = render(
      <Highlighter highlightText={highlightText} text={text} />,
    )

    const hilightComponent = queryByTestId('1')
    expect(hilightComponent).toBeTruthy()
    const hilightComponentStyle = window.getComputedStyle(
      hilightComponent as HTMLElement,
    )
    expect(queryByTestId('0')).toBeTruthy()
    expect(queryByTestId('3')).toBeNull()

    expect(hilightComponentStyle.color).toBe('blue')
    expect(hilightComponentStyle.backgroundColor).toBe('yellow')
  })
})
