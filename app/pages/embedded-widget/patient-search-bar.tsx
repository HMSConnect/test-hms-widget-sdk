import * as React from 'react'

import Tracker from '@components/base/Tracker'
import { IPaginationOption } from '@components/hooks/usePatientList'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import { IPatientFilterValue } from '@components/templates/patient/PatientFilterBar'
import PatientSearchPanel from '@components/widget/patient/PatientSearchPanel'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import RouteManager from '@routes/RouteManager'
import { HMSService } from '@services/HMSServiceFactory'
import PatientService from '@services/PatientService'
import { parse, sendMessage } from '@utils'
import * as _ from 'lodash'
import qs from 'qs'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientSearchBarWidget: IStatelessPage<{
  initialQuery: any
  query: any
}> = ({ initialQuery, query }) => {
  const classes = useStyles()

  const [pagination, setPagination] = React.useState<IPaginationOption>(query)

  React.useEffect(() => {
    const path = RouteManager.getPath('patient-search-bar')
    fetchPatientList(query).then(result => {
      sendMessage({
        message: 'initialize',
        name: _.get(query, 'name') || 'patientSearchBar',
        params: query,
        path: `${path}?${qs.stringify(query)}`,
        result,
      })
    })
    setPagination(query)
  }, [query])

  function fetchPatientList(options: any) {
    const patientService = HMSService.getService('patient') as PatientService
    return patientService.list(options)
  }

  const handleSearchSubmit = (filter: IPatientFilterValue) => {
    const newPagination = {
      ...pagination,
      filter,
    }
    const path = RouteManager.getPath('patient-search-bar', {
      matchBy: 'url',
      params: newPagination,
    })

    fetchPatientList(newPagination).then(result => {
      sendMessage({
        message: 'handleSearchSubmit',
        name: _.get(query, 'name') || 'patientSearchBar',
        params: newPagination,
        path,
        result,
      })
      setPagination(newPagination)
    })
  }

  const handlePaginationReset = (event: React.MouseEvent) => {
    const newPagination = initialQuery
    const path = RouteManager.getPath('patient-search-bar', {
      matchBy: 'url',
      params: newPagination,
    })

    fetchPatientList(newPagination).then(result => {
      sendMessage({
        message: 'handlePaginationReset',
        name: _.get(query, 'name') || 'patientSearchBar',
        params: newPagination,
        path,
        result,
      })
      setPagination(initialQuery)
    })
  }

  return (
    <BootstrapWrapper dependencies={['patient']}>
      <Tracker>
        <>
          <CssBaseline />
          <PatientSearchPanel
            initialFilter={pagination.filter}
            onSearchSubmit={handleSearchSubmit}
            onPaginationReset={handlePaginationReset}
          />
        </>
      </Tracker>
    </BootstrapWrapper>
  )
}

PatientSearchBarWidget.getInitialProps = async ({ req, res, query }) => {
  const initialFilter: IPatientFilterValue = {
    gender: 'all',
    searchText: '',
  }

  const initialQuery = { filter: initialFilter, max: 10, offset: 0, page: 1 }

  return {
    initialQuery,
    query: {
      ...initialQuery,
      ...parse(query),
    },
  }
}

export default PatientSearchBarWidget
