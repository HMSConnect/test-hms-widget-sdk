import * as React from 'react'

import AdaptiveCard from '@components/base/AdaptiveCard'
import ErrorSection from '@components/base/ErrorSection'
import LoadingSection from '@components/base/LoadingSection'
import useAllergyIntoleranceList from '@components/hooks/useAllergyIntoleranceList'
import allergyIntolerance from '@components/templates/adaptive-card/allergy.template.json'
import { IAllergyIntoleranceListFilterQuery } from '@data-managers/AllergyIntoleranceDataManager'
import { Paper } from '@material-ui/core'
import { parse } from '@utils'
import get from 'lodash/get'
import map from 'lodash/map'
import { useRouter } from 'next/router'
import { stringify } from 'qs'

export const AllergyIntoleranceCard: React.FunctionComponent<any> = () => {
  const { query: routerQuery } = useRouter()
  const query = parse(stringify(routerQuery))
  const params = {
    encounterId: query.encounterId,
    patientId: query.patientId,
  } as IAllergyIntoleranceListFilterQuery

  const { isLoading, data: allergyList, error } = useAllergyIntoleranceList(
    {
      filter: params || {},
      max: get(query, 'max') || 20,
    },
    ['patientId'],
  )

  const myscroll = React.useRef<HTMLDivElement | null>(null)

  if (error) {
    return <ErrorSection error={error} />
  }

  if (isLoading) {
    return <LoadingSection />
  }
  return (
    <>
      <AllergyIntoleranceCardView
        scrollRef={myscroll}
        allergyList={allergyList}
        isShowAction={false}
      />
    </>
  )
}

export const AllergyIntoleranceCardView: React.FunctionComponent<any> = ({
  templatePayload,
  allergyList,
  isShowAction = true,
  onClick,
  scrollRef,
}) => {
  const data = {
    results: map(allergyList, allergy => {
      let styleCriticality
      switch (allergy.criticality) {
        case 'low':
          styleCriticality = 'Defalut'
          break
        case 'high':
          styleCriticality = 'Warning'
          break
        case 'unable-to-assess':
          styleCriticality = 'Attention'
          break
        default:
          styleCriticality = 'Defalut'
          break
      }

      return {
        assertedDate: get(allergy, 'assertedDateText'),
        category: get(allergy, 'category'),
        criticality: styleCriticality,
        display: get(allergy, 'codeText'),
      }
    }),
    title: `Allergy`,
  }
  return (
    <Paper ref={scrollRef} style={{ height: '100%', overflowY: 'auto' }}>
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

AllergyIntoleranceCardView.defaultProps = {
  templatePayload: allergyIntolerance,
}

export default AllergyIntoleranceCard
