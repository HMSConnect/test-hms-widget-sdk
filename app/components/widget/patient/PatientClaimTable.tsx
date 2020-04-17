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
import { noneOption, selectOptions } from '@config'
import {
  IClaimListFilterQuery,
  mergeWithClaimInitialFilterQuery,
} from '@data-managers/ClaimDataManager'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import ClaimService from '@services/ClaimService'
import { HMSService } from '@services/HMSServiceFactory'
import { countFilterActive, sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
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

const PatientClaimTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IClaimListFilterQuery
  name?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  initialFilter: customInitialFilter = {
    billablePeriodStart_lt: undefined,
    organizationId: undefined,
    patientId,
    status: '',
  },
  name = 'patientClaimTable',
  mouseTrackCategory = 'patient_claim_table',
  mouseTrackLabel = 'patient_claim_table',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithClaimInitialFilterQuery(customInitialFilter, {
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

  const fetchData = async (newFilter: IClaimListFilterQuery, max: number) => {
    const claimService = HMSService.getService('claim') as ClaimService
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await claimService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      return Promise.reject(new Error(entryData.error))
    }
    return Promise.resolve(_.get(entryData, 'data'))
  }

  const fetchMoreAsync = async (lastEntry: any) => {
    const newFilter: IClaimListFilterQuery = {
      ...filter,
      billablePeriodStart_lt: _.get(lastEntry, 'billablePeriodStart'),
      patientId,
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
    setIsMore,
    setResult,
    isMore,
  } = useInfinitScroll(null, fetchMoreAsync, resourceList)

  React.useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const submitSearch = async (filter: any) => {
    dispatch({ type: 'SUBMIT_SEARCH', payload: filter })
    setIsMore(true)
    const newFilter: IClaimListFilterQuery = {
      ...filter,
      billablePeriodStart_lt: initialFilter.billablePeriodStart_lt,
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
    modalTitle: 'Claim Filter',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.claimStatusOption,
          ),
          label: 'Status',
          name: 'status',
          type: 'options',
        },
      ],
      onParameterChange: handleParameterChange,
      onSearchSubmit: handleSearchSubmit,
    },
  })

  if (error) {
    return <ErrorSection error={error} />
  }

  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div style={{ height: '100%' }}>
        <div className={classes.toolbar}>
          <ToolbarWithFilter
            title={'Claim'}
            onClickIcon={showModal}
            filterActive={countFilterActive(submitedFilter, initialFilter, [
              'billablePeriodStart_lt',
              'patientId',
            ])}
            option={{
              isHideIcon: false,
            }}
          >
            {renderModal}
          </ToolbarWithFilter>
        </div>

        <Grid container>
          <Grid item xs={10}>
            <Typography variant='h6'></Typography>
          </Grid>
        </Grid>
        <div
          ref={myscroll}
          className={classes.tableWrapper}
          data-testid='scroll-container'
        >
          <TableBase
            id='claim'
            entryList={data}
            isLoading={isLoading}
            isMore={isMore}
            data-testid='table-base'
            tableCells={[
              {
                bodyCell: {
                  align: 'left',
                  id: 'organization.reference',
                },
                headCell: {
                  align: 'left',
                  disablePadding: false,
                  disableSort: true,
                  id: 'organization.reference',
                  label: 'Name',
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'use',
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'use',
                  label: 'Use',
                  styles: {
                    width: '5em',
                  },
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'status',
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'status',
                  label: 'Status',
                  styles: {
                    width: '5em',
                  },
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'totalPrice',
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'totalPrice',
                  label: 'Total Price',
                  styles: {
                    width: '10em',
                  },
                },
              },

              {
                bodyCell: {
                  align: 'center',
                  id: 'billablePeriodStartText',
                },
                headCell: {
                  align: 'center',
                  disablePadding: true,
                  disableSort: true,
                  id: 'billablePeriodStartText',
                  label: 'Billable Period Date',
                  styles: {
                    width: '20em',
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

export default PatientClaimTable
