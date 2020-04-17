import React, { useEffect, useState } from 'react'

import { withAuthSync } from '@components/base/Auth'
import { IPageOptionResult } from '@components/base/Pagination'
import Tracker from '@components/base/Tracker'
import { IPaginationOption, ISortType } from '@components/hooks/usePatientList'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import { IPatientFilterValue } from '@components/templates/patient/PatientFilterBar'
import PatientSearchResultWithPaginate, {
  defaultPagination,
} from '@components/widget/patient/PatientSearchResultWithPaginate'
import { CssBaseline, makeStyles, Theme } from '@material-ui/core'
import { IStatelessPage } from '@pages/patient-search'
import RouteManager from '@routes/RouteManager'
import { GoogleAnalytics } from '@services/GoogleAnalyticsService'
import { parse, sendMessage } from '@utils'
import * as _ from 'lodash'
import routes from '../../routes'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

const PatientSearchResultWidget: IStatelessPage<{
  query: any
}> = ({ query }) => {
  const classes = useStyles()

  const [pagination, setPagination] = useState<IPaginationOption>(query)

  useEffect(() => {
    setPagination(query)
  }, [query])

  const handleRequestSort = (sortObject: ISortType) => {
    const newPagination = {
      ...pagination,
      filter: pagination.filter,
      sort: sortObject,
    }

    const path = RouteManager.getPath('patient-search-result', {
      matchBy: 'url',
      params: newPagination,
    })

    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handleRequestSort',
      name: _.get(query, 'name') || 'patientSearchResult',
      params: newPagination,
      path,
    })

    routes.Router.replaceRoute(path)
  }

  const handlePageChange = (pageOptionResult: IPageOptionResult) => {
    const newPagination = {
      ...pageOptionResult,
      filter: pagination.filter,
      sort: pagination.sort,
    }

    const path = RouteManager.getPath('patient-search-result', {
      matchBy: 'url',
      params: newPagination,
    })

    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handlePageChange',
      name: _.get(query, 'name') || 'patientSearchResult',
      params: newPagination,
      path,
    })

    routes.Router.replaceRoute(path)
  }

  const handlePatientSelect = (patient: any) => {
    const params = {
      patientId: _.get(patient, 'identifier.id.value'),
    }
    GoogleAnalytics.createEvent({
      action: 'Select Patient',
      category: 'Select Patient',
      label: params.patientId,
    })
    const path = RouteManager.getPath(`prepare/patient-summary`, {
      matchBy: 'url',
      params,
    })

    sendMessage({
      action: 'PUSH_ROUTE',
      message: 'handlePatientSelect',
      name: _.get(query, 'name') || 'patientSearchResult',
      params,
      path,
    })

    routes.Router.pushRoute(path)
  }

  return (
    <BootstrapWrapper dependencies={['patient']}>
      <Tracker>
        <>
          <CssBaseline />
          <PatientSearchResultWithPaginate
            paginationOption={pagination}
            onRequestSort={handleRequestSort}
            onPageChange={handlePageChange}
            onPatientSelect={handlePatientSelect}
          />
        </>
      </Tracker>
    </BootstrapWrapper>
  )
}

PatientSearchResultWidget.getInitialProps = async ({ query }) => {
  return {
    query: initialPagination(query),
  }
}

export function initialPagination(query: any) {
  const initialFilter: IPatientFilterValue = {
    gender: 'all',
    searchText: '',
  }

  const initialSort: ISortType = {
    order: 'asc',
    orderBy: 'id',
  }

  query = parse(query)
  return {
    filter: _.isEmpty(query.filter) ? initialFilter : query.filter,
    max: query.max ? Number(query.max) : defaultPagination.max,
    offset: query.offset ? Number(query.offset) : defaultPagination.offset,
    page: query.page ? Number(query.page) : defaultPagination.page,
    sort: _.isEmpty(query.sort) ? initialSort : query.sort,
  }
}

export default withAuthSync(PatientSearchResultWidget)
// export default PatientSearchResultWidget
