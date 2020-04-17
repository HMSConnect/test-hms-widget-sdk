import React from 'react'

import {
  tableWithFilterReducer,
  tableWithFilterState,
} from '@app/reducers/tableWithFilter.reducer'
import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import ErrorSection from '@components/base/ErrorSection'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import {
  IProcedureListFilterQuery,
  mergeWithProcedureInitialFilterQuery,
} from '@data-managers/ProcedureDataManager'
import { Icon, makeStyles, Theme } from '@material-ui/core'
import { HMSService } from '@services/HMSServiceFactory'
import ProcedureService from '@services/ProcedureService'
import { countFilterActive, sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
  tableWrapper: {
    ['& .MuiTableCell-stickyHeader']: {
      top: 30,
    },
    flex: 1,
  },
  toolbar: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
}))

export interface IBodyCellProp {
  align: 'right' | 'left' | 'center'
  id: string
  styles?: any
}

export interface ITableCellProp {
  headCell: IHeaderCellProps
  bodyCell: IBodyCellProp
}

export const PatientProcedureTableWithConnector: React.FunctionComponent<any> = () => {
  const state = useSelector((state: any) => state.patientProcedureTable)
  return (
    <PatientProcedureTable
      patientId={_.get(state, 'patientId')}
      mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
      max={_.get(state, 'max')}
      initialFilter={_.get(state, 'initialFilter')}
      isInitialize={true}
    />
  )
}

const PatientProcedureTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  isContainer?: boolean
  max?: number
  initialFilter?: IProcedureListFilterQuery
  name?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  resourceList,
  patientId,
  isInitialize,
  max = 20,
  isContainer = true,
  initialFilter: customInitialFilter = {
    code: '',
    patientId,
    periodStart_lt: undefined,
  },
  name = 'patientProcedureTable',
  mouseTrackCategory = 'patient_procedure_table',
  mouseTrackLabel = 'patient_procedure_table',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithProcedureInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [{ filter, submitedFilter }, dispatch] = React.useReducer(
    tableWithFilterReducer,
    tableWithFilterState,
  )

  React.useEffect(() => {
    dispatch({ type: 'INIT_FILTER', payload: initialFilter })
  }, [])
  const classes = useStyles()

  const fetchData = async (
    newFilter: IProcedureListFilterQuery,
    max: number,
  ) => {
    const procedureService = HMSService.getService(
      'procedure',
    ) as ProcedureService
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await procedureService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      return Promise.reject(new Error(entryData.error))
    }
    return Promise.resolve(_.get(entryData, 'data'))
  }

  const fetchMoreAsync = async (lastEntry: any) => {
    const newFilter: IProcedureListFilterQuery = {
      ...filter,
      patientId,
      periodStart_lt: _.get(lastEntry, 'performedPeriodStart'),
    }
    const entryData = await fetchData(newFilter, max)
    sendMessage({
      message: 'handleLoadMore',
      name,
      params: {
        filter: newFilter,
        max,
      },
    })
    return entryData
  }

  const myscroll = React.useRef<HTMLDivElement | null>(null)
  const {
    data,
    error,
    isLoading,
    setIsFetch,
    setResult,
    setIsMore,
    isMore,
  } = useInfinitScroll(
    isContainer ? myscroll.current : null,
    fetchMoreAsync,
    resourceList,
  )
  React.useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const submitSearch = async (filter: any) => {
    dispatch({ type: 'SUBMIT_SEARCH', payload: filter })
    setIsMore(true)
    const newFilter = {
      ...filter,
      periodStart_lt: initialFilter.periodStart_lt,
    }
    const entryData = await fetchData(newFilter, max)
    return entryData
  }

  const handleParameterChange = (type: string, value: any) => {
    dispatch({ type: 'FILTER_ON_CHANGE', payload: { [type]: value } })
  }

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const newData = await submitSearch(filter)
      setResult({ data: newData, error: null })
      sendMessage({
        message: 'handleSearchSubmit',
        name,
        params: filter,
      })
    } catch (error) {
      setResult({ data: [], error: error.message })
      sendMessage({
        message: 'handleSearchSubmit',
        name,
        params: filter,
      })
    } finally {
      closeModal()
    }
  }

  const handleSearchReset = async () => {
    try {
      const newData = await submitSearch(initialFilter)
      setResult({ data: newData, error: null })
      sendMessage({
        message: 'handleSearchReset',
        name,
        params: filter,
      })
    } catch (error) {
      setResult({ data: [], error: error.message })
      sendMessage({
        message: 'handleSearchReset',
        name,
        params: filter,
      })
    } finally {
      closeModal()
    }
  }

  const { showModal, renderModal, closeModal } = useModal(TableFilterPanel, {
    CustomModal: FormModalContent,
    modalTitle: 'Procedure Filter',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [{ type: 'text', name: 'code', label: 'Code' }],
      onParameterChange: handleParameterChange,
      onSearchSubmit: handleSearchSubmit,
    },
  })

  if (error) {
    return <ErrorSection error={error} />
  }

  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <div className={classes.toolbar}>
          <ToolbarWithFilter
            title={'Procedure'}
            onClickIcon={showModal}
            Icon={<Icon className='fas fa-procedures' />}
            filterActive={countFilterActive(submitedFilter, initialFilter, [
              'patientId',
              'periodStart_lt',
            ])}
            option={{
              isHideIcon: false,
            }}
          >
            {renderModal}
          </ToolbarWithFilter>
        </div>
        <div
          ref={myscroll}
          className={classes.tableWrapper}
          data-testid='scroll-container'
        >
          <TableBase
            id='procedure'
            entryList={data}
            isLoading={isLoading}
            isMore={isMore}
            data-testid='table-base'
            tableCells={[
              {
                bodyCell: {
                  align: 'left',
                  id: 'code',
                },
                headCell: {
                  align: 'left',
                  disablePadding: false,
                  disableSort: true,
                  id: 'code',
                  label: 'Code',
                  styles: {
                    width: '5em',
                  },
                },
              },
              {
                bodyCell: {
                  align: 'left',
                  id: 'codeText',
                },
                headCell: {
                  align: 'left',
                  disablePadding: false,
                  disableSort: true,
                  id: 'codeText',
                  label: 'Detail',
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'performedPeriodStartText',
                },
                headCell: {
                  align: 'center',
                  disablePadding: true,
                  disableSort: true,
                  id: 'performedPeriodStartText',
                  label: 'Date',
                  styles: {
                    width: '15em',
                  },
                },
              },
            ]}
          />
        </div>
      </div>
    </TrackerMouseClick>
  )
}

export default PatientProcedureTable
