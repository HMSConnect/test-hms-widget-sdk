import React, { useEffect, useRef } from 'react'

import {
  tableWithFilterReducer,
  tableWithFilterState,
} from '@app/reducers/tableWithFilter.reducer'
import ErrorSection from '@components/base/ErrorSection'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import { noneOption, selectOptions } from '@config'
import {
  IEncounterListFilterQuery,
  IEncounterListQuery,
  mergeWithEncounterInitialFilterQuery,
} from '@data-managers/EncounterDataManager'
import { Icon, makeStyles, Theme } from '@material-ui/core'
import { lighten } from '@material-ui/core/styles'
import { countFilterActive, sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'
import routes from '../../../routes'
import RouteManager from '../../../routes/RouteManager'
import EncounterService from '../../../services/EncounterService'
import { HMSService } from '../../../services/HMSServiceFactory'
import { IHeaderCellProps } from '../../base/EnhancedTableHead'
import useInfinitScroll from '../../hooks/useInfinitScroll'
import PatientEncounterList from '../../templates/PatientEncounterList'
import MouseTrackMove from '@components/base/MouseTrackMove'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  headerCard: {
    backgroundColor: theme.palette.nonary?.light || '',
    color: theme.palette.nonary?.main || '',
  },
  iconCard: {
    color: theme.palette.nonary?.main || '',
  },
  listRoot: { maxHeight: '60vh', overflow: 'auto' },
  root: {
    justifyContent: 'center',
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

export const PatientEncounterTimelineWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.patientEncounterTimeline)

  const handleEncounterSelect = (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => {
    const newParams = {
      encounterId: _.get(selectedEncounter, 'id'),
      patientId: _.get(state, 'patientId'),
    }
    const path = RouteManager.getPath(`patient-summary`, {
      matchBy: 'url',
      params: newParams,
    })
    sendMessage({
      action: 'REPLACE_ROUTE',
      message: 'handleEncounterSelect',
      name,
      params: newParams,
      path,
    })
    routes.Router.replaceRoute(path)
  }

  return (
    <PatientEncounterTimeline
      patientId={_.get(state, 'patientId')}
      mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
      selectedEncounterId={_.get(state, 'encounterId')}
      isInitialize={true}
      max={state?.query?.max}
      onEncounterSelected={handleEncounterSelect}
      name={`${name}EncounterTimeline`}
    />
  )
}

const PatientEncounterTimeline: React.FunctionComponent<{
  patientId: any
  resourceList?: any[]
  isInitialize?: boolean
  max?: number
  initialFilter?: IEncounterListFilterQuery
  isContainer?: boolean
  isRouteable?: boolean
  selectedEncounterId?: string
  onEncounterSelected?: (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => void
  name?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  patientId,
  resourceList,
  isInitialize,
  max = 20,
  isContainer = true,
  initialFilter: customInitialFilter = {
    patientId,
    periodStart_lt: undefined,
    status: '',
    type: undefined,
  },
  isRouteable = true,
  selectedEncounterId,
  onEncounterSelected,
  name = 'patientEncounterTimeline',
  mouseTrackCategory = 'patient_encounter_timeline',
  mouseTrackLabel = 'patient_encounter_timeline',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithEncounterInitialFilterQuery(customInitialFilter, {
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
    newFilter: IEncounterListFilterQuery,
    max: number,
  ) => {
    const encounterService = HMSService.getService(
      'encounter',
    ) as EncounterService
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad: IEncounterListQuery = {
      filter: newFilter,
      max,
      withDiagnosis: true,
      withOrganization: true,
      withPractitioner: true,
    }
    const entryData = await encounterService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      return Promise.reject(new Error(entryData.error))
    }
    return Promise.resolve(_.get(entryData, 'data'))
  }

  const myscroll = useRef<HTMLDivElement | null>(null)

  const fetchMoreAsync = async (lastEntry: any) => {
    const newFilter: IEncounterListFilterQuery = {
      ...filter,
      periodStart_lt: _.get(lastEntry, 'startTime'),
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

  const {
    data,
    error,
    isLoading,
    setIsFetch,
    setIsMore,
    setResult,
    isMore,
  } = useInfinitScroll(
    isContainer ? myscroll.current : null,
    fetchMoreAsync,
    resourceList,
  )

  useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const handleEncounterSelect = (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => {
    if (onEncounterSelected) {
      onEncounterSelected(event, selectedEncounter)
    } else {
      const newParams = {
        encounterId: _.get(selectedEncounter, 'id'),
        patientId,
      }

      const path = RouteManager.getPath(
        `patient-info/patient-medical-records`,
        {
          matchBy: 'url',
          params: newParams,
        },
      )
      sendMessage({
        action: 'PUSH_ROUTE',
        message: 'handleEncounterSelect',
        name,
        params: newParams,
        path,
      })
      if (isRouteable) {
        routes.Router.replaceRoute(path)
      }
    }
  }
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
    modalTitle: 'Encouter Filter',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        // {
        //   label: 'Name',
        //   name: 'codeText',
        //   type: 'text',
        // },
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.encounterStatusOption,
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
      {/* <MouseTrackMove category='patient_summary'> */}
      <div ref={myscroll} style={{ height: '100%', overflow: 'auto' }}>
        <div className={classes.toolbar}>
          <ToolbarWithFilter
            title={'Encounter'}
            onClickIcon={showModal}
            Icon={
              <Icon className={clsx('fas fa-book-reader', classes.iconCard)} />
            }
            filterActive={countFilterActive(submitedFilter, initialFilter, [
              'periodStart_lt',
              'patientId',
              'type',
            ])}
            option={{
              headerClass: classes.headerCard,
            }}
          >
            {renderModal}
          </ToolbarWithFilter>
        </div>
        <div className={classes.tableWrapper} data-testid='scroll-container'>
          <PatientEncounterList
            entryList={data}
            onEntrySelected={handleEncounterSelect}
            isLoading={isLoading}
            isMore={isMore}
            selectedEncounterId={selectedEncounterId}
          />
        </div>
      </div>
      {/* </MouseTrackMove> */}
    </TrackerMouseClick>
  )
}

export default PatientEncounterTimeline
