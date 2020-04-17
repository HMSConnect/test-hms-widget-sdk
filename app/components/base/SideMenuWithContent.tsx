import * as React from 'react'

import environment from '@environment'
import {
  AppBar,
  Button,
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import ThemeSelect from './ThemeSelect'

const drawerWidth = 240
const useSideMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    content: {
      flexGrow: 1,
      marginLeft: -drawerWidth,
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    },
    contentShift: {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    drawer: {
      flexShrink: 0,
      width: drawerWidth,
    },
    drawerHeader: {
      alignItems: 'center',
      display: 'flex',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    hide: {
      display: 'none',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    root: {
      display: 'flex',
    },
  }),
)

const SideMenuWithContent: React.FunctionComponent<{
  renderMenuList: React.ReactElement
  appBarTitle?: string
  menuTitle?: string
}> = ({
  appBarTitle = 'Persistant Drawer',
  children,
  menuTitle = 'Menu',
  renderMenuList,
}) => {
  const classes = useSideMenuStyles()

  const [isOpen, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, isOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap style={{ flexGrow: 1 }}>
            {appBarTitle}
          </Typography>
          <ThemeSelect />
          <Typography variant='body1'>V. {environment.codeVersion}</Typography>
        </Toolbar>
      </AppBar>
      <SideMenu
        menuTitle={menuTitle}
        isOpen={isOpen}
        onDrawerClose={handleDrawerClose}
        aria-label='side-menu'
      >
        {renderMenuList}
      </SideMenu>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  )
}

export default SideMenuWithContent

export const SideMenu: React.FunctionComponent<{
  menuTitle?: string
  isOpen: boolean
  onDrawerClose: () => void
}> = ({ menuTitle = 'Menu', isOpen, onDrawerClose, children }) => {
  const classes = useSideMenuStyles()
  const theme = useTheme()
  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
      data-testid='drawer'
    >
      <div className={classes.drawerHeader}>
        <Button
          onClick={onDrawerClose}
          fullWidth
          size='large'
          endIcon={theme.direction === 'ltr' ? <ChevronLeftIcon /> : null}
        >
          {menuTitle}
        </Button>
      </div>
      <Divider />
      {children}
    </Drawer>
  )
}
