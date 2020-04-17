import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import ErrorSection from '@components/base/ErrorSection'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import {
  IObservationListFilterQuery,
  mergeWithObservationInitialFilterQuery,
} from '@data-managers/ObservationDataManager'
import { Icon, makeStyles, Theme, Typography } from '@material-ui/core'
import { lighten } from '@material-ui/core/styles'
import { HMSService } from '@services/HMSServiceFactory'
import ObservationService from '@services/ObservationService'
import { countFilterActive, sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
  headerCard: {
    backgroundColor: theme.palette.denary?.light || '',
    color: theme.palette.denary?.main || '',
  },
  successValue: {
    color: theme.palette.success.main,
  },
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
  warningValue: {
    color: theme.palette.error.main,
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

export const ObservationLaboratoryTableWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.observationLaboratoryTable)

  return (
    <ObservationLaboratoryTable
      key={`ObservationLaboratoryTable${_.get(state, 'encounterId')}`}
      patientId={_.get(state, 'patientId')}
      encounterId={_.get(state, 'encounterId')}
      mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
      isInitialize={true}
      max={state?.max || 10}
    />
  )
}

const ObservationLaboratoryTable: React.FunctionComponent<{
  patientId: any
  encounterId?: any
  isInitialize?: boolean
  isContainer?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IObservationListFilterQuery
  name?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  resourceList,
  patientId,
  encounterId,
  isInitialize,
  isContainer = true,
  max = 20,
  initialFilter: customInitialFilter = {
    categoryCode: 'laboratory',
    encounterId,
    issued_lt: undefined,
    patientId,
  },
  name = 'observationLaboratoryTable',
  mouseTrackCategory = 'observation_laboratory_table',
  mouseTrackLabel = 'observation_laboratory_table',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithObservationInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [filter, setFilter] = React.useState<IObservationListFilterQuery>(
    initialFilter,
  )
  const [submitedFilter, setSubmitedFilter] = React.useState<
    IObservationListFilterQuery
  >(initialFilter)
  const fetchMoreAsync = async (lastEntry: any) => {
    const observationService = HMSService.getService(
      'observation',
    ) as ObservationService
    const newFilter: IObservationListFilterQuery = {
      ...filter,
      issued_lt: _.get(lastEntry, 'performedPeriodStart'),
      patientId,
    }
    // setFilter(newFilter)
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
      sendMessage({
        error: _.get(entryData, 'error'),
        message: 'handleLoadMore',
        name,
      })
      return Promise.reject(new Error(entryData.error))
    }

    sendMessage({
      message: 'handleLoadMore',
      name,
      params: newLazyLoad,
    })

    return Promise.resolve(_.get(entryData, 'data'))
  }

  const myscroll = React.useRef<HTMLDivElement | null>(null)
  const {
    data,
    error,
    isLoading,
    setIsFetch,
    isMore,
  } = useInfinitScroll(
    isContainer ? myscroll.current : null,
    fetchMoreAsync,
    resourceList,
    { max },
  )
  React.useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const classes = useStyles()
  if (error) {
    return <ErrorSection error={error} />
  }

  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div ref={myscroll} style={{ height: '100%', overflow: 'auto' }}>
        <div className={classes.toolbar}>
          <ToolbarWithFilter
            title={'Laboratory Results'}
            Icon={<Icon className='fas fa-vial' />}
            filterActive={countFilterActive(submitedFilter, initialFilter, [
              'patientId',
              'periodStart_lt',
            ])}
            option={{
              headerClass: classes.headerCard,
              isHideIcon: true,
            }}
          ></ToolbarWithFilter>
        </div>
        <div className={classes.tableWrapper} data-testid='scroll-container'>
          <TableBase
            id='laboratory results'
            entryList={data}
            isLoading={isLoading}
            isMore={isMore}
            data-testid='table-base'
            size='small'
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
                  align: 'left',
                  id: 'value',
                  render: (laboratory: any) => {
                    if (laboratory.referenceRange) {
                      const nomalRange = _.find(laboratory.referenceRange, {
                        type: 'normal',
                      })
                      if (!nomalRange) {
                        return <>{laboratory.value} </>
                      }
                      if (nomalRange.low && laboratory.value < nomalRange.low) {
                        return (
                          <Typography
                            variant='body1'
                            // style={{ color: '#f44336' }}
                            className={classes.warningValue}
                          >
                            {laboratory.value}{' '}
                            <Icon
                              className='fas fa-chevron-circle-down'
                              style={{ zoom: '0.7' }}
                            />
                          </Typography>
                        )
                      } else if (
                        nomalRange.high &&
                        laboratory.value > nomalRange.high
                      ) {
                        return (
                          <Typography
                            variant='body1'
                            // style={{ color: '#f44336' }}
                            className={classes.warningValue}
                          >
                            {laboratory.value}{' '}
                            <Icon
                              className='fas fa-chevron-circle-up'
                              style={{ zoom: '0.7' }}
                            />
                          </Typography>
                        )
                      } else {
                        return (
                          <Typography
                            variant='body1'
                            // style={{ color: '#66bb6a' }}
                            className={classes.successValue}
                          >
                            {laboratory.value}{' '}
                          </Typography>
                        )
                      }
                    }
                    return <>{laboratory.value} </>
                  },
                },
                headCell: {
                  align: 'left',
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
                  align: 'left',
                  id: 'unit',
                },
                headCell: {
                  align: 'left',
                  disablePadding: false,
                  disableSort: true,
                  id: 'unit',
                  label: 'Unit',
                  styles: {
                    width: '5em',
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
                  disablePadding: true,
                  disableSort: true,
                  id: 'issued',
                  label: 'Time',
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

export default ObservationLaboratoryTable
