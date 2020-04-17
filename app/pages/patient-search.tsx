import * as React from 'react'

import { withAuthSync } from '@components/base/Auth'
import BreadcrumbsBase from '@components/base/BreadcrumbsBase'
import Tracker from '@components/base/Tracker'
import { IPaginationOption, ISortType } from '@components/hooks/usePatientList'
import BootstrapWrapper from '@components/init/BootstrapWrapper'
import { IPatientFilterValue } from '@components/templates/patient/PatientFilterBar'
import AppNavBar from '@components/widget/AppNavBar'
import PatientSearch from '@components/widget/patient/PatientSearch'
import {
  Container,
  CssBaseline,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { parse } from '@utils'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  body: {},
  root: {},
}))

export interface IStatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const PatientSearchView: IStatelessPage<{
  query: IPaginationOption
}> = ({ query }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <BootstrapWrapper dependencies={['patient']}>
        <Tracker>
          <>
            <AppNavBar />
            <Container maxWidth='lg' className={classes.root}>
              <Typography component='div' className={classes.body}>
                <BreadcrumbsBase
                  currentPath='Patient Search'
                  parentPath={[
                    {
                      icon: <HomeIcon />,
                      label: 'Home',
                      url: '/',
                    },
                  ]}
                ></BreadcrumbsBase>
                <PatientSearch query={query} name={_.get(query, 'name')} />
              </Typography>
            </Container>
          </>
        </Tracker>
      </BootstrapWrapper>
    </React.Fragment>
  )
}

PatientSearchView.getInitialProps = async (ctx: any) => {
  return {
    query: initialPagination(ctx.query),
  }
}

export function initialPagination(query: any) {
  const initialFilter: IPatientFilterValue = {
    gender: 'all',
    searchText: '',
  }

  const initialSort: ISortType = {
    order: 'asc',
    orderBy: 'id',
  }

  query = parse(query)

  return {
    filter: _.isEmpty(query.filter) ? initialFilter : query.filter,
    max: query.max ? Number(query.max) : 10,
    offset: query.offset ? Number(query.offset) : 0,
    page: query.page ? Number(query.page) : 0,
    sort: _.isEmpty(query.sort) ? initialSort : query.sort,
  }
}

export default withAuthSync(PatientSearchView)
