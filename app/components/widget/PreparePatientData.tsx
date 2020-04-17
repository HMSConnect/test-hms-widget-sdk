import * as React from 'react'

import LoadingSection from '@components/base/LoadingSection'
import useEncounterList from '@components/hooks/useEncounterList'
import RouteManager from '@routes/RouteManager'
import { sendMessage } from '@utils'
import * as _ from 'lodash'
import routes from '../../routes'

const PreparePatientData: React.FunctionComponent<any> = ({ query }) => {
  const {
    isLoading: isPatientLoading,
    data: encounter,
    error,
  } = useEncounterList({
    filter: { patientId: _.get(query, 'patientId') },
    max: 1,
    withOrganization: true,
  })

  React.useEffect(() => {
    if (!isPatientLoading && encounter) {
      const newParams = {
        encounterId: _.get(encounter[0], 'id'),
        patientId: _.get(query, 'patientId'),
      }
      const path = RouteManager.getPath(`patient-summary`, {
        matchBy: 'url',
        params: newParams,
      })
      sendMessage({
        action: 'REPLACE_ROUTE',
        message: 'handleEncounterSelect',
        params: newParams,
        path,
      })
      routes.Router.ready(() => {
        routes.Router.replaceRoute(path)
      })
      // setTimeout(() => {
      //   console.log('routes.Router :', routes.Router)
      // }, 1000)
      // routes.Router.replace(path)
      // routes.Router.replaceRoute('/embedded-widget')
      // routes.Router.replaceRoute('/patient-summary', newParams)
    }
  }, [encounter, isPatientLoading])
  return <LoadingSection />
}

export default PreparePatientData
