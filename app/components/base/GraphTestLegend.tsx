import React from 'react'

import useWindowSize from '@components/hooks/useWindowSize'
import { EventTracker, SplineSeries } from '@devexpress/dx-react-chart'
import {
  AreaSeries,
  ArgumentAxis,
  Chart,
  Legend,
  ScatterSeries,
  SplineSeries as SplineSeriesMat,
  Tooltip,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'
import environment from '@environment'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { area, curveCatmullRom, symbol, symbolCircle } from 'd3-shape'
import * as _ from 'lodash'
import * as moment from 'moment'

interface IGraphLineOption {
  includeLegend?: boolean
  customPrepareGraphData?: any
  ArgumentScale?: any
  ValueScale?: any
  valueUnit?: string
  type?: 'line' | 'area'
}

const MAP_COLOR_WITH_OBSERVATION: any = {
  // bodyWeight: {
  //   color: '#536dfe',
  // },
  // bodyMassIndex: {
  //   color: 'grey',
  // },
  diastolicBloodPressure: {
    color: 'blue',
  },
  systolicBloodPressure: {
    color: '#e57373',
  },
}

const useStyles = makeStyles((theme: Theme) => ({
  tooltiptext: {
    backgroundColor: '#555',
    borderRadius: '6px',
    bottom: '125%',
    color: '#fff',
    left: '50%',
    marginLeft: '-60px',
    opacity: 1,
    padding: '5px 0',
    position: 'absolute',
    textAlign: 'center',
    transition: 'opacity 0.3s',
    width: '1300%',
    zIndex: 1,
  },
}))

const Marker = (props: any) => {
  const { name, color } = props
  const findMapObservation = _.find(
    MAP_COLOR_WITH_OBSERVATION,
    (value, key) => {
      return key === _.camelCase(name)
    },
  )
  return (
    <FiberManualRecordIcon
      style={{ color: _.get(findMapObservation, 'color') || color }}
    />
  )
  // if (findMapObservation) {
  //   // return <FiberManualRecordIcon style={{ color: findMapObservation.color }} />
  // } else {
  //   return <FiberManualRecordIcon style={{ color }} />
  //   // return (
  //   //   <span role='img' aria-label='Bronze Medal'>
  //   //     🥉
  //   //   </span>
  //   // )
  // }
}

const ValueLabel = (props: any) => {
  const { text, unit } = props
  return <ValueAxis.Label {...props} text={`${text} ${unit || ''}`} />
}

const TooltipContent: React.FunctionComponent<any> = ({
  graphData,
  argumentField,
}) => {
  const classes = useStyles()
  const TooltipContentComponent: React.FunctionComponent<any> = props => {
    const targetElement = props.targetItem
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={classes.tooltiptext}>
          {_.map(graphData[targetElement.point], (value, key) => (
            <Typography variant='body2' key={`tooltipText${key}`}>
              <>
                {_.truncate(_.startCase(key), { length: 15 })} :
                {_.isDate(value)
                  ? moment
                      .default(value)
                      .format(environment.localFormat.dateTime)
                  : Number(value).toFixed(2)}
              </>
            </Typography>
          ))}
        </div>
      </div>
    )
  }
  return <Tooltip contentComponent={TooltipContentComponent} />
}

