import React, { useEffect, useState } from 'react'

import { Grid, makeStyles, Theme } from '@material-ui/core'
import { GoogleAnalytics } from '@services/GoogleAnalyticsService'
import { sendMessage } from '@utils'
import get from 'lodash/get'
import routes from '../../../routes'
import { default as RouteManager } from '../../../routes/RouteManager'
import { IPageOptionResult } from '../../base/Pagination'
import { IPaginationOption, ISortType } from '../../hooks/usePatientList'
import { IPatientFilterValue } from '../../templates/patient/PatientFilterBar'
import PatientSearchPanel from './PatientSearchPanel'
import PatientSearchResultWithPaginate from './PatientSearchResultWithPaginate'

const useStyles = makeStyles((theme: Theme) => ({
  bottom: {
    bottom: '1em',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  root: {},
}))

const PatientSearch: React.FunctionComponent<{
  query: IPaginationOption
  name?: string
}> = ({ query, name = 'patientSearch' }) => {
  const classes = useStyles()
  const [highlightText, setHighlightText] = useState<string>(
    get(query, 'filter.searchText') ? get(query, 'filter.searchText') : '',
  )
  const [pagination, setPagination] = useState<IPaginationOption>(query)

  useEffect(() => {
    setPagination(query)
    if (get(query, 'filter.searchText')) {
      setHighlightText(get(query, 'filter.searchText'))
    }
  }, [query])

  const handleSearchSubmit = (filter: IPatientFilterValue) => {
    const newPagination = {
      ...pagination,
      filter,
      offset: 0,
      page: 0,
      sort: pagination.sort,
    }

    const path = RouteManager.getPath('patient-search', {
      matchBy: 'url',
      params: newPagination,
    })

    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handleSearchSubmit',
      name,
      params: newPagination,
      path,
    })

    routes.Router.replaceRoute(path)
  }

  const handleHighlightChange = (value: string) => {
    setHighlightText(value)
  }

  const handleRequestSort = (sortObject: ISortType) => {
    const newPagination = {
      ...pagination,
      filter: pagination.filter,
      sort: sortObject,
    }

    const path = RouteManager.getPath('patient-search', {
      matchBy: 'url',
      params: newPagination,
    })

    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handleRequestSort',
      name,
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

    const path = RouteManager.getPath('patient-search', {
      matchBy: 'url',
      params: newPagination,
    })
    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handlePageChange',
      name,
      params: newPagination,
      path,
    })

    routes.Router.replaceRoute(path)
  }

  const handlePatientSelect = (patient: any) => {
    const params = {
      patientId: get(patient, 'identifier.id.value'),
    }
    const path = RouteManager.getPath(`prepare/patient-summary`, {
      matchBy: 'url',
      params,
    })
    sendMessage({
      action: 'PUSH_ROUTE',
      message: 'handlePatientSelect',
      name,
      params,
      path,
    })
    GoogleAnalytics.createEvent({
      action: 'select_patient',
      category: 'patient_search',
      label: `${get(patient, 'identifier.id.value')}`,
    })
    routes.Router.pushRoute(path)
  }

  const handlePaginationReset = (event: React.MouseEvent) => {
    const path = RouteManager.getPath(`patient-search`, {
      matchBy: 'url',
    })
    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handlePaginationReset',
      name,
      params: null,
      path,
    })

    routes.Router.replaceRoute(path)
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PatientSearchPanel
            initialFilter={pagination.filter}
            onSearchSubmit={handleSearchSubmit}
            onPaginationReset={handlePaginationReset}
            onHightlightChange={handleHighlightChange}
            name={`${name}SearchBar`}
          />
        </Grid>
        <PatientSearchResultWithPaginate
          highlightText={highlightText}
          paginationOption={pagination}
          onPatientSelect={handlePatientSelect}
          onPageChange={handlePageChange}
          onRequestSort={handleRequestSort}
          name={`${name}SearchResult`}
        />
      </Grid>
    </>
  )
}

export default PatientSearch
