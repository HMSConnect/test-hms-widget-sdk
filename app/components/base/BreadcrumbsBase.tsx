import React, { ReactElement } from 'react'

import {
  Breadcrumbs as BreadcrumbsMaterial,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import RouteManager from '@routes/RouteManager'
import get from 'lodash/get'
import map from 'lodash/map'
import routes from '../../routes'

export interface IBreadcrumbPath {
  url?: string
  label?: string
  icon?: ReactElement
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    height: 20,
    marginRight: theme.spacing(0.5),
    width: 20,
  },
  link: {
    display: 'flex',
  },
  root: {
    padding: theme.spacing(1, 2),
  },
}))

const BreadcrumbsBase: React.FunctionComponent<{
  parentPath: IBreadcrumbPath[]
  currentPath: string
  max?: number
}> = ({ parentPath, currentPath, max }) => {
  const classes = useStyles()

  const handleSelect = (path: IBreadcrumbPath) => {
    if (!path.url) {
      routes.Router.back()
    } else {
      const newPath = RouteManager.getPath(path.url)
      routes.Router.pushRoute(newPath)
    }
  }
  return (
    <Paper elevation={0} className={classes.root}>
      <BreadcrumbsMaterial aria-label='breadcrumb'>
        {map(parentPath, (parent: IBreadcrumbPath, index: number) => (
          <Link
            key={index}
            color='inherit'
            onClick={(event: React.MouseEvent) => handleSelect(parent)}
            className={classes.link}
            href='#'
          >
            {get(parent, 'icon') || null}
            {parent.label || ''}
          </Link>
        ))}
        <Typography color='textPrimary' className={classes.link}>
          {currentPath}
        </Typography>
      </BreadcrumbsMaterial>
    </Paper>
  )
}

export default BreadcrumbsBase
