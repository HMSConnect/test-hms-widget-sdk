import React from 'react'

import {
  tableWithFilterReducer,
  tableWithFilterState,
} from '@app/reducers/tableWithFilter.reducer'
import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import ErrorSection from '@components/base/ErrorSection'
import { FormModalContent, useModal } from '@components/base/Modal'
import TabGroup from '@components/base/TabGroup'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { noneOption, selectOptions } from '@config'
import {
  IImmunizationListFilterQuery,
  mergeWithImmunizationInitialFilterQuery,
} from '@data-managers/ImmunizationDataManager'
import {
  Checkbox,
  FormControlLabel,
  Icon,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { HMSService } from '@services/HMSServiceFactory'
import ImmunizationService from '@services/ImmunizationService'
import { countFilterActive, sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
  headerCard: {
    backgroundColor: theme.palette.denary?.light || '',
    color: theme.palette.denary?.main || '',
  },
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

export const PatientImmunizationTableWithConnector: React.FunctionComponent<any> = () => {
  const state = useSelector((state: any) => state.patientImmunizationTable)

  return (
    <PatientImmunizationTable
      patientId={_.get(state, 'patientId')}
      mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
      max={_.get(state, 'max')}
      initialFilter={_.get(state, 'initialFilter')}
      isInitialize={true}
    />
  )
}

const PatientImmunizationTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  isContainer?: boolean
  max?: number
  initialFilter?: IImmunizationListFilterQuery
  name?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  isContainer = true,
  initialFilter: customInitialFilter = {
    date_lt: undefined,
    patientId,
    status: '',
    vaccineCode: undefined,
  },
  name = 'patientImmunizationTable',
  mouseTrackCategory = 'patient_immunization_table',
  mouseTrackLabel = 'patient_immunization_table',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithImmunizationInitialFilterQuery(customInitialFilter, {
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

  const classes = useStyles()

  const fetchData = async (
    newFilter: IImmunizationListFilterQuery,
    max: number,
  ) => {
    const immunizationService = HMSService.getService(
      'immunization',
    ) as ImmunizationService
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await immunizationService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      return Promise.reject(new Error(entryData.error))
    }
    return Promise.resolve(_.get(entryData, 'data'))
  }

  const fetchMoreAsync = async (lastEntry: any) => {
    const newFilter: IImmunizationListFilterQuery = {
      ...filter,
      date_lt: _.get(lastEntry, 'date'),
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
    setResult,
    setIsMore,
    setIsFetch,
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

  const handleGroupByType = async (isGroup: boolean) => {
    setIsMore(true)
    if (isGroup) {
      handleInitialGroup(patientId)
    } else {
      handleUnGroup(filter)
    }
  }

  const handleUnGroup = async (filter: IImmunizationListFilterQuery) => {
    const newFilter = {
      ...filter,
      date_lt: undefined,
      vaccineCode: undefined,
    }
    try {
      const newData = await fetchData(newFilter, max)
      if (newData.length < max) {
        setIsMore(false)
      }
      setResult({ data: newData, error: null })
      sendMessage({
        message: 'handleGroupByType',
        name,
        params: {
          isGroup,
          result: newData,
        },
      })
    } catch (error) {
      setResult({ data: [], error: error.message })
      sendMessage({
        message: 'handleGroupByType',
        name,
        params: {
          error,
          filter: newFilter,
          isGroup,
        },
      })
    } finally {
      dispatch({
        type: 'UN_GROUP_BY',
      })
    }
  }

  const handleInitialGroup = async (patientId: string) => {
    try {
      const immunizationService = HMSService.getService(
        'immunization',
      ) as ImmunizationService
      const menuTabList = await immunizationService.typeList({
        filter: { patientId },
      })
      dispatch({
        payload: {
          selectedTab: menuTabList.data[0].type,
          tabList: menuTabList.data,
        },
        type: 'GROUP_BY',
      })
      handleTabChange(menuTabList.data[0].type)
      sendMessage({
        message: 'handleGroupByType',
        name,
        params: {
          isGroup,
        },
      })
    } catch (error) {
      setResult({ data: [], error: error.message })
      sendMessage({
        message: 'handleGroupByType',
        name,
        params: {
          error,
          isGroup,
        },
      })
    }
  }

  const handleTabChange = async (selectedTab: string) => {
    const newFilter = {
      ...filter,
      date_lt: undefined,
      patientId,
      vaccineCode: selectedTab,
    }
    dispatch({
      payload: { filter: newFilter, selectedTab },
      type: 'CHANGE_TAB',
    })
    setIsMore(true)
    try {
      const newData = await fetchData(newFilter, max)
      if (newData.length < max) {
        setIsMore(false)
      }
      setResult({ data: newData, error: null })
      sendMessage({
        message: `handleTabChange:`,
        name,
        params: {
          filter: newFilter,
          result: newData,
          tabTitle: selectedTab,
        },
      })
    } catch (error) {
      setResult({ data: [], error: error.message })
      sendMessage({
        message: `handleTabChange:`,
        name,
        params: {
          error,
          filter: newFilter,
          tabTitle: selectedTab,
        },
      })
    }
  }

  const submitSearch = async (filter: any) => {
    dispatch({ type: 'SUBMIT_SEARCH', payload: filter })
    setIsMore(true)
    const newFilter = {
      ...filter,
      date_lt: initialFilter.date_lt,
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
    const newFilter: IImmunizationListFilterQuery = initialFilter
    if (isGroup) {
      newFilter.vaccineCode = tab.selectedTab
    }
    try {
      const newData = await submitSearch(newFilter)
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
    modalTitle: 'Immunization Filter',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        { label: 'Vaccine Code', name: 'vaccineCode', type: 'text' },
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.immunizationStatusOption,
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
      <div
        ref={myscroll}
        style={{ height: '100%', overflow: isContainer ? 'auto' : '' }}
      >
        <div className={classes.toolbar}>
          <ToolbarWithFilter
            title={'Immunization'}
            onClickIcon={showModal}
            Icon={<Icon className='fas fa-syringe' />}
            filterActive={countFilterActive(submitedFilter, initialFilter, [
              'date_lt',
              'patientId',
              'vaccineCode',
            ])}
            option={{
              additionButton: (
                <FormControlLabel
                  value='start'
                  control={
                    <Checkbox
                      onChange={(event, isGroup) => {
                        handleGroupByType(isGroup)
                      }}
                      data-testid='check-by-type-input'
                      value={isGroup}
                      inputProps={{
                        'aria-label': 'primary checkbox',
                      }}
                    />
                  }
                  label='Group By Type'
                  labelPlacement='start'
                />
              ),
              headerClass: classes.headerCard,
              // style: {
              //   backgroundColor: lighten('#afb42b', 0.85),
              //   color: '#afb42b',
              // },
            }}
          >
            {renderModal}
          </ToolbarWithFilter>
          {isGroup && (
            <TabGroup tabList={tab.tabList} onTabChange={handleTabChange} />
          )}
        </div>
        <div className={classes.tableWrapper} data-testid='scroll-container'>
          <TableBase
            id='immunization'
            entryList={data}
            isLoading={isLoading}
            isMore={isMore}
            data-testid='table-base'
            tableCells={[
              {
                bodyCell: {
                  align: 'left',
                  id: 'vaccineCode',
                },
                headCell: {
                  align: 'left',
                  disablePadding: false,
                  disableSort: true,
                  id: 'vaccineCode',
                  label: 'Vaccine Code',
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
                  id: 'dateText',
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'dateText',
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

export default PatientImmunizationTable
