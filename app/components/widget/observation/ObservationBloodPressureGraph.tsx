import * as React from 'react'

import ErrorSection from '@components/base/ErrorSection'
import GraphBase from '@components/base/GraphBase'
import LoadingSection from '@components/base/LoadingSection'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import { ArgumentScale, ValueScale } from '@devexpress/dx-react-chart'
import {
  Divider,
  Icon,
  makeStyles,
  Theme,
  Typography,
  withTheme,
} from '@material-ui/core'
import { scaleTime } from 'd3-scale'
import maxBy from 'lodash/maxBy'

export interface IOptionsStyleGraphOption {
  color?: string
  colorToolbarBackground?: string
  colorToolbarTitle?: string
  colorSummary?: string
  fontSize?: string
  height?: number
  weight?: number
}

const useStyles = makeStyles((theme: Theme) => ({
  headerCard: {
    backgroundColor: theme.palette.tertiary?.light || '',
    color: theme.palette.tertiary?.main || '',
  },
  iconCard: {
    color: theme.palette.tertiary?.dark || '',
  },
  summaryContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  summaryContent: {
    color: theme.palette.tertiary?.main || '',
  },
}))

const ObservationBloodPressureGraph: React.FunctionComponent<{
  patientId: string
  max?: number
  optionStyle?: IOptionsStyleGraphOption
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  patientId,
  max = 20,
  optionStyle,
  mouseTrackCategory = 'observation_blood_pressure_graph',
  mouseTrackLabel = 'observation_blood_pressure_graph',
}) => {
  const params = {
    code: OBSERVATION_CODE.BLOOD_PRESSURE.code,
    patientId,
    // encounterId: get(query, 'encounterId'),
  } as IObservationListFilterQuery

  const { isLoading, data: observationList, error } = useObservationList(
    {
      filter: params || {},
      max: max || 20,
    },
    ['patientId'],
  )

  if (error) {
    return <ErrorSection error={error} />
  }

  if (isLoading) {
    return <LoadingSection />
  }
  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div style={{ height: '100%' }}>
        <ObservationBloodPressureGraphViewWithTheme
          observationList={observationList}
          optionStyle={optionStyle}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default ObservationBloodPressureGraph

export const ObservationBloodPressureGraphView: React.FunctionComponent<{
  observationList: any
  theme?: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ observationList, optionStyle = {}, theme }) => {
  const lastData: any = maxBy(observationList, 'issuedDate')

  const classes = useStyles()
  return (
    <>
      <ToolbarWithFilter
        title={'Blood Pressure'}
        Icon={<Icon className={'fas fa-chart-area'} />}
        option={{
          headerClass: classes.headerCard,
          isHideIcon: true,
          style: {
            height: '5%',
          },
        }}
      ></ToolbarWithFilter>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '95%',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'block' }}>
          <GraphBase
            data={observationList}
            argumentField='issuedDate'
            optionStyle={{
              color: theme?.palette?.tertiary?.main || '#e57373',
              height:
                optionStyle && optionStyle.height && optionStyle.height - 200,
            }}
            options={{
              ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
              ValueScale: <ValueScale modifyDomain={() => [40, 150]} />,
              type: 'area',
            }}
          />
          <Divider />
        </div>
        <div className={classes.summaryContainer}>
          {lastData ? (
            <>
              {' '}
              <Typography variant='body1' style={{}}>
                {lastData.issued}
              </Typography>
              <Typography
                variant='body1'
                className={classes.summaryContent}
                style={{ fontSize: '1.5rem' }}
              >
                {lastData.value}
                {lastData.unit}
              </Typography>
            </>
          ) : (
            <Typography variant='h6' style={{}}>
              N/A
            </Typography>
          )}
        </div>
      </div>
    </>
  )
}

const ObservationBloodPressureGraphViewWithTheme = withTheme(
  ObservationBloodPressureGraphView,
)
