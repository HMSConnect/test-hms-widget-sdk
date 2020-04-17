import * as React from 'react'

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

export interface ISimpleDialogItem {
  label: string
  value: string | number
}

const SimpleDialog: React.FunctionComponent<{
  list: ISimpleDialogItem[]
  open: boolean
  onDialogClose?: (item: null | ISimpleDialogItem) => void
  id?: string
  buttonText?: string
  dialogTitle?: string
}> = ({
  id = 'simple-dialog-title',
  onDialogClose,
  list,
  open,
  dialogTitle = 'Simple Dialog',
}) => {
  return (
    <Dialog
      onClose={() =>
        onDialogClose ? onDialogClose(null) : console.info('Dialog Close')
      }
      aria-labelledby={id}
      open={open}
      data-testid='dialog'
    >
      <DialogTitle id={id} data-testid='dialog-title'>
        {dialogTitle}
      </DialogTitle>
      <List>
        {list.map((item: ISimpleDialogItem) => (
          <ListItem
            button
            onClick={() =>
              onDialogClose ? onDialogClose(item) : console.info('Dialog Close')
            }
            key={item.value}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default SimpleDialog
