import * as React from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { fireEvent, render, waitForDomChange } from '@testing-library/react'
import theme from '../../../src/theme'
import SideMenuMockList from '../__mocks__/SideMenuWithContent'
import SideMenuWithContent from '../SideMenuWithContent'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import { createStore } from 'redux'
import themeType, { themeInitialState } from '@app/reducers-redux/theme.reducer'

describe('<SideMenuWithContent />', () => {
  it('render SideMenuWithContent', () => {
    const { queryByText } = renderWithRedux(
      <ThemeProvider theme={theme}>
        <SideMenuWithContent
          renderMenuList={<SideMenuMockList />}
          menuTitle='Test Title'
        />
      </ThemeProvider>,
      {
        initialState: {},
        store: createStore(themeType, {
          themeType: themeInitialState,
        }),
      },
    )
    // const { queryByText } = render(
    //   <ThemeProvider theme={theme}>
    //     <SideMenuWithContent
    //       renderMenuList={<SideMenuMockList />}
    //       menuTitle='Test Title'
    //     />
    //   </ThemeProvider>,
    // )

    expect(queryByText('Test Title')).toBeTruthy()
  })
  it('render without menuTitle SideMenuWithContent', () => {
    const { queryByText } = renderWithRedux(
      <ThemeProvider theme={theme}>
        <SideMenuWithContent renderMenuList={<SideMenuMockList />} />
      </ThemeProvider>,
      {
        initialState: {},
        store: createStore(themeType, {
          themeType: themeInitialState,
        }),
      },
    )

    expect(queryByText('Menu')).toBeTruthy()
  })

  it('open/close SideMenuWithContent', async () => {
    const {
      queryByText,
      getByText,
      getByLabelText,
      getByTestId,
    } = renderWithRedux(
      <ThemeProvider theme={theme}>
        <SideMenuWithContent
          renderMenuList={<SideMenuMockList />}
          menuTitle='Test Title'
        />
      </ThemeProvider>,
      {
        initialState: {},
        store: createStore(themeType, {
          themeType: themeInitialState,
        }),
      },
    )

    expect(queryByText('Test Title')).toBeTruthy()

    const titleElement = getByText('Test Title')
    fireEvent.click(titleElement)

    await waitForDomChange({ container: getByTestId('drawer') })

    const newContainers = getByTestId('drawer').lastElementChild
    const contaimserStyle = window.getComputedStyle(
      newContainers as HTMLElement,
    )
    expect(contaimserStyle.visibility).toBe('hidden')

    const iconOpenDrawer = getByLabelText('open drawer')

    fireEvent.click(iconOpenDrawer)

    // await waitForDomChange({ container: getByTestId('drawer') })
    const newContainers1 = getByTestId('drawer').lastElementChild
    const contaimserStyle1 = window.getComputedStyle(
      newContainers1 as HTMLElement,
    )
    expect(contaimserStyle1.visibility).toBe('')
    expect(contaimserStyle1.transform).toBe('none')
  })
})
