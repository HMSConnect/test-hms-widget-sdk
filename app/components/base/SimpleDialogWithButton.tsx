import * as React from 'react'

import { Button } from '@material-ui/core'
import SimpleDialog, { ISimpleDialogItem } from './SimpleDialog'

export const SimpleDialogWithButton: React.FunctionComponent<{
  list: ISimpleDialogItem[]
  id?: string
  onDialogClose?: any
  buttonText?: string
  dialogTitle?: string
}> = ({
  id,
  onDialogClose,
  list,
  dialogTitle,
  buttonText = 'Dialog Simple Button',
}) => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (item: ISimpleDialogItem | null) => {
    setOpen(false)
    if (onDialogClose) {
      onDialogClose(item)
    }
  }

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <SimpleDialog
        id={id}
        open={open}
        dialogTitle={dialogTitle}
        onDialogClose={handleClose}
        list={list}
      />
    </>
  )
}
