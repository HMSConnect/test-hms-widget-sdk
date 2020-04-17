import React, { MouseEvent, useEffect } from 'react'

import EnhancedTableHead from '@components/base/EnhancedTableHead'
import { ISortType } from '@components/hooks/usePatientList'
import {
  makeStyles,
  Table,
  TableBody,
  TableRow,
  Theme,
} from '@material-ui/core'
import get from 'lodash/get'
import map from 'lodash/map'
import PatientItem from './PatientItem'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  tableRow: {
    cursor: 'pointer',
  },
  tableWrapper: {
    // maxHeight: '70vh',
    // overflow: 'auto',
  },
}))
const PatientSearchResult: React.FunctionComponent<{
  patientList: any[]
  onPatientSelect?: (patient: any) => void
  onRequestSort?: (sortObject: ISortType) => void
  highlightText?: string
  sort?: ISortType
}> = ({ highlightText, patientList, sort, onPatientSelect, onRequestSort }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<'asc' | 'desc'>(
    get(sort, 'order') || 'asc',
  )
  const [orderBy, setOrderBy] = React.useState(get(sort, 'orderBy') || '')

  useEffect(() => {
    setOrder(get(sort, 'order') || 'asc')
    setOrderBy(get(sort, 'orderBy') || '')
  }, [sort])

  const handleRequestSort = (property: any) => {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)

    if (onRequestSort) {
      onRequestSort({
        order: isDesc ? 'asc' : 'desc',
        orderBy: property + '',
      })
    }
  }

  const handlePatientSelect = (event: MouseEvent, patient: any) => {
    if (onPatientSelect) {
      onPatientSelect(patient)
    }
  }
  return (
    <>
      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={[
              {
                align: 'left',
                disablePadding: false,
                disableSort: true,
                id: 'image',
                label: '',
                styles: {
                  width: '5em',
                },
              },
              {
                align: 'center',
                disablePadding: true,
                id: 'name.given',
                label: 'Name',
              },
              {
                align: 'center',
                disablePadding: false,
                id: 'gender',
                label: 'Gender',
                styles: {
                  width: '5em',
                },
              },
              {
                align: 'center',
                disablePadding: false,
                id: 'birthDate',
                label: 'DOB',
                styles: {
                  width: '8em',
                },
              },
              {
                align: 'center',
                disablePadding: true,
                id: 'id',
                label: 'ID',
                styles: {
                  width: '25em',
                },
              },
              {
                align: 'center',
                disablePadding: true,
                id: 'identifier.mr',
                label: 'MRN',
                styles: {
                  width: '25em',
                },
              },
            ]}
          />
          <TableBody>
            {map(patientList, (patient: any, index: number) => (
              <TableRow
                key={index}
                hover
                onClick={(event: MouseEvent) =>
                  handlePatientSelect(event, patient)
                }
                className={classes.tableRow}
              >
                <PatientItem
                  key={index}
                  patient={patient}
                  highlightText={highlightText}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default PatientSearchResult
