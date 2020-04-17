import React from 'react'

import {
  tableWithFilterReducer,
  tableWithFilterState,
} from '@app/reducers/tableWithFilter.reducer'
import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import ErrorSection from '@components/base/ErrorSection'
import TableBase from '@components/base/TableBase'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import {
  IImagingStudyListFilterQuery,
  mergeWithImagingStudyInitialFilterQuery,
} from '@data-managers/ImagingStudyDataManager'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { HMSService } from '@services/HMSServiceFactory'
import ImagingStudyService from '@services/ImagingStudyService'
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

const PatientImagingStudyTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IImagingStudyListFilterQuery
  name?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  initialFilter: customInitialFilter = {
    patientId,
    started_lt: undefined,
  },
  name = 'patientImagingStudyTable',
  mouseTrackCategory = 'patient_imaging_study_table',
  mouseTrackLabel = 'patient_imaging_study_table',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithImagingStudyInitialFilterQuery(customInitialFilter, {
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
    newFilter: IImagingStudyListFilterQuery,
    max: number,
  ) => {
    const imagingStudyService = HMSService.getService(
      'imaging_study',
    ) as ImagingStudyService
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await imagingStudyService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      return Promise.reject(new Error(entryData.error))
    }
    return Promise.resolve(_.get(entryData, 'data'))
  }

  const fetchMoreAsync = async (lastEntry: any) => {
    const newFilter: IImagingStudyListFilterQuery = {
      ...filter,
      patientId,
      started_lt: _.get(lastEntry, 'started'),
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

  // const submitSearch = async (filter: any) => {
  //   dispatch({ type: 'SUBMIT_SEARCH', payload: filter })
  //   setIsMore(true)
  //   const newFilter = {
  //     ...filter,
  //     started_lt: initialFilter.started_lt,
  //   }
  //   const entryData = await fetchData(newFilter, max)
  //   return entryData
  // }

  // const handleParameterChange = (type: string, value: any) => {
  //   dispatch({ type: 'FILTER_ON_CHANGE', payload: { [type]: value } })
  // }

  // const handleSearchSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault()
  //   try {
  //     const newData = await submitSearch(filter)
  //     setResult({ data: newData, error: null })
  //     sendMessage({
  //       message: 'handleSearchSubmit',
  //       name,
  //       params: filter,
  //     })
  //   } catch (error) {
  //     setResult({ data: [], error })
  //     sendMessage({
  //       message: 'handleSearchSubmit',
  //       name,
  //       params: filter,
  //     })
  //   } finally {
  //     closeModal()
  //   }
  // }

  // const handleSearchReset = async () => {
  //   try {
  //     const newData = await submitSearch(initialFilter)
  //     setResult({ data: newData, error: null })
  //     sendMessage({
  //       message: 'handleSearchReset',
  //       name,
  //       params: filter,
  //     })
  //   } catch (error) {
  //     setResult({ data: [], error })
  //     sendMessage({
  //       message: 'handleSearchReset',
  //       name,
  //       params: filter,
  //     })
  //   } finally {
  //     closeModal()
  //   }
  // }
  // const { showModal, renderModal, closeModal } = useModal(TableFilterPanel, {
  //   CustomModal: FormModalContent,
  //   modalTitle: 'Imaging Study Filter',
  //   name: `${name}Modal`,
  //   optionCustomModal: {
  //     onReset: handleSearchReset,
  //     onSubmit: handleSearchSubmit,
  //   },
  //   params: {
  //     filter,
  //     filterOptions: [],
  //     onParameterChange: handleParameterChange,
  //     onSearchSubmit: handleSearchSubmit,
  //   },
  // })

  if (error) {
    return <ErrorSection error={error} />
  }

  // if (isLoading) {
  //   return <CircularProgress />
  // }

  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div style={{ height: '100%' }}>
        <div className={classes.toolbar}>
          <ToolbarWithFilter
            title={'Imaging Study'}
            // onClickIcon={showModal}
            filterActive={countFilterActive(submitedFilter, initialFilter, [
              'started_lt',
              'patientId',
            ])}
            option={{
              isHideIcon: true,
            }}
          >
            {/* {renderModal} */}
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
            id='imagingStudy'
            entryList={data}
            isLoading={isLoading}
            isMore={isMore}
            data-testid='table-base'
            size='small'
            tableCells={[
              {
                bodyCell: {
                  align: 'center',
                  id: 'instance',
                  render: (imagingStudy: any) => {
                    return (
                      <ul>
                        {_.map(imagingStudy.series, (serie, index) => (
                          <li key={`instanceTitle${index}`}>
                            {_.get(serie, 'instance[0].title')}
                          </li>
                        ))}
                      </ul>
                    )
                  },
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'instance',
                  label: 'Instance Title',
                  styles: {
                    width: '15em',
                  },
                },
              },
              {
                bodyCell: {
                  align: 'left',
                  id: 'encounter',
                },
                headCell: {
                  align: 'left',
                  disablePadding: false,
                  disableSort: true,
                  id: 'encounter',
                  label: 'Encounter',
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'startedText',
                },
                headCell: {
                  align: 'center',
                  disablePadding: true,
                  disableSort: true,
                  id: 'startedText',
                  label: 'Start Date',
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

export default PatientImagingStudyTable
