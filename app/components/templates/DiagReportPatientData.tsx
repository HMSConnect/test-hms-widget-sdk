import React, { useEffect, useState } from 'react'

import GraphBase from '@components/base/GraphBase'
import TabGroup, { ITabList } from '@components/base/TabGroup'
import TableBase from '@components/base/TableBase'
import { ArgumentScale, ValueScale } from '@devexpress/dx-react-chart'
import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { sendMessage } from '@utils'
import { scaleTime } from 'd3-scale'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  tableRoot: {
    height: '70vh',
    overflowY: 'scroll',
  },
}))
const DiagReportPatientData: React.FunctionComponent<{
  diagReportList: any[]
  name?: string
}> = ({ diagReportList, name = 'diagReportPatientData' }) => {
  const [tab, setTab] = useState<ITabList[]>([])

  const [data, setData] = useState<any[]>([])
  const classes = useStyles()

  useEffect(() => {
    if (!_.isEmpty(diagReportList)) {
      const resultCodeGroup: any = _.chain(diagReportList)
        .map(data => data.result)
        .flatten()
        .groupBy('codeText')
        .value()
      const tabList: ITabList[] = _.map(resultCodeGroup, (value, key) => {
        return { type: key, totalCount: 0 }
      })
      setTab(tabList)
      handleTabChange(tabList[0].type)
    }
  }, [diagReportList])

  const handleTabChange = (selectedValue: string) => {
    const resultCodeGroup = _.chain(diagReportList)
      .map(data => data.result)
      .flatten()
      .groupBy('codeText')
      .value()
    const newData = _.find(
      resultCodeGroup,
      (value, key) => key === selectedValue,
    )
    if (newData) {
      setData(newData)
    }
    sendMessage({
      message: `handleTabChange:`,
      name,
      params: {
        data: newData,
        tabTitle: selectedValue,
      },
    })
  }

  const handleEntrySelected = (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => {
    // TODO handleEntrySelected
  }

  if (!_.get(data[0], 'valueModal')) {
    return <></>
  }

  return (
    <>
      <TabGroup tabList={tab} onTabChange={handleTabChange} />
      <br />

      {_.isArray(data[0].valueModal) ? (
        <Paper>
          <GraphBase
            data={data}
            argumentField='issuedDate'
            options={{
              ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
              ValueScale: <ValueScale modifyDomain={() => [20, 200]} />,
              type: 'line',
              valueUnit: 'mmHg',
            }}
          />
        </Paper>
      ) : (
        <Paper className={classes.tableRoot}>
          <TableBase
            entryList={data}
            id='dd'
            isLoading={false}
            onEntrySelected={handleEntrySelected}
            tableCells={[
              {
                bodyCell: {
                  align: 'center',
                  id: 'value',
                  render: (data: any) => {
                    return (
                      <Typography>
                        {_.get(data, 'valueModal') || 'Unknow'}{' '}
                        {_.get(data, 'unit') || 'Unknow'}
                      </Typography>
                    )
                  },
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'value',
                  label: 'Value',
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'issued',
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'issued',
                  label: 'Issued',
                },
              },
            ]}
          />
        </Paper>
      )}
    </>
  )
}

export default DiagReportPatientData
