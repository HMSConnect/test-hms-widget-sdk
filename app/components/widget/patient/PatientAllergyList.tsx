import * as React from 'react'

import ErrorSection from '@components/base/ErrorSection'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import {
  IAllergyIntoleranceListFilterQuery,
  mergeWithAllergyIntoleranceInitialFilterQuery,
} from '@data-managers/AllergyIntoleranceDataManager'
import {
  CircularProgress,
  Icon,
  lighten,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import { HMSService } from '@services/HMSServiceFactory'
import { sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
  headerCard: {
    backgroundColor: theme.palette.quinary?.light || '',
    color: theme.palette.quinary?.main || '',
  },
  listPadding: {
    paddingLeft: theme.spacing(1),
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

export const PatientAllergyListWithConnector: React.FunctionComponent = () => {
  const state = useSelector((state: any) => state.patientAllergyList)

  return (
    <PatientAllergyList
      patientId={_.get(state, 'patientId')}
      mouseTrackCategory={_.get(state, 'mouseTrackCategory')}
      isInitialize={true}
      name={`${name}AllergyIntoleranceList`}
    />
  )
}

const PatientAllergyList: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IAllergyIntoleranceListFilterQuery
  isContainer?: boolean
  option?: any
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
    assertedDate_lt: undefined,
    category: undefined,
    codeText: undefined,
    criticality: '',
    patientId,
    type: '',
  },
  option = {},
  name = 'patientAllergyList',
  mouseTrackCategory = 'patient_allergy_list',
  mouseTrackLabel = 'patient_allergy_list',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithAllergyIntoleranceInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])

  const classes = useStyles()

  const [filter, setFilter] = React.useState<
    IAllergyIntoleranceListFilterQuery
  >(initialFilter)

  const fetchMoreAsync = async (lastEntry: any) => {
    const allergyIntoleranceService = HMSService.getService(
      'allergy_intolerance',
    ) as AllergyIntoleranceService
    const newFilter: IAllergyIntoleranceListFilterQuery = {
      ...filter,
      assertedDate_lt: _.get(lastEntry, 'assertedDate'),
      patientId,
    }
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await allergyIntoleranceService.list(newLazyLoad)
    // if (_.get(entryData, 'error')) {
    //   sendMessage({
    //     error: _.get(entryData, 'error'),
    //     message: 'handleLoadMore',
    //     name,
    //   })
    //   return Promise.reject(new Error(entryData.error))
    // }

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
    isMore,
    isLoading,
    setIsFetch,
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

  const renderCriticalIcon = (allergy: any) => {
    switch (allergy.criticality) {
      case 'low':
        return (
          <ListItemIcon style={{ color: '#ff9800' }}>
            <FiberManualRecordIcon />
          </ListItemIcon>
        )
      case 'high':
        return (
          <ListItemIcon style={{ color: '#e57373' }}>
            <FiberManualRecordIcon />
          </ListItemIcon>
        )
      case 'unable-to-assess':
        return (
          <ListItemIcon style={{ color: 'grey' }}>
            <FiberManualRecordIcon />
          </ListItemIcon>
        )
      default:
        return (
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
        )
    }
  }

  if (error) {
    return <ErrorSection error={error} />
  }

  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div
        ref={myscroll}
        style={{ overflow: 'auto', width: '100%', height: '100%' }}
      >
        <div className={classes.toolbar}>
          <ToolbarWithFilter
            title={'Allergies'}
            Icon={<Icon className='fas fa-allergies' />}
            option={{
              headerClass: classes.headerCard,
              isHideIcon: true,
            }}
          ></ToolbarWithFilter>
        </div>
        <List
          className={classes.listPadding}
          component='nav'
          aria-labelledby='nested-list-subheader'
        >
          {_.isEmpty(data) ? (
            <div style={{ padding: '1em', textAlign: 'center' }}>
              <Typography variant='body1'>No allergy found</Typography>
            </div>
          ) : (
            <>
              {_.map(data, (allergy: any, index: number) => (
                <ListItem key={`allergy${index}`} style={{ padding: '0 0' }}>
                  {renderCriticalIcon(allergy)}
                  <ListItemText
                    primary={
                      <Typography variant='body1'>
                        {_.get(allergy, 'codeText')}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
              {isMore ? (
                <ListItem>
                  <ListItemText style={{ textAlign: 'center' }}>
                    {isLoading ? <CircularProgress /> : null}
                  </ListItemText>
                </ListItem>
              ) : null}
            </>
          )}
        </List>
      </div>
    </TrackerMouseClick>
  )
}

export default PatientAllergyList
