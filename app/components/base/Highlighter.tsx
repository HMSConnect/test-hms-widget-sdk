import * as React from 'react'

import map from 'lodash/map'
import split from 'lodash/split'

const Highlighter: React.FunctionComponent<{
  highlightText: string
  text: string
}> = ({ highlightText, text }) => {
  const charecters = split(text, new RegExp(`(${highlightText})`, 'gi'))
  return (
    <>
      {map(charecters, (part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlightText.toLowerCase()
              ? { color: 'blue', backgroundColor: 'yellow' }
              : {}
          }
          data-testid={i + ''}
        >
          {part}
        </span>
      ))}
    </>
  )
}

export default Highlighter
