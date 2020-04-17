import * as React from 'react'

import {
  AppBar,
  Badge,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Typography,
} from '@material-ui/core'
import map from 'lodash/map'
import Truncate from './Truncate'

export interface ITabList {
  type: string
  totalCount: number
}

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
    marginTop: '-7px',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  truncateContainer: {
    height: '36px',
    padding: theme.spacing(1),
  },
}))
function a11yProps(index: number) {
  return {
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
    id: `scrollable-auto-tab-${index}`,
  }
}

const TabGroup: React.FunctionComponent<{
  tabList: ITabList[]
  onTabChange: (selectedValue: string) => void
  keyField?: string
}> = ({ tabList, onTabChange, keyField = 'type' }) => {
  const classes = useStyles()
  const [navigate, setNavigate] = React.useState<string>(tabList[0].type)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    onTabChange(newValue)
    setNavigate(newValue)
  }
  return (
    <AppBar position='static' color='default' className={classes.root}>
      <Tabs
        value={navigate}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='scrollable'
        scrollButtons='auto'
        aria-label='scrollable auto tabs example'
      >
        {map(tabList, (tab: any, index: number) => (
          <Tab
            style={{ height: '70px' }}
            label={
              <Badge
                color='primary'
                badgeContent={tab.totalCount}
                className={classes.margin}
                max={999}
              >
                <Typography
                  component='div'
                  variant='body2'
                  className={classes.truncateContainer}
                >
                  <Truncate size={2}>{tab[keyField]}</Truncate>
                </Typography>
              </Badge>
            }
            {...a11yProps(index)}
            value={tab[keyField]}
            key={tab[keyField] + index}
            data-testid={tab[keyField]}
          />
        ))}
      </Tabs>
    </AppBar>
  )
}
export default TabGroup
