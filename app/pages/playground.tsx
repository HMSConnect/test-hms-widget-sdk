import BootstrapWrapper from '@components/init/BootstrapWrapper'
import * as React from 'react'
import useImagingStudyList from '@components/hooks/useImagingStudyList'
import useClaimList from '@components/hooks/useClaimList'

export default function Playground() {
  return (
    <BootstrapWrapper
      dependencies={['allergy_intolerance', 'observation', 'claim']}
    >
      <div>
        <List />
      </div>
    </BootstrapWrapper>
  )
}

function List() {
  const date = new Date('2020-01-01')
  const { data } = useClaimList({
    filter: {
      billablePeriodStart_lt: date.toISOString(),
      patientId: '6d615362-bcbd-4b31-9240-ad3b0c19f0b1',
    },
  })

  return <div>{JSON.stringify(data, null, 2)}</div>
  // return <div></div>
}
