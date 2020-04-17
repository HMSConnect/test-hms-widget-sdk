import * as React from 'react'

import { GoogleAnalytics } from '@services/GoogleAnalyticsService'
import { FieldsObject } from 'react-ga'
import routes from '../../routes'

const Tracker: React.FunctionComponent<{
  options?: FieldsObject
}> = ({ children, options = {} }) => {
  React.useEffect(() => {
    GoogleAnalytics.trackPage(window.location.pathname, options)
  }, [routes.Router.router.pathname])
  return <>{children}</>
}

export default Tracker
