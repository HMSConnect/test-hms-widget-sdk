import {
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core'
import _ from 'lodash'
import * as React from 'react'
import WidgetManagerGroupListItem from './WidgetManagerGroupListItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
)

const WigetManagerMenuList: React.FunctionComponent<any> = ({
  widgetGroup,
  selectedWidget,
  onItemClick,
}) => {
  const classes = useStyles()
  return (
    <List component='nav' aria-labelledby='nested-list-subheader'>
      {_.map(widgetGroup, (widget, index) => (
        <React.Fragment key={index}>
          {widget.child.length > 1 ? (
            <WidgetManagerGroupListItem widget={widget}>
              <List component='div' disablePadding>
                {_.map(widget.child, (widgetChild, index) => (
                  <React.Fragment key={'widget ' + widget.label + ' ' + index}>
                    <ListItem
                      selected={
                        _.get(selectedWidget, 'label') === widgetChild.label
                      }
                      button
                      onClick={() => onItemClick(widgetChild)}
                      className={classes.nested}
                    >
                      <ListItemText primary={widgetChild.label} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </WidgetManagerGroupListItem>
          ) : (
            <>
              <ListItem
                selected={_.get(selectedWidget, 'label') === widget.label}
                button
                onClick={() => onItemClick(widget)}
              >
                <ListItemText primary={widget.label} />
              </ListItem>
              <Divider />
            </>
          )}
        </React.Fragment>
      ))}
    </List>
  )
}

export default WigetManagerMenuList
