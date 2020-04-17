import * as React from 'react'

import { Table } from '@material-ui/core'
import { fireEvent, render } from '@testing-library/react'
import EnhancedTableHead from '../EnhancedTableHead'
import { Chart } from '@devexpress/dx-react-chart'
const TestChildren = () => null
const defaultProps: any = {
  data: 'test-data',
  palette: 'test-palette',
  rootComponent: () => null,
  rotated: 'test-rotated',
}
describe('<EnhancedTableHead />', () => {
  it('render <EnhancedTableHead />', () => {
    const { findAllByText } = render(
      <Table>
        <EnhancedTableHead
          headCells={[
            {
              align: 'center',
              disablePadding: false,
              id: 'name',
              label: 'Name',
            },
          ]}
        />
      </Table>,
    )

    expect(findAllByText('Name')).toBeTruthy()
  })
  it('sortable <EnhancedTableHead />', () => {
    const onRequestSort = jest.fn()

    const { getByText } = render(
      <Table>
        <EnhancedTableHead
          onRequestSort={onRequestSort}
          headCells={[
            {
              align: 'center',
              disablePadding: false,
              id: 'name',
              label: 'Name',
            },
            {
              align: 'center',
              disablePadding: false,
              id: 'age',
              label: 'Age',
            },
          ]}
        />
      </Table>,
    )

    fireEvent.click(getByText('Name'))

    expect(onRequestSort).toBeCalled()
  })

  // it('should render root children', () => {
  //   // const tree = render(
  //   //   <Chart {...defaultProps}>
  //   //     <TestChildren />
  //   //     <TestChildren />
  //   //     <TestChildren />
  //   //   </Chart>,
  //   // )
  //   const { queryByText } = render(
  //     <Chart {...defaultProps}>
  //       <TestChildren />
  //       <TestChildren />
  //       <TestChildren />
  //     </Chart>,
  //   )

  //   expect(true).toBeTruthy()
  // })
})