const GraphBaseLegend: React.FunctionComponent<{
  data: any[]
  argumentField: string
  selection: any
  valueField?: string
  options?: IGraphLineOption
  optionStyle?: any
  onUpdateSelection?: any
}> = ({
  data,
  optionStyle = {},
  argumentField,
  selection,
  valueField,
  options = {
    ArgumentScale: '',
    ValueScale: '',
    customPrepareGraphData: null,
    includeLegend: false,
    type: 'line',
    valueUnit: '',
  },
  onUpdateSelection,
}) => {
  const [graphData, setGraphData] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    if (data) {
      prepareGraphData(data)
    }
  }, [])
  const prepareGraphData = (data: any) => {
    let newValue: any[] = []
    if (!options.customPrepareGraphData) {
      newValue = _.chain(data)
        .map(item => {
          const objectData = _.reduce(
            valueField ? item[valueField] : item['valueModal'],
            (acc, v) => {
              const key = _.camelCase(v.code)
              return {
                ...acc,
                [key]: v.value,
              }
            },
            {},
          )
          return {
            ...objectData,
            [argumentField]: item[argumentField],
          }
        })
        .value()
    } else {
      newValue = options.customPrepareGraphData(data)
    }

    setGraphData(newValue)
    setIsLoading(false)
  }
  if (isLoading) {
    return null
  }

  const renderGraph = (type?: 'line' | 'area') => {
    switch (type) {
      case 'line':
        return (
          <GraphLine
            graphData={graphData}
            argumentField={argumentField}
            options={options}
            optionStyle={optionStyle}
            selection={selection}
            onUpdateSelection={onUpdateSelection}
          />
        )
      case 'area':
        return (
          <GraphArea
            graphData={graphData}
            argumentField={argumentField}
            options={options}
            optionStyle={optionStyle}
          />
        )
      default:
        return (
          <GraphLine
            graphData={graphData}
            argumentField={argumentField}
            options={options}
            optionStyle={optionStyle}
          />
        )
    }
  }

  return renderGraph(options.type)
}

export const GraphLine: React.FunctionComponent<any> = ({
  graphData,
  argumentField,
  options,
  optionStyle,
  selection,
  onUpdateSelection,
}) => {
  const { width, height, standardSize } = useWindowSize()

  if (_.isEmpty(graphData)) {
    return (
      <Typography
        variant='body1'
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          minHeight: 400,
        }}
      >
        {' '}
        No Data for display
      </Typography>
    )
  }

  const handleOnClick = (event: any, item: any) => {
    if (onUpdateSelection) {
      onUpdateSelection(item.children[0].props.name)
    }
  }

  const LegendRoot = (props: any) => {
    return (
      // <Grid container>
      <Legend.Root
        {...props}
        style={{
          display: 'flex',
          margin: 'auto',
          flexDirection: 'row',
        }}
      />
      // </Grid>
    )
  }

  const LegendItem = (props: any) => {
    return (
      // <Grid item xs={3}>
      <Legend.Item
        {...props}
        onClick={(event: any) => handleOnClick(event, props)}
        style={{
          flexDirection: 'column',
          marginLeft: '-2px',
          marginRight: '-2px',
        }}
      />
      // </Grid>
    )
  }

  const LegendLabel = (props: any) => {
    const select = _.find(selection, (it, key) => key === props.text)
    return (
      <span style={{ textDecoration: select ? 'none' : 'line-through' }}>
        {props.text}
      </span>
    )
  }

  return (
    <Chart
      height={optionStyle.height}
      width={optionStyle.width}
      data={graphData}
    >
      {options.ArgumentScale}
      {options.ValueScale}

      <ArgumentAxis />
      <ValueAxis
        labelComponent={props => (
          <ValueLabel {...props} unit={options.valueUnit} />
        )}
      />
      {_.map(graphData[0], (value, key) => {
        if (key === argumentField) {
          return
        }
        return (
          <React.Fragment key={key}>
            <CustomSplineSeries
              selection={selection}
              name={_.startCase(key)}
              valueField={key}
              argumentField={argumentField}
              optionStyle={MAP_COLOR_WITH_OBSERVATION[key]}
            />
          </React.Fragment>
        )
      })}
      <EventTracker />
      <TooltipContent graphData={graphData} argumentField={argumentField} />
      {options.includeLegend ? (
        _.includes(
          options.standardSizeForResizeLegendToBottom,
          standardSize,
        ) ? (
          <Legend
            key={`legend-bottom${standardSize}`}
            position={'bottom'}
            markerComponent={Marker}
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
          />
        ) : (
          <Legend
            key={`legend-right${standardSize}`}
            markerComponent={Marker}
          />
        )
      ) : null}
    </Chart>
  )
}

