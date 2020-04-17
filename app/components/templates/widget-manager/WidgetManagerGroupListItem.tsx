import { Collapse, Divider, ListItem, ListItemText } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import React from 'react'

const WidgetManagerGroupListItem: React.FunctionComponent<{
  widget: any
}> = ({ widget, children }) => {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={widget.label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Divider />
      <Collapse in={open} timeout='auto' unmountOnExit>
        {children}
      </Collapse>
    </React.Fragment>
  )
}

export default WidgetManagerGroupListItem
