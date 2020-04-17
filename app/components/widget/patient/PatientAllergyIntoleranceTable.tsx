import React from 'react'

import {
  tableWithFilterReducer,
  tableWithFilterState,
} from '@app/reducers/tableWithFilter.reducer'
import ErrorSection from '@components/base/ErrorSection'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { noneOption, selectOptions } from '@config'
import {
  IAllergyIntoleranceListFilterQuery,
  mergeWithAllergyIntoleranceInitialFilterQuery,
} from '@data-managers/AllergyIntoleranceDataManager'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import { HMSService } from '@services/HMSServiceFactory'
import { countFilterActive, sendMessage } from '@utils'
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

const PatientAllergyIntoleranceTable: React.FunctionComponent<{
  patientId: string
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IAllergyIntoleranceListFilterQuery
  name?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  initialFilter: customInitialFilter = {
    assertedDate_lt: undefined,
    category: undefined,
    codeText: undefined,
    criticality: '',
    patientId,
    type: '',
  },
  name = 'patientAllergyIntoleranceTable',
  mouseTrackCategory = 'patient_allergy_intolerance_table',
  mouseTrackLabel = 'patient_allergy_intolerance_table',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithAllergyIntoleranceInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])

  const [{ filter, submitedFilter, isGroup, tab }, dispatch] = React.useReducer(
    tableWithFilterReducer,
    tableWithFilterState,
  )
  React.useEffect(() => {
    dispatch({ type: 'INIT_FILTER', payload: initialFilter })
  }, [])

  const fetchData = async (
    newFilter: IAllergyIntoleranceListFilterQuery,
    max: number,
  ) => {
    const allergyIntoleranceService = HMSService.getService(
      'allergy_intolerance',
    ) as AllergyIntoleranceService
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await allergyIntoleranceService.list(newLazyLoad)
    return _.get(entryData, 'data')
  }

  const fetchMoreAsync = async (lastEntry: any) => {
    const newFilter: IAllergyIntoleranceListFilterQuery = {
      ...filter,
      assertedDate_lt: _.get(lastEntry, 'assertedDate'),
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
  const classes = useStyles()
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
      assertedDate_lt: initialFilter.assertedDate_lt,
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
    modalTitle: 'AllerygyIntolerance Filter',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        {
          label: 'Name',
          name: 'codeText',
          type: 'text',
        },
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.allergyIntoleranceTypeOption,
          ),
          label: 'Type',
          name: 'type',
          type: 'options',
        },
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.allergyIntoleranceCriticalityOption,
          ),
          label: 'Criticality',
          name: 'criticality',
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
            title={'Allergy Intolerance'}
            onClickIcon={showModal}
            filterActive={countFilterActive(submitedFilter, initialFilter, [
              'assertedDate_lt',
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
            id='allergyIntolerance'
            entryList={data}
            isLoading={isLoading}
            isMore={isMore}
            data-testid='table-base'
            tableCells={[
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
                  label: 'Name',
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'type',
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'type',
                  label: 'Type',
                  styles: {
                    width: '5em',
                  },
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'criticality',
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'criticality',
                  label: 'Criticality',
                  styles: {
                    width: '5em',
                  },
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'category',
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'category',
                  label: 'Category',
                  styles: {
                    width: '10em',
                  },
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'assertedDateText',
                },
                headCell: {
                  align: 'center',
                  disablePadding: true,
                  disableSort: true,
                  id: 'assertedDateText',
                  label: 'Asserted Date',
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

export default PatientAllergyIntoleranceTable
