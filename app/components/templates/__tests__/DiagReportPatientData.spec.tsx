import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DiagReportPatientData from '../DiagReportPatientData'

describe('<DiagReportPatientData />', () => {
  let mockDiagReportList: any
  beforeAll(() => {
    mockDiagReportList = [
      {
        result: [
          {
            codeText: 'Test1',
            unit: 'Bottle',
            valueModal: 'V1Test1',
          },
          {
            codeText: 'Test1',
            unit: 'Bottle',
            valueModal: 'V2Test1',
          },
          {
            codeText: 'Test1',
            unit: 'Bottle',
            valueModal: 'V3Test1',
          },
          {
            codeText: 'Test2',
            unit: 'Bottle',
            valueModal: 'V1Test2',
          },
          {
            codeText: 'Test2',
            unit: 'Bottle',
            valueModal: 'V2Test2',
          },
          {
            codeText: 'Test3',
            unit: 'Bottle',
            valueModal: 'V1Test3',
          },
        ],
      },
    ]
  })
  it('render DiagReportPatientData', () => {
    const { queryByText } = render(
      <DiagReportPatientData diagReportList={mockDiagReportList} />,
    )
    expect(queryByText('Test1')).toBeTruthy()
    expect(queryByText('V2Test1 Bottle')).toBeTruthy()
    expect(queryByText('V1Test3 Bottle')).toBeFalsy()
  })

  it('change tab DiagReportPatientData', () => {
    const { queryByText, getByText } = render(
      <DiagReportPatientData diagReportList={mockDiagReportList} />,
    )

    fireEvent.click(getByText('Test3'))
    expect(queryByText('V1Test3 Bottle')).toBeTruthy()
  })
})
