import * as React from 'react'

import {
  Badge,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { lighten } from '@material-ui/core/styles'
import FilterListIcon from '@material-ui/icons/FilterList'
import clsx from 'clsx'
import defaultsDeep from 'lodash/defaultsDeep'
import Truncate from './Truncate'

interface IToolbarWithFilterOption {
  style?: any
  headerClass?: any
  additionButton?: any
  isHideIcon?: boolean
}
const useStyles = makeStyles((theme: Theme) => {
  return {
    additionInputLayout: {
      flex: '2 2 100%',
      textAlign: 'end',
    },
    anchorOriginTopLeftRectangle: {
      top: '10px',
    },
    anchorOriginTopRightRectangle: {
      top: '10px',
    },
    highlight: {
      backgroundColor: theme.palette.tertiary?.light || '',
      color: theme.palette.tertiary?.main || '',
    },
    iconContainer: {
      alignItems: 'center',
      display: 'flex',
      marginRight: '8px',
    },
    margin: {
      margin: theme.spacing(1),
    },
    root: {
      // height: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
  }
})

const ToolbarWithFilter: React.FC<{
  title?: string
  onClickIcon?: (event: any) => void
  Icon?: any
  filterActive?: number
  option?: IToolbarWithFilterOption
}> = ({
  onClickIcon,
  children,
  title = 'Toolbar Title',
  Icon,
  filterActive = 0,
  option = {
    isHideIcon: true,
    style: undefined,
  },
}) => {
  const classes = useStyles()
  const toolbarOption = React.useMemo(() => {
    return defaultsDeep(option, {
      additionButton: undefined,
      isHideIcon: false,
      style: undefined,
    })
  }, [option])
  return (
    <>
      <Toolbar
        variant='dense'
        className={clsx(
          classes.root,
          {
            [classes.highlight]: !toolbarOption.headerClass,
          },
          toolbarOption.headerClass,
        )}
        style={toolbarOption.style}
      >
        <Typography
          // className={classes.title}
          variant='h6'
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          {Icon ? <div className={classes.iconContainer}>{Icon}</div> : null}
          <div>
            <Truncate size={1}>{title}</Truncate>
          </div>
        </Typography>
        {toolbarOption.additionButton ? (
          <div className={classes.additionInputLayout}>
            {toolbarOption.additionButton}
          </div>
        ) : null}

        {toolbarOption.isHideIcon ? null : (
          <Tooltip title='Filter list'>
            <Badge
              color='secondary'
              badgeContent={filterActive}
              classes={{
                anchorOriginTopLeftRectangle:
                  classes.anchorOriginTopLeftRectangle,
                anchorOriginTopRightRectangle:
                  classes.anchorOriginTopRightRectangle,
              }}
              anchorOrigin={{
                horizontal: 'left',
                vertical: 'top',
              }}
              // className={classes.margin}
              max={999}
            >
              <IconButton
                data-testid='toolbar-filter-icon'
                aria-label='filter list'
                onClick={onClickIcon}
              >
                <FilterListIcon />
              </IconButton>
            </Badge>
          </Tooltip>
        )}
      </Toolbar>

      {children}
    </>
  )
}

export default ToolbarWithFilter
