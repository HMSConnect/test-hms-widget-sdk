import * as React from 'react'

import { fireEvent, render } from '@testing-library/react'

import TableBase, { ITableCellProp } from '../TableBase'

describe('<Pagination />', () => {
  it('render <Pagination />', () => {
    const entryList = [
      { type: 'ADMS', class: 'test1' },
      { type: 'CCS60', class: 'test1' }
    ]
    const tableCells: ITableCellProp[] = [
      {
        bodyCell: {
          align: 'left',
          id: 'type'
        },
        headCell: {
          id: 'type',
          label: 'Type',
          align: 'center',
          disablePadding: true,
          disableSort: true
        }
      },
      {
        bodyCell: {
          align: 'center',
          id: 'class'
        },
        headCell: {
          align: 'center',
          disablePadding: true,
          disableSort: true,
          id: 'class',
          label: 'Class'
        }
      }
    ]
    const onEntrySelected = jest.fn()
    const { findAllByText } = render(
      <TableBase
        entryList={entryList}
        onEntrySelected={onEntrySelected}
        id='Encounter'
        tableCells={tableCells}
        isLoading={false}
      />
    )
    expect(findAllByText('Type')).toBeTruthy()
  })

  it('OnEntrySelect <TableBase />', () => {
    const entryList = [
      { type: 'ADMS', class: 'test1' },
      { type: 'CCS60', class: 'test1' }
    ]
    const tableCells: ITableCellProp[] = [
      {
        bodyCell: {
          align: 'left',
          id: 'type'
        },
        headCell: {
          id: 'type',
          label: 'Type',
          align: 'center',
          disablePadding: true,
          disableSort: true
        }
      },
      {
        bodyCell: {
          align: 'center',
          id: 'class'
        },
        headCell: {
          align: 'center',
          disablePadding: true,
          disableSort: true,
          id: 'class',
          label: 'Class'
        }
      }
    ]
    const onEntrySelected = jest.fn()
    const { findAllByText, getByText } = render(
      <TableBase
        entryList={entryList}
        onEntrySelected={onEntrySelected}
        id='Encounter'
        tableCells={tableCells}
        isLoading={false}
      />
    )
    expect(findAllByText('Type')).toBeTruthy()

    fireEvent.click(getByText('ADMS'))

    expect(onEntrySelected).toBeCalled()
  })
})
