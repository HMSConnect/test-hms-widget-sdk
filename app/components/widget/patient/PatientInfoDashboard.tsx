import React from 'react'

import { Grid } from '@material-ui/core'
import PatientAllergySummerCard from './PatientAllergySummaryCard'
import PatientImmunizationSummerCard from './PatientImmunizationSummaryCard'

const PatientInfoDashboard: React.FunctionComponent<any> = () => {
  return (
    <div style={{ padding: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <PatientAllergySummerCard
            patientId={'6f8f470e-07e8-4273-ad11-6e3fdc384a09'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PatientImmunizationSummerCard
            patientId={'6f8f470e-07e8-4273-ad11-6e3fdc384a09'}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <PatientAllergySummerCard
            patientId={'6f8f470e-07e8-4273-ad11-6e3fdc384a09'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PatientImmunizationSummerCard
            patientId={'6f8f470e-07e8-4273-ad11-6e3fdc384a09'}
          />
        </Grid> */}
      </Grid>
    </div>
  )
}

export default PatientInfoDashboard
