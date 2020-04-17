import * as React from 'react'

import {
  Button,
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core'
import { blue, grey } from '@material-ui/core/colors'
import clsx from 'clsx'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import EnhancedTableHead, { IHeaderCellProps } from './EnhancedTableHead'

interface ITableEntireRowOption {
  isCenter?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  circle: {
    backgroundColor: grey[400],
    borderColor: grey[400],
    borderRadius: '50%',
    borderStyle: 'solid',
    textAlign: 'center',
    width: '2em',
  },
  root: {},
  tableGroupRow: {
    backgroundColor: blue[50],
    cursor: 'pointer',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowColor: {
    // '&:nth-of-type(even)': {
    //   backgroundColor: '#eeeeee',
    // },
  },
  tableWrapper: {
    maxHeight: '60vh',
    overflow: 'auto',
  },
}))

export interface IBodyCellProp {
  align?: 'right' | 'left' | 'center' | undefined
  id: string
  styles?: any
  render?: any
}

export interface ITableCellProp {
  headCell: IHeaderCellProps
  bodyCell: IBodyCellProp
}

const TableBase: React.FunctionComponent<{
  entryList: any[]
  id: string
  tableCells: ITableCellProp[]
  isLoading: boolean
  isMore?: boolean
  size?: 'small' | 'medium' | undefined
  onEntrySelected?: (event: React.MouseEvent, selectedEncounter: any) => void
  onLazyLoad?: (event: React.MouseEvent) => void
}> = ({
  entryList,
  id,
  isLoading,
  tableCells,
  isMore,
  size,
  onEntrySelected,
  onLazyLoad,
}) => {
  const classes = useStyles()
  const headerCells = map(
    tableCells,
    (tableCell: ITableCellProp) => tableCell.headCell,
  )

  return (
    <Table stickyHeader size={size}>
      <EnhancedTableHead classes={classes} headCells={headerCells} />
      <TableBody>
        {isEmpty(entryList) ? (
          <TableEntireRow
            cellCount={headerCells.length}
            option={{ isCenter: true }}
          >
            <Typography>No Data for display</Typography>
          </TableEntireRow>
        ) : (
          map(entryList, (entryData, index: number) => (
            <TableRowBase
              entryData={entryData}
              index={index}
              tableCells={tableCells}
              onEntrySelected={onEntrySelected}
              key={id + index}
              id={id}
            />
          ))
        )}
      </TableBody>
      {isMore ? (
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={tableCells.length}
              style={{ textAlign: 'center' }}
            >
              {isLoading ? (
                <CircularProgress />
              ) : onLazyLoad ? (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={onLazyLoad}
                >
                  <Typography variant='body1'>Load More</Typography>
                </Button>
              ) : null}
            </TableCell>
          </TableRow>
        </TableFooter>
      ) : null}
    </Table>
  )
}

const TableRowBase: React.FunctionComponent<{
  entryData: any
  id: string
  index: string | number
  tableCells: ITableCellProp[]
  onEntrySelected?: (event: React.MouseEvent, entry: any) => void
}> = ({ entryData, id, index, tableCells, onEntrySelected }) => {
  const classes = useStyles()
  return (
    <TableRow
      hover={onEntrySelected ? true : false}
      key={id + index}
      className={clsx(classes.tableRowColor, {
        [classes.tableRow]: onEntrySelected,
      })}
      onClick={(event: React.MouseEvent) =>
        onEntrySelected ? onEntrySelected(event, entryData) : null
      }
    >
      {map(tableCells, (tabelCell: ITableCellProp, tableIndex: number) => (
        <TableCell
          align={tabelCell.bodyCell.align || 'center'}
          key={id + tabelCell.bodyCell.id + index}
        >
          {tabelCell.bodyCell.render ? (
            tabelCell.bodyCell.render(entryData)
          ) : (
            <Typography variant='body1'>
              {get(entryData, tabelCell.bodyCell.id) || 'Unknow'}
            </Typography>
          )}
        </TableCell>
      ))}
    </TableRow>
  )
}

const TableEntireRow: React.FunctionComponent<{
  cellCount: number
  option?: ITableEntireRowOption
}> = ({ cellCount, children, option = {} }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={cellCount}
        style={{ textAlign: option.isCenter ? 'center' : undefined }}
      >
        {children}
      </TableCell>
    </TableRow>
  )
}

export default TableBase
