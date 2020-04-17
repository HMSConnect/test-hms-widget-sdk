import React, { useEffect, useState } from 'react'

import {
  IconButton,
  makeStyles,
  TablePagination,
  Theme,
  useTheme,
} from '@material-ui/core'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import get from 'lodash/get'

export interface IPageOptionResult {
  offset: number
  page: number
  max: number
}
interface ITablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void
}

const useStyles1 = makeStyles((theme: Theme) => ({
  root: {
    flexShrink: 0,
  },
}))

function TablePaginationActions(props: ITablePaginationActionsProps) {
  const classes = useStyles1()
  const theme: any = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
        data-testid='first-page'
      >
        {get(theme, 'direction') === 'rtl' ? (
          <LastPageIcon />
        ) : (
          <FirstPageIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
        data-testid='prev-page'
      >
        {get(theme, 'direction') === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
        data-testid='next-page'
      >
        {get(theme, 'direction') === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
        data-testid='last-page'
      >
        {get(theme, 'direction') === 'rtl' ? (
          <FirstPageIcon />
        ) : (
          <LastPageIcon />
        )}
      </IconButton>
    </div>
  )
}

const Pagination: React.FunctionComponent<{
  totalCount: number
  page: number
  max?: number
  onPageChange: (pageOptionResult: IPageOptionResult) => void
}> = ({ totalCount, page, max: _max, onPageChange }) => {
  const [max, setMax] = useState(_max ? _max : 10)

  useEffect(() => {
    setMax(_max ? _max : 10)
  }, [_max])

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newMax = parseInt(event.target.value, 10)
    setMax(newMax)
    handlePageChange(0, newMax)
  }

  const handlePageChange = (newPage: number, newMax: number) => {
    onPageChange({
      max: newMax,
      offset: newPage * newMax,
      page: newPage,
    })
  }

  return (
    <TablePagination
      component='div'
      data-testid='pagination'
      rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
      colSpan={3}
      count={totalCount}
      rowsPerPage={max}
      page={page}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
        native: true,
      }}
      onChangePage={(event, newPage) => handlePageChange(newPage, max)}
      onChangeRowsPerPage={handleRowsPerPageChange}
      ActionsComponent={TablePaginationActions}
    />
  )
}

export default Pagination
