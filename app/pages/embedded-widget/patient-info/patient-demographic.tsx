import { withAuthSync } from '@components/base/Auth'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import PatientDemographic, {
  PatientDemographicWithConnector,
} from '@components/widget/patient/PatientDemographic'
import { CssBaseline, Paper } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import { parse } from '@utils'
import * as _ from 'lodash'
import * as React from 'react'
const PatientInfoPanelWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  return (
    <BootstrapWrapper dependencies={['patient', 'allergy_intolerance']}>
      <>
        <CssBaseline />
        <Paper>
          <div style={{ height: '100vh' }}>
            <PatientDemographicWithConnector
              patientId={_.get(query, 'patientId')}
              name={_.get(query, 'name')}
            />
          </div>
        </Paper>
      </>
    </BootstrapWrapper>
  )
}

PatientInfoPanelWidget.getInitialProps = async ({ req, res, query }) => {
  return {
    query: parse(query),
  }
}

export default withAuthSync(PatientInfoPanelWidget)
