import * as React from 'react'

const ComponentMock: React.FunctionComponent<{
  title?: any
}> = ({ title = 'Test' }) => {
  return (
    <div>
      <p>{title}</p>
    </div>
  )
}

export default ComponentMock
