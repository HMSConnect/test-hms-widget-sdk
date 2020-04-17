import * as React from 'react'

import {
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import map from 'lodash/map'
import startCase from 'lodash/startCase'

export interface IResourceMenu {
  resourceType: string
  data: any
  totalCount: number
}

const mapMenuListWithIcon = (menuList: IResourceMenu[]) => {
  return map(menuList, (value, key) => {
    switch (value.resourceType) {
      case 'patient':
        return {
          ...value,
          iconClassName: 'fas fa-address-card',
        }
      case 'condition':
        return {
          ...value,
          iconClassName: 'fas fa-clipboard',
        }
      case 'allergy_intolerance':
        return {
          ...value,
          iconClassName: 'fas fa-allergies',
        }
      case 'diagnostic_report':
        return {
          ...value,
          iconClassName: 'fas fa-diagnoses',
        }
      case 'medication_request':
        return {
          ...value,
          iconClassName: 'fas fa-pills',
        }
      case 'claim':
        return {
          ...value,
          iconClassName: 'fas fa-dollar-sign',
        }
      case 'care_plan':
        return {
          ...value,
          iconClassName: 'fas fa-solar-panel',
        }
      case 'procedure':
        return {
          ...value,
          iconClassName: 'fas fa-procedures',
        }
      case 'immunization':
        return {
          ...value,
          iconClassName: 'fas fa-syringe',
        }
      case 'encounter':
        return {
          ...value,
          iconClassName: 'fas fa-book-reader',
        }
      case 'observation':
        return {
          ...value,
          iconClassName: 'fas fa-poll',
        }
      case 'imaging_study':
        return {
          ...value,
          iconClassName: 'fas fa-x-ray',
        }
      default:
        return value
    }
  })
}

const useStyles = makeStyles((theme: Theme) => ({
  circle: {
    backgroundColor: grey[400],
    borderColor: grey[400],
    borderRadius: '50%',
    borderStyle: 'solid',
    width: '2em',
  },
  paper: {
    marginRight: theme.spacing(2),
    width: '100%',
  },
  root: {
    display: 'flex',
  },
  tabs: {
    marginRight: theme.spacing(2),
    width: '100%',
  },
}))
const PatientMenuList: React.FunctionComponent<{
  menuList: IResourceMenu[]
  navigate: string
  onNavigateChange: (newNavigate: string) => void
}> = ({ menuList, onNavigateChange, navigate }) => {
  const classes = useStyles()
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    onNavigateChange(newValue)
  }

  const menuListWithIcon: any = React.useMemo<any>(() => {
    return mapMenuListWithIcon(menuList)
  }, [menuList])

  const renderIcon = (menu: any) => {
    if (menu.iconClassName) {
      return (
        <ListItemIcon>
          <Icon
            className={menu.iconClassName}
            color='primary'
            style={{ width: '1.5em', textAlign: 'center' }}
          />
        </ListItemIcon>
      )
    }
  }

  return (
    <div className={classes.root}>
      <List
        component='nav'
        aria-label='main mailbox folders'
        className={classes.paper}
      >
        {map(menuListWithIcon, (menu: any) => (
          <div key={menu.resourceType}>
            <Divider />
            <ListItem
              button
              selected={navigate === menu.resourceType}
              onClick={event => handleChange(event, menu.resourceType)}
            >
              {renderIcon(menu)}

              <ListItemText primary={startCase(menu.resourceType)} />
              <ListItemSecondaryAction className={classes.circle}>
                <div style={{ textAlign: 'center' }}>{menu.totalCount}</div>
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  )
}
export default PatientMenuList
