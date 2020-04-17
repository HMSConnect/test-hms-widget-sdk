import React, { useState } from 'react'

import { IconButton, makeStyles, Paper, Theme } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import CancelIcon from '@material-ui/icons/Cancel'
import { toNaturalName } from '@utils'
import map from 'lodash/map'
import { ISimpleDialogItem } from './SimpleDialog'
import SimpleDialogWithIconButton from './SimpleDialogWithIconButton'

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

const GridCardSelector: React.FunctionComponent<{
  i: string
  restoreComponentName: string | undefined
  componentResource: any
  onComponentSelect?: any
}> = ({ i, restoreComponentName, componentResource, onComponentSelect }) => {
  const classes = useStyles()
  const [currentComponentName, setCurrentComponentName] = useState<
    string | null
  >(restoreComponentName || null)

  React.useEffect(() => {
    if (restoreComponentName) {
      setCurrentComponentName(restoreComponentName)
    }
  }, [restoreComponentName])

  const handleComponentSelect = (componentName: string) => {
    setCurrentComponentName(componentName)
    if (onComponentSelect) {
      onComponentSelect(componentName, i)
    }
  }

  const handleReset = () => {
    setCurrentComponentName(null)
    if (onComponentSelect) {
      onComponentSelect(undefined, i)
    }
  }

  const Component = currentComponentName
    ? componentResource[currentComponentName]
    : null

  const simpleDialogList = map(
    componentResource,
    (c: any, componentName: string) => {
      return { label: toNaturalName(componentName), value: componentName }
    },
  )
  return Component ? (
    <>
      <div className={classes.cardResetButton}>
        <IconButton
          color='primary'
          aria-label='reset card'
          data-testid='reset-icon-button'
          onClick={handleReset}
        >
          <CancelIcon color='action' fontSize='small' />
        </IconButton>
      </div>
      <Component i={i} style={{ width: '100%', height: '100%' }} />
    </>
  ) : (
    <Paper className={classes.selectorCardLayout}>
      <SimpleDialogWithIconButton
        dialogTitle='Choose Card'
        iconComponent={
          <AddCircleOutlineIcon
            className={classes.addCicleIcon}
            color='action'
            data-testid='add-icon-button'
          />
        }
        onDialogClose={(item: ISimpleDialogItem) => {
          if (item) {
            handleComponentSelect(item.value as string)
          }
        }}
        list={simpleDialogList}
      />
    </Paper>
  )
}

export default GridCardSelector
