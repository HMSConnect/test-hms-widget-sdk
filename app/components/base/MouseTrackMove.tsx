import * as React from 'react'

import useWindowSize from '@components/hooks/useWindowSize'
import { Fab, makeStyles, Theme } from '@material-ui/core'
import GridOffIcon from '@material-ui/icons/GridOff'
import GridOnIcon from '@material-ui/icons/GridOn'
import { GoogleAnalytics } from '@services/GoogleAnalyticsService'
import { fromEvent, interval } from 'rxjs'
import { debounce, filter, map } from 'rxjs/operators'

const useStyles = makeStyles((theme: Theme) => ({
  gridCell: (props: any) => ({
    background: 'rgba(0,0,0,0.12)',
    border: '1px solid black',
    height: props.height || 0,
    width: props.width || 0,
  }),
  gridContainer: {
    '&:hover': {
      backgroundColor: 'rgba(144, 202, 249, 0.75);',
    },
    position: 'absolute',
    zIndex: 100000,
  },
  showGridButton: {
    bottom: '10px',
    position: 'fixed',
    right: '10px',
    zIndex: 100010,
  },
}))

const MouseTrackMove: React.FunctionComponent<{
  category: string
  gridWidth?: number
  gridHeight?: number
}> = ({ category, children, gridWidth = 200, gridHeight = 200 }) => {
  const windowSize = useWindowSize()
  const [coord, setCoord] = React.useState({ x: undefined, y: undefined })
  const [bodySize, setBodySize] = React.useState({
    height: 0,
    temp: new Date(), // for call useMemo when document.body change without change value
    width: 0,
  })
  const [displayGridLayout, setDisplayGridLayout] = React.useState(false)
  const classes = useStyles({
    height: gridHeight,
    width: gridWidth,
  })

  React.useEffect(() => {
    setBodySize({
      height: document.body.clientHeight,
      temp: new Date(),
      width: document.body.clientWidth,
    })
  }, [document.body.clientHeight, document.body.clientWidth])

  React.useEffect(() => {
    const move$ = fromEvent(document, 'mousemove')
    const mouseSub = move$
      .pipe(
        debounce(() => interval(1000)),
        map((x: any) => {
          return {
            x: Math.floor(x.pageX / gridWidth),
            y: Math.floor(x.pageY / gridHeight),
          }
        }),
        filter((x: any) => {
          return x.x !== coord.x || x.y !== coord.y
        }),
      )
      .subscribe(x => {
        GoogleAnalytics.createEvent({
          action: 'mouse_move',
          category,
          label: `(x,y), (${x.x},${x.y})__${windowSize.standardSize}`,
        })
        setCoord(prev => {
          return { x: x.x, y: x.y }
        })
      })

    return () => {
      // console.log('unsub')
      mouseSub.unsubscribe()
    }
  })

  const handleClickGridLayout = (event: any) => {
    setDisplayGridLayout(prev => !prev)
  }
  const renderGrid = React.useMemo(() => {
    const grid = []
    const minNumCellx = Math.round((bodySize.width || 0) / gridWidth)
    const minNumCelly = Math.round((bodySize.height || 0) / gridHeight)

    for (let i = 0; i < minNumCellx; i++) {
      for (let j = 0; j < minNumCelly; j++) {
        grid.push(
          <div
            className={classes.gridContainer}
            style={{ top: `${j * gridWidth}px`, left: `${i * gridHeight}px` }}
            key={`grid-layout-(${i},${j})`}
          >
            <div className={classes.gridCell}>
              {i},{j}
            </div>
          </div>,
        )
      }
    }
    return grid
  }, [bodySize.width, bodySize.height, bodySize.temp])

  return (
    <>
      {displayGridLayout
        ? renderGrid.map((Component: any, index: number) => {
            return Component
          })
        : null}
      <div className={classes.showGridButton}>
        <Fab
          color='secondary'
          aria-label='edit'
          onClick={handleClickGridLayout}
        >
          {displayGridLayout ? <GridOffIcon /> : <GridOnIcon />}
        </Fab>
      </div>
      {children}
    </>
  )
}

export default MouseTrackMove