const CustomSplineSeries: React.FunctionComponent<any> = ({
  name,
  optionStyle,
  valueField,
  argumentField,
  selection,
}) => {
  const Point = (type: any, styles: any) => (props: any) => {
    const { arg, val, color } = props
    const select = _.find(selection, (it, key) => key === name)
    if (select) {
      return (
        <path
          fill={_.get(optionStyle, 'color') || color}
          transform={`translate(${arg} ${val})`}
          d={symbol().type(type)() as string}
          style={styles}
        />
      )
    } else {
      return null
    }
  }
  const CirclePoint = Point(symbolCircle, {
    stroke: 'grey',
    strokeWidth: '2px',
  })
  const LineWithCirclePoint = (props: any) => {
    return (
      <>
        <SplineSeriesMat.Path
          {...props}
          color={_.get(optionStyle, 'color') || props.color}
        />
        <ScatterSeries.Path {...props} pointComponent={CirclePoint} />
      </>
    )
  }
  const select = _.find(selection, (it, key) => key === name)
  if (select) {
    return (
      <SplineSeries
        name={name}
        valueField={valueField}
        argumentField={argumentField}
        seriesComponent={LineWithCirclePoint}
      />
    )
  }
  return (
    <SplineSeries
      name={name}
      valueField={valueField}
      argumentField={argumentField}
      seriesComponent={() => null}
    />
  )
}

export const GraphArea: React.FunctionComponent<any> = ({
  graphData,
  argumentField,
  options,
  optionStyle,
}) => {
  if (_.isEmpty(graphData)) {
    return (
      <Typography
        variant='body1'
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          minHeight: 400,
        }}
      >
        {' '}
        No Data for display
      </Typography>
    )
  }
  return (
    <Chart
      height={optionStyle.height}
      width={optionStyle.width}
      data={graphData}
    >
      {options.ArgumentScale}
      {options.ValueScale}

      <ArgumentAxis />
      <ValueAxis
        labelComponent={props => (
          <ValueLabel {...props} unit={_.get(options, 'valueUnit')} />
        )}
      />
      {_.map(graphData[0], (value, key) => {
        if (key === argumentField) {
          return
        }
        return (
          <React.Fragment key={key}>
            <CustomAreaSeries
              name={_.startCase(key)}
              valueField={key}
              argumentField={argumentField}
              optionStyle={optionStyle}
              // optionStyle={MAP_COLOR_WITH_OBSERVATION[key]}
            />
          </React.Fragment>
        )
      })}
      <EventTracker />
      <TooltipContent graphData={graphData} argumentField={argumentField} />
      {options.includeLegend ? <Legend /> : null}
    </Chart>
  )
}

const CustomAreaSeries: React.FunctionComponent<any> = ({
  name,
  optionStyle,
  valueField,
  argumentField,
}) => {
  const Point = (type: any, styles: any) => (props: any) => {
    const { arg, val, color } = props
    return (
      <path
        fill={_.get(optionStyle, 'color') || props.color}
        transform={`translate(${arg} ${val})`}
        d={symbol().type(type)() as string}
        style={styles}
      />
    )
  }
  const CirclePoint = Point(symbolCircle, {
    stroke: 'grey',
    strokeWidth: '2px',
  })

  const Area = (props: any) => (
    <>
      <AreaSeries.Path
        {...props}
        color={_.get(optionStyle, 'color') || props.color}
        path={area()
          .x((props: any) => props.arg)
          .y1((props: any) => props.val)
          .y0((props: any) => props.startVal)
          .curve(curveCatmullRom)}
      />
      <ScatterSeries.Path
        {...props}
        color={_.get(optionStyle, 'color') || props.color}
        pointComponent={CirclePoint}
      />
    </>
  )
  return (
    <AreaSeries
      name={name}
      valueField={valueField}
      argumentField={argumentField}
      seriesComponent={Area}
    />
  )
}

export default GraphBaseLegend
