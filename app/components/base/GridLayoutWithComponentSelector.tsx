import { makeStyles, Theme } from '@material-ui/core'
import { toNaturalName } from '@utils'
import _ from 'lodash'
import React from 'react'
import GridLayout from './GridLayout'
import SimpleDialog from './SimpleDialog'

const useStyles = makeStyles((theme: Theme) => ({
  addCicleIcon: {
    fontSize: '2em',
  },
  cardResetButton: {
    position: 'absolute',
    right: -8,
    top: -8,
  },
  selectorCardLayout: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
}))

const GridLayoutWithComponentSelector: React.FunctionComponent<{
  componentResource: any
  defaultItems: any
}> = ({ componentResource, defaultItems = [] }) => {
  const classes = useStyles()
  const gridSelectorRef = React.useRef<any>()
  const [isShowComponentSelect, setIsShowComponentSelect] = React.useState(
    false,
  )

  function getComponent(selectKey: string) {
    return componentResource[selectKey]
  }

  function handleItemAdd() {
    setIsShowComponentSelect(true)
    // return true; for manual add;
    return true
  }

  function handleComponentSelectClose(select: any) {
    setIsShowComponentSelect(false)

    if (gridSelectorRef?.current?.addItem && select?.value) {
      const selectKey = select?.value
      const componentSelected = getComponent(selectKey)

      const newItem = {
        componentKey: selectKey,
        ...componentSelected.layout,
      }
      gridSelectorRef.current.addItem(newItem)
    } else {
      // tslint:disable-next-line: no-console
      console.error('not found grid selector reference.')
    }
  }

  function handleItemRender(item: any) {
    const componentSelected = getComponent(item.componentKey)
    return componentSelected.component
  }

  const simpleDialogList = _.map(
    componentResource,
    (c: any, componentName: string) => {
      return { label: toNaturalName(componentName), value: componentName }
    },
  )

  return (
    <div>
      <GridLayout
        data-testid='grid-selector'
        ref={gridSelectorRef}
        defaultItems={defaultItems}
        onItemAdd={handleItemAdd}
        renderItem={handleItemRender}
      />
      <SimpleDialog
        id={'select-component'}
        open={isShowComponentSelect}
        dialogTitle={'Choose Component'}
        onDialogClose={handleComponentSelectClose}
        list={simpleDialogList}
      />
    </div>
  )
}

export default GridLayoutWithComponentSelector
