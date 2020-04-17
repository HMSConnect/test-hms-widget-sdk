import * as React from 'react'

import useDiagnosticReportList from '@components/hooks/useDiagnosticReportList'
import DiagReportPatientData from '@components/templates/DiagReportPatientData'
import { IDiagnosticReportFilterQuery } from '@data-managers/DiagnosticReportDataManager'
import { Grid } from '@material-ui/core'
import map from 'lodash/map'
import { useRouter } from 'next/router'
import { DiagnosticReportCardView } from './DiagnosticReportCard'

const DiagnosticReportModalContent: React.FunctionComponent<any> = ({}) => {
  const { query } = useRouter()
  const params = {
    encounterId: query.encounterId,
    patientId: query.patientId,
  } as IDiagnosticReportFilterQuery

  const { isLoading, data: diagnosticReportList } = useDiagnosticReportList({
    filter: params,
    withObservation: true,
  })

  if (isLoading) {
    return <div> loading ...</div>
  }

  return (
    <Grid item xs={12}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <DiagReportPatientData diagReportList={diagnosticReportList} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Grid
            container
            spacing={3}
            style={{
              height: '80vh',
              overflowY: 'auto',
            }}
          >
            {map(diagnosticReportList, (diagnosticReport, index) => {
              return (
                <div style={{ margin: 8, width: '100%' }} key={index}>
                  <DiagnosticReportCardView
                    diagnostic={diagnosticReport}
                    isShowAction={false}
                  />
                </div>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DiagnosticReportModalContent
