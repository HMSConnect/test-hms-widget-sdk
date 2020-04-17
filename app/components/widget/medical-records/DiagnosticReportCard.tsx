import * as React from 'react'

import AdaptiveCard from '@components/base/AdaptiveCard'
import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import { useModal } from '@components/base/Modal'
import useDiagnosticReportList from '@components/hooks/useDiagnosticReportList'
import useLastDiagnosticReport from '@components/hooks/useLastDiagnosticReport'
import disgnosticReportTemplate from '@components/templates/adaptive-card/disgnosticReport.template.json'
import { IDiagnosticReportFilterQuery } from '@data-managers/DiagnosticReportDataManager'
import { Paper } from '@material-ui/core'
import { parse } from '@utils'
import * as _ from 'lodash'
import { useRouter } from 'next/router'
import { stringify } from 'qs'
import DiagnosticReportModalContent from './DiagnosticReportModalContent'

const DiagnosticReportCard: React.FunctionComponent<any> = () => {
  const { query: routerQuery } = useRouter()
  const query = parse(stringify(routerQuery))

  const params = {
    encounterId: query.encounterId,
    id: query.id,
    patientId: query.patientId,
  } as IDiagnosticReportFilterQuery
  const useDiagnostic =
    query.isLast === undefined
      ? useLastDiagnosticReport
      : query.isLast
      ? useLastDiagnosticReport
      : useDiagnosticReportList

  const { isLoading, data: diagnostic, error } = useDiagnostic({
    filter: params || {},
    withObservation: true,
  })

  const { showModal, renderModal } = useModal(DiagnosticReportModalContent, {
    fullScreen: true,
    modalTitle: 'Diagnostic Report List',
    name: `${name}Modal`,
  })

  if (error) {
    return <ErrorSection error={error} />
  }

  if (isLoading) {
    return <LoadingSection />
  }

  return (
    <>
      <DiagnosticReportCardView
        onClick={showModal}
        diagnostic={_.isArray(diagnostic) ? diagnostic[0] : diagnostic}
      />
      {renderModal}
    </>
  )
}

export const DiagnosticReportCardWithoutModal: React.FunctionComponent<any> = () => {
  const { query: routerQuery } = useRouter()
  const query = parse(stringify(routerQuery))
  const params = {
    encounterId: query.encounterId,
    id: query.id,
    patientId: query.patientId,
  } as IDiagnosticReportFilterQuery

  const useDiagnostic = query.isLast
    ? useLastDiagnosticReport
    : useDiagnosticReportList

  const { isLoading, data: diagnostic, error } = useDiagnostic({
    filter: params || {},
    withObservation: true,
  })
  if (error) {
    return <ErrorSection error={error} />
  }

  if (isLoading) {
    return <LoadingSection />
  }

  return (
    <>
      <DiagnosticReportCardView
        diagnostic={_.isArray(diagnostic) ? diagnostic[0] : diagnostic}
        isShowAction={false}
      />
    </>
  )
}

export const DiagnosticReportCardView: React.FunctionComponent<any> = ({
  templatePayload,
  diagnostic,
  isShowAction = true,
  onClick,
}) => {
  const data = {
    issued: _.get(diagnostic, 'issued'),
    results: _.map(_.get(diagnostic, 'result'), observation => {
      return {
        display: observation.display,
        // iconUrl:
        //   'https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg',
        unit: observation.unit,
        value: `${observation.value}`,
      }
    }),
    title: _.get(diagnostic, 'codeText'),
  }
  return (
    <Paper style={{ height: '100%', overflowY: 'auto' }}>
      <AdaptiveCard
        data={{
          ...data,
          isShowAction,
        }}
        templatePayload={templatePayload}
        onExecuteAction={onClick}
      />
    </Paper>
  )
}

DiagnosticReportCardView.defaultProps = {
  templatePayload: disgnosticReportTemplate,
}

export default DiagnosticReportCard
