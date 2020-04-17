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
  IMedicationRequestFilterQuery,
  mergeWithMedicationRequestInitialFilterQuery,
} from '@data-managers/MedicationRequestDataManager'
import { makeStyles, Theme } from '@material-ui/core'
import { HMSService } from '@services/HMSServiceFactory'
import MedicationRequestService from '@services/MedicationRequestService'
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

const PatientMedicationRequestTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IMedicationRequestFilterQuery
  name?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  resourceList,
  patientId,
  isInitialize,
  max = 20,
  initialFilter: customInitialFilter = {
    authoredOn_lt: undefined,
    medicationCodeableConcept: '',
    patientId,
    status: '',
  },
  name = 'patientMedicationRequestTable',
  mouseTrackCategory = 'patient_medication_request_table',
  mouseTrackLabel = 'patient_medication_request_table',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithMedicationRequestInitialFilterQuery(customInitialFilter, {
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
    newFilter: IMedicationRequestFilterQuery,
    max: number,
  ) => {
    const medicationRequestService = HMSService.getService(
      'medication_request',
    ) as MedicationRequestService
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await medicationRequestService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      return Promise.reject(new Error(entryData.error))
    }
    return Promise.resolve(_.get(entryData, 'data'))
  }

  const fetchMoreAsync = async (lastEntry: any) => {
    const newFilter: IMedicationRequestFilterQuery = {
      ...filter,
      authoredOn_lt: _.get(lastEntry, 'authoredOn'),
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
    const newFilter = {
      ...filter,
      authoredOn_lt: initialFilter.authoredOn_lt,
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
    modalTitle: 'Medication Request Filter',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        {
          label: 'Medication',
          name: 'medicationCodeableConcept',
          type: 'text',
        },
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.medicationRequestStatusOption,
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
            title={'Medical Request'}
            onClickIcon={showModal}
            filterActive={countFilterActive(submitedFilter, initialFilter, [
              'patientId',
              'authoredOn_lt',
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
            id='allergyIntolerance'
            entryList={data}
            isLoading={isLoading}
            isMore={isMore}
            data-testid='table-base'
            tableCells={[
              {
                bodyCell: {
                  align: 'left',
                  id: 'medicationCodeableConcept',
                },
                headCell: {
                  align: 'left',
                  disablePadding: false,
                  disableSort: true,
                  id: 'medicationCodeableConcept',
                  label: 'Medication',
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
                    width: '10em',
                  },
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'authoredOnText',
                },
                headCell: {
                  align: 'center',
                  disablePadding: true,
                  disableSort: true,
                  id: 'authoredOnText',
                  label: 'Authorred On',
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

export default PatientMedicationRequestTable
