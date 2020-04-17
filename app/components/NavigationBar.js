import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  icon: { marginRight: theme.spacing(2) },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: 16,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 350,
  },
  iconButton: { padding: 10, color: '#fff' },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: { color: 'inherit' },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function NavigationBar(props) {
  const classes = useStyles();
  const { brand } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Avatar alt={brand.alt} src={brand.src} className={classes.icon} />
          <Typography className={classes.title} variant="h6" noWrap>
            {brand.name}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
          
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="end"
            onClick={props.toggleDrawer('right', true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}