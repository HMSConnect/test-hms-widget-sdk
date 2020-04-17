import * as React from 'react'

import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core'
import map from 'lodash/map'

export interface IHeaderCellProps {
  id: string
  disablePadding?: boolean // for padding in Tab
  label: string
  align?: 'right' | 'left' | 'center' | undefined
  styles?: any
  disableSort?: boolean
}

export interface IEnhancedTableProps {
  headCells: IHeaderCellProps[]
  classes?: any
  order?: 'asc' | 'desc'
  orderBy?: string
  onRequestSort?: (property: any) => void
}

const EnhancedTableHead = ({
  order,
  orderBy,
  onRequestSort,
  headCells,
}: IEnhancedTableProps) => {
  const createSortHandler = (property: any) => {
    if (onRequestSort) {
      onRequestSort(property)
    }
  }

  return (
    <TableHead>
      <TableRow>
        {map(headCells, (headCell: IHeaderCellProps) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={headCell.styles}
          >
            {headCell.disableSort ? (
              <Typography variant='subtitle1'>
                <strong>{headCell.label}</strong>
              </Typography>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={() => createSortHandler(headCell.id)}
              >
                <Typography>
                  <strong>{headCell.label}</strong>
                </Typography>
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
