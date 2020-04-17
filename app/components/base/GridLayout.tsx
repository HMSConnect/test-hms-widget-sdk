import React from 'react'

import { Button, makeStyles, Paper, Theme } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { GoogleAnalytics } from '@services/GoogleAnalyticsService'
import * as _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import TrackerMouseClick from './TrackerMouseClick'

const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    overflow: 'hidden',
  },
  gridSelectionLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 8,
  },
  remove: {
    color: '#80808080',
    cursor: 'pointer',
    position: 'absolute',
    right: '2px',
    top: '2px',
    zIndex: 9999,
  },
  searchFilter: {
    width: 180,
  },
}))

const ResponsiveGridLayout = WidthProvider(Responsive)
const initialGridSelectorState = {
  breakpoint: undefined,
  cols: undefined,
  items: [],
  key: 'default',
}

function gridSelectorReducer(
  state: any = initialGridSelectorState,
  action: any,
) {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: _.reject(state.items, { i: action.payload.i }),
      }
    case 'BREAKPOINT_CHANGE':
      return {
        ...state,
        ...action.payload,
      }
    case 'SAVE_LAYOUT':
      window.sessionStorage.setItem(
        action.payload.key,
        JSON.stringify(action.payload.items),
      )
      return {
        ...state,
        ...action.payload,
      }
    case 'RESET_LAYOUT':
      window.sessionStorage.setItem(
        action.payload.key,
        JSON.stringify(action.payload.items),
      )
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const GridLayout: React.FunctionComponent<{
  ref?: any
  defaultCols?: any
  name?: string
  defaultItems?: any[]
  onItemAdd?: () => any
  renderItem?: (item: any) => any
}> = React.forwardRef(
  (
    {
      name = 'gridSelector',
      defaultCols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      defaultItems = [],
      onItemAdd,
      renderItem,
    },
    ref,
  ) => {
    const [{ items, layout, cols }, dispatch] = React.useReducer(
      gridSelectorReducer,
      initialGridSelectorState,
    )

    const classes = useStyles()
    const handleLayoutChangeDebound = _.debounce(handleLayoutChange, 500)

    // for passing child fn. to parent by reference
    React.useImperativeHandle(ref, () => ({ addItem }))

    React.useEffect(() => {
      const resotoreItems = restoreItems()
      dispatch({
        payload: {
          items: resotoreItems,
        },
        type: 'INIT',
      })
    }, [defaultItems])

    function restoreItems() {
      const layout: any = window.sessionStorage.getItem('layout')
      if (!_.isEmpty(layout)) {
        return mappingItems(JSON.parse(layout))
      }
      return defaultItems
    }

    function mappingItems(layout: any) {
      return _.map(layout, (l: any) => {
        const iKey = l.i.split('_')
        const component = _.find(
          defaultItems,
          item => _.split(item.i, '_')[0] === iKey[0],
        )
        return {
          ...component,
          ...l,
        }
      })
    }

    function addItem(newItem: any = {}) {
      const nextIdx = items.length

      const item = {
        h: 2,
        // i: `init_${newItem.componentKey}`,
        i: `${newItem.componentKey}_${nextIdx}`,
        w: 2,
        x: (items.length * 2) % (cols || 12),
        y: Infinity, // puts it at the bottom
        ...newItem,
      }

      dispatch({
        payload: item,
        type: 'ADD_ITEM',
      })

      GoogleAnalytics.createEvent({
        action: 'add_component',
        category: 'patient_summary',
        label: `${newItem.componentKey}`,
      })
    }

    function saveLayout(layout: any) {
      dispatch({
        payload: {
          items: mappingItems(layout),
          key: 'layout',
        },
        type: 'SAVE_LAYOUT',
      })
    }

    function handleResetLayout() {
      dispatch({
        payload: {
          items: defaultItems,
          key: 'layout',
        },
        type: 'RESET_LAYOUT',
      })
    }

    function handleItemAdd() {
      if (onItemAdd) {
        // expect onItemAdd: boolean
        const isCancelItemAdd = onItemAdd()
        if (isCancelItemAdd) {
          return
        }
      }
      addItem()
    }

    function handleItemRemove(i: string, componentKey: string) {
      dispatch({
        payload: { i },
        type: 'REMOVE_ITEM',
      })
      GoogleAnalytics.createEvent({
        action: 'remove_component',
        category: 'patient_summary',
        label: `${componentKey}`,
      })
    }

    function handleLayoutChange(layout: any) {
      saveLayout(layout)
      dispatch({
        payload: layout,
        type: 'LAYOUT_CHANGE',
      })
    }

    function handleBreakpointChange(newBreakpoint: string, newCols: number) {
      // console.log('handle breakpoint change', newBreakpoint, newCols)
      dispatch({
        payload: {
          breakpoint: newBreakpoint,
          cols: newCols,
        },
        type: 'BREAKPOINT_CHANGE',
      })
      // handleResetLayout()
    }

    function handleWidthChange(
      containerWidth: number,
      margin: [number, number],
      cols: number,
      containerPadding: [number, number],
    ) {
      // console.log('handle width change', containerWidth)
      // console.log('margin :', margin);
      // console.log('cols :', cols);
      // console.log('containerPadding :', containerPadding);
    }

    function handleResizeStop(layout: any, oldItem: any, newItem: any) {
      const componentKey = newItem.i.split('_')[0]
      GoogleAnalytics.createEvent({
        action: 'resize',
        category: 'patient_summary',
        label: `(${newItem.w},${newItem.h}),(w,h)__${_.snakeCase(
          componentKey,
        )}`,
      })
    }

    function handleDragStop(layout: any, oldItem: any, newItem: any) {
      const componentKey = newItem.i.split('_')[0]
      GoogleAnalytics.createEvent({
        action: 'reposition',
        category: 'patient_summary',
        label: `(${newItem.x},${newItem.y}),(x,y)__${_.snakeCase(
          componentKey,
        )}`,
      })
    }

    function renderRemoveComponent(item: any) {
      return (
        <span
          className={classes.remove}
          onClick={() => handleItemRemove(item.i, item.componentKey)}
        >
          <CloseIcon fontSize={'small'} />
        </span>
      )
    }

    function createItem(item: any) {
      let renderComponent = <div key={item.i}>{item.i}</div>
      if (renderItem) {
        const SelectorComponent = renderItem(item)
        renderComponent = <SelectorComponent />
      } else {
        renderComponent = <>{item.i}</>
      }

      if (item.isCard) {
        return (
          <Paper key={item.i} className={classes.gridItem}>
            {renderComponent}
            {renderRemoveComponent(item)}
          </Paper>
        )
      }

      return (
        <div key={item.i} className={classes.gridItem}>
          {renderComponent}
          {renderRemoveComponent(item)}
        </div>
      )
    }

    return (
      <div data-testid='grid-selector'>
        <div className={classes.gridSelectionLayout}>
          <Button
            size='small'
            variant='outlined'
            onClick={handleResetLayout}
            style={{ marginRight: 8 }}
            data-testid='reset-button-grid-layout'
          >
            RESET
          </Button>
          <Button
            size='small'
            variant='outlined'
            onClick={handleItemAdd}
            data-testid='add-button-grid-layout'
          >
            Add +{' '}
          </Button>
        </div>
        <ResponsiveGridLayout
          className='layout'
          // margin={[10, 10]}
          // containerPadding={[10, 10]}
          layouts={{ lg: items }} // If not provided, use data-grid props on children
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={defaultCols}
          rowHeight={50}
          onLayoutChange={handleLayoutChangeDebound}
          onBreakpointChange={handleBreakpointChange}
          onWidthChange={handleWidthChange}
          onResizeStop={handleResizeStop}
          onDragStop={handleDragStop}
        >
          {items.map((item: any) => createItem(item))}
        </ResponsiveGridLayout>
      </div>
    )
  },
)

export default GridLayout
