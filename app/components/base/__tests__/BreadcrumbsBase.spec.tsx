import * as React from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { fireEvent, render } from '@testing-library/react'
import routes from '../../../routes'
import theme from '../../../src/theme'
import BreadcrumbsBase, { IBreadcrumbPath } from '../BreadcrumbsBase'

jest.mock('../../../routes', () => ({
  __esModule: true,
  default: {
    Router: {
      back: jest.fn(),
      pushRoute: jest.fn(),
      replaceRoute: jest.fn(),
    },
  },
}))

describe('<Breadcrumbs />', () => {
  it('render <Breadcrumbs />', () => {
    const parentPath: IBreadcrumbPath[] = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Patient Search',
        url: '/patient-search',
      },
    ]

    const currentPath = 'Patient Detail'

    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <BreadcrumbsBase parentPath={parentPath} currentPath={currentPath} />
      </ThemeProvider>,
    )

    expect(queryByText('Home')).toBeTruthy()
    expect(queryByText('Patient Search')).toBeTruthy()
    expect(queryByText('Patient Detail')).toBeTruthy()
  })

  it('click path without path.url <Breadcrumbs />', () => {
    const parentPath: IBreadcrumbPath[] = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Patient Search',
      },
    ]

    const currentPath = 'Patient Detail'

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <BreadcrumbsBase parentPath={parentPath} currentPath={currentPath} />
      </ThemeProvider>,
    )

    const patientSearchBreadElement = getByText('Patient Search')
    fireEvent.click(patientSearchBreadElement)

    const backFn = routes.Router.back

    expect(backFn).toBeCalled()
  })
  it('click path with path.url <Breadcrumbs />', () => {
    const parentPath: IBreadcrumbPath[] = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Patient Search',
        url: '/patient-search',
      },
    ]

    const currentPath = 'Patient Detail'

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <BreadcrumbsBase parentPath={parentPath} currentPath={currentPath} />
      </ThemeProvider>,
    )

    const patientSearchBreadElement = getByText('Patient Search')
    fireEvent.click(patientSearchBreadElement)

    const pushRouteFn = routes.Router.pushRoute

    expect(pushRouteFn).toBeCalled()
    expect(pushRouteFn.mock.calls[0][0]).toBe('/patient-search')
  })
})
