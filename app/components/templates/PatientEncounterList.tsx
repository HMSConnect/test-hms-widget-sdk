import * as React from 'react'

import environment from '@environment'
import {
  Avatar,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  Icon,
  IconButton,
  lighten,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import map from 'lodash/map'
import min from 'lodash/min'
import * as moment from 'moment'

const useStyles = makeStyles((theme: Theme) => ({
  contentText: {
    color: theme.palette.text.primary,
    fontWeight: 'normal',
  },
  headerText: {
    fontWeight: 450,
  },
  iconAvatar: {
    backgroundColor: theme.palette.nonary?.main,
    height: 50,
    margin: 10,
    width: 50,
    zIndex: 300,
  },
  inline: {
    display: 'inline',
    textAlign: 'right',
  },
  listButton: {
    '&:hover': {
      backgroundColor: theme.palette.nonary?.light || '',
    },
  },
  itemSelected: {
    backgroundColor: `${theme.palette.nonary?.light || ''}!important`,
  },
  line: {
    borderLeft: `10px solid ${theme.palette.nonary?.main}`,
    height: '100%',
    marginLeft: '6.7rem',
    // left: '10%',
    position: 'absolute',
    zIndex: 100,
  },
  lineColapse: {
    borderLeft: `10px solid ${theme.palette.nonary?.main}`,
    height: '100%',
    marginLeft: '7.7rem',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {},
  topicTitle: {
    color: theme.palette.text.secondary,
  },
}))

const PatientEncounterList: React.FunctionComponent<{
  entryList: any[]
  onEntrySelected: (event: React.MouseEvent, selectedEncounter: any) => void
  selectedEncounterId?: any
  isLoading?: boolean
  isMore?: boolean
  onLazyLoad?: (event: any, type?: string) => void
}> = ({
  entryList,
  onEntrySelected,
  isLoading,
  isMore,
  onLazyLoad,
  selectedEncounterId,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    findIndex(entryList, { id: selectedEncounterId }),
  )

  React.useEffect(() => {
    const activeIndex = findIndex(entryList, {
      id: selectedEncounterId,
    })
    if (activeIndex >= 0) {
      setSelectedIndex(activeIndex)
    }
  }, [entryList])
  const handleEncounterSelected = (
    event: React.MouseEvent,
    selectedEncounter: any,
    index: number,
  ) => {
    setSelectedIndex(index)
    onEntrySelected(event, selectedEncounter)
  }
  return (
    <>
      <List disablePadding={true} aria-labelledby='nested-list-subheader'>
        {map(entryList, (entry, index) => (
          <React.Fragment key={'encounterItem' + index}>
            <EncounterListItem
              data={entry}
              onEntrySelected={handleEncounterSelected}
              index={index}
              selectedIndex={selectedIndex}
            />
            <Divider />
          </React.Fragment>
        ))}
        {isMore ? (
          <ListItem style={{ textAlign: 'center' }}>
            {isLoading ? (
              <ListItemText style={{ textAlign: 'center' }}>
                <CircularProgress />
              </ListItemText>
            ) : onLazyLoad ? (
              <ListItemSecondaryAction>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={onLazyLoad}
                >
                  <Typography variant='body1'>Load More</Typography>
                </Button>
              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
        ) : null}
      </List>
    </>
  )
}

export default PatientEncounterList

const EncounterListItem: React.FunctionComponent<{
  data: any
  selectedIndex: number
  index: number
  onEntrySelected: (
    event: React.MouseEvent,
    selectedEncounter: any,
    index: number,
  ) => void
}> = ({ data, onEntrySelected, index, selectedIndex }) => {
  const [open, setOpen] = React.useState(false)

  const handleClick = (event: any, data: any, index: any) => {
    onEntrySelected(event, data, index)
    // setOpen(!open)
  }
  const classes = useStyles()
  React.useEffect(() => {
    setOpen(selectedIndex === index)
  }, [selectedIndex])
  const renderIcon = (index?: number) => {
    let randomMath = 0
    if (index) {
      randomMath = index % 3
    }
    const setIcon = [
      'fas fa-clinic-medical',
      'fas fa-hospital',
      'fas fa-hospital-alt',
    ]
    return (
      <Avatar alt={`avater ${index}`} className={classes.iconAvatar}>
        <Icon
          className={setIcon[randomMath]}
          style={{ width: '1.5em', textAlign: 'center' }}
        />
      </Avatar>
    )
  }
  const renderGroupName = (participants: any, maxDisplay: number) => {
    if (isEmpty(participants)) {
      return 'Unknow'
    }
    const displayNames = []
    const minNumber = min([participants.length, maxDisplay])
    for (
      let i = 0;
      get(participants[i], 'name[0].given[0]') !== undefined && i < minNumber;
      i++
    ) {
      displayNames.push(get(participants[i], 'name[0].given[0]'))
    }
    return `${join(displayNames, ', ')} ${
      participants.length - minNumber > 0 ? '...' : ''
    }`
  }

  const renderDiagnosisGroup = (conditions: any, maxDisplay: number) => {
    if (isEmpty(conditions)) {
      return 'Unknow'
    }
    const displayNames = []
    const minNumber = min([conditions.length, maxDisplay])
    for (
      let i = 0;
      get(conditions[i], 'codeText') !== undefined && i < minNumber;
      i++
    ) {
      displayNames.push(get(conditions[i], 'codeText'))
    }
    return `${join(displayNames, ', ')} ${
      conditions.length - minNumber > 0 ? '...' : ''
    }`
  }
  return (
    <>
      <ListItem
        classes={{
          button: classes.listButton,
          selected: classes.itemSelected,
        }}
        button
        onClick={event => handleClick(event, data, index)}
        selected={selectedIndex === index}
      >
        <div className={classes.line}></div>
        <ListItemIcon>
          <>
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'
              style={{
                alignItems: 'center',
                display: 'flex',
                // backgroundColor: 'lightblue',
                justifyContent: 'center',
                width: '150%',
              }}
            >
              {moment
                .default(get(data, 'startTime'))
                .format(environment.localFormat.date)}
              <br />
              {moment
                .default(get(data, 'startTime'))
                .format(environment.localFormat.time)}
            </Typography>
            {renderIcon(index)}
          </>
        </ListItemIcon>
        <ListItemText
          style={{ padding: '1em 0' }}
          secondary={
            <>
              <Typography
                component='span'
                variant='body1'
                className={clsx(classes.inline, classes.headerText)}
                color='textPrimary'
              >
                {get(data, 'organization.display') || 'Unknow'}
              </Typography>{' '}
              <br />
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='textSecondary'
              >
                {get(data, 'status') || 'Unknow'}
              </Typography>
            </>
          }
        />
        <ListItemSecondaryAction>
          {/* <IconButton
            edge='end'
            aria-label='comments'
            onClick={event => onEntrySelected(event, data, index)}
          >
            <CommentIcon />
          </IconButton> */}
          <IconButton
            edge='end'
            aria-label='show all'
            onClick={event => handleClick(event, data, index)}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div className={classes.lineColapse}></div>
          </div>
          <div style={{ flex: 10 }}>
            <List component='div'>
              <ListItem
                className={classes.nested}
                // onClick={event => onEntrySelected(event, data, index)}
              >
                <ListItemText
                  primary={
                    <>
                      <div>
                        <Typography
                          variant='body2'
                          component='span'
                          className={classes.topicTitle}
                        >
                          ประเภทการรักษา :{' '}
                        </Typography>
                        <Typography
                          variant='body2'
                          component='span'
                          className={classes.contentText}
                        >
                          {get(data, 'type') || 'Unknow'}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant='body2'
                          component='span'
                          className={classes.topicTitle}
                        >
                          ผลการวินิจฉัย :{' '}
                        </Typography>
                        <Typography
                          variant='body2'
                          component='span'
                          className={classes.contentText}
                        >
                          {/* {get(data, 'reason') || 'Unknow'} */}
                          {get(data, 'diagnosis')
                            ? renderDiagnosisGroup(get(data, 'diagnosis'), 5)
                            : 'Unknow'}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant='body2'
                          component='span'
                          className={classes.topicTitle}
                        >
                          Class Code :{' '}
                        </Typography>
                        <Typography
                          variant='body2'
                          component='span'
                          className={classes.contentText}
                        >
                          {get(data, 'classCode') || 'Unknow'}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant='body2'
                          component='span'
                          className={classes.topicTitle}
                        >
                          Practitioner :{' '}
                        </Typography>
                        <Typography
                          variant='body2'
                          component='span'
                          className={classes.contentText}
                        >
                          {get(data, 'participant')
                            ? renderGroupName(get(data, 'participant'), 5)
                            : 'Unknow'}
                          {/* {get(data, 'participant[0].name') || 'Unknow'} */}
                        </Typography>
                      </div>
                    </>
                  }
                />
              </ListItem>
            </List>
          </div>
        </div>
      </Collapse>
    </>
  )
}
