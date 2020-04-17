import * as React from 'react'

import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import { Theme } from 'pretty-format/build/types'
import Pagination, { IPageOptionResult } from '../../base/Pagination'
import usePatientList, {
  IPaginationOption,
  ISortType,
} from '../../hooks/usePatientList'
import PatientSearchResult from '../../templates/patient/PatientSearchResult'

export const defaultPagination: IPaginationOption = {
  max: 10,
  offset: 0,
  page: 0,
}

const useStyles = makeStyles((theme: Theme) => ({
  bottom: {
    bottom: '1em',
    justifyContent: 'flex-end',
  },
  root: {},
}))

const PatientSearchResultWithPaginate: React.FunctionComponent<{
  highlightText?: string
  paginationOption?: IPaginationOption
  onPatientSelect?: (patient: any) => void
  onRequestSort?: (sortObject: ISortType) => void
  onPageChange?: (pageOptions: IPageOptionResult) => void
  name?: string
}> = ({
  highlightText,
  paginationOption = defaultPagination,
  onPatientSelect,
  onRequestSort,
  onPageChange,
  name = 'patientSearchResult',
}) => {
  const { isLoading, data, totalCount, error } = usePatientList(
    paginationOption,
  )

  const classes = useStyles()

  if (error) {
    return <>Error: {error}</>
  }
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <PatientSearchResult
              patientList={data}
              sort={paginationOption.sort}
              onPatientSelect={onPatientSelect}
              onRequestSort={onRequestSort}
              highlightText={highlightText}
            />
          </Grid>
          {onPageChange ? (
            <Grid container justify='flex-end'>
              <div className={classes.bottom}>
                <Pagination
                  totalCount={totalCount}
                  max={paginationOption.max}
                  page={paginationOption.page}
                  onPageChange={onPageChange}
                />
              </div>
            </Grid>
          ) : null}
        </Grid>
      )}
    </>
  )
}

export default PatientSearchResultWithPaginate
