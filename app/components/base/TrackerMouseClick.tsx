import * as React from 'react'

import { makeStyles, Theme } from '@material-ui/core'
import { GoogleAnalytics } from '@services/GoogleAnalyticsService'

const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    overflow: 'hidden',
  },
}))

const TrackerMouseClick: React.FunctionComponent<{
  category: string
  children: any
  label?: string
}> = ({ children, category, label = category }) => {
  const classes = useStyles()
  const handleOnClick = (event: any) => {
    GoogleAnalytics.createEvent({ category, action: 'click_component', label })
  }

  return React.cloneElement(children, { onClick: handleOnClick })
}

export default TrackerMouseClick
