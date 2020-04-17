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
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import {
  IObservationListFilterQuery,
  mergeWithObservationInitialFilterQuery,
} from '@data-managers/ObservationDataManager'
import {
  Checkbox,
  FormControlLabel,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { HMSService } from '@services/HMSServiceFactory'
import ObservationService from '@services/ObservationService'
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

const PatientObservationTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IObservationListFilterQuery
  name?: string
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  initialFilter: customInitialFilter = {},
  name = 'patientObservationTable',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithObservationInitialFilterQuery(customInitialFilter, {
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
    newFilter: IObservationListFilterQuery,
    max: number,
  ) => {
    const observationService = HMSService.getService(
      'observation',
    ) as ObservationService
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await observationService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      return Promise.reject(new Error(entryData.error))
    }
    return Promise.resolve(_.get(entryData, 'data'))
  }

  const fetchMoreAsync = async (lastEntry: any) => {
    const newFilter: IObservationListFilterQuery = {
      ...filter,
      issued_lt: _.get(lastEntry, 'issuedDate'),
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
  } = useInfinitScroll(null, fetchMoreAsync, resourceList)

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

  const handleUnGroup = async (filter: IObservationListFilterQuery) => {
    const newFilter = {
      ...filter,
      categoryCode: undefined,
      issued_lt: undefined,
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
      const observationService = HMSService.getService(
        'observation',
      ) as ObservationService
      const menuTabList = await observationService.categoryList({
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
      categoryCode: selectedTab,
      issued_lt: undefined,
      patientId,
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
      setResult({ data: [], error })
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

  if (error) {
    return <ErrorSection error={error} />
  }

  return (
    <>
      <div className={classes.toolbar}>
        <ToolbarWithFilter
          title={'Observation'}
          filterActive={countFilterActive(submitedFilter, initialFilter, [
            'issued_lt',
            'categoryCode',
            'patientId',
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
                label='Group By Category'
                labelPlacement='start'
              />
            ),
          }}
        ></ToolbarWithFilter>
        {isGroup && (
          <TabGroup tabList={tab.tabList} onTabChange={handleTabChange} />
        )}
      </div>
      <div
        ref={myscroll}
        className={classes.tableWrapper}
        data-testid='scroll-container'
      >
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
                id: 'categoryText',
              },
              headCell: {
                align: 'left',
                disablePadding: false,
                disableSort: true,
                id: 'categoryText',
                label: 'Category',
                styles: {
                  width: '15em',
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
                label: 'Name',
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'value',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'value',
                label: 'Value',
                styles: {
                  width: '10em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'issued',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'issued',
                label: 'Date',
                styles: {
                  width: '15em',
                },
              },
            },
          ]}
        />
      </div>
    </>
  )
}

export default PatientObservationTable
