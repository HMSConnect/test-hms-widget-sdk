import * as React from 'react'

import useDiagnosticReportList from '@components/hooks/useDiagnosticReportList'
import { render } from '@testing-library/react'
import DiagnosticReportModalContent from '../medical-records/DiagnosticReportModalContent'

import * as nextRouter from 'next/router'

jest.mock('@components/hooks/useDiagnosticReportList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<DiagnosticReportModalContent>', () => {
  beforeAll(() => {
    const test = jest.spyOn(nextRouter, 'useRouter') as any
    test.mockImplementation(() => ({
      query: {
        encounterId: '0001',
        patientId: '0001',
      },
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render DiagnosticReportModalContent', () => {
    const useDiagnosticReportListResult: any = useDiagnosticReportList as any
    const results: any = {
      data: [
        {
          codeText: `Ty001`,
        },
        {
          codeText: `Ty002`,
        },
        {
          codeText: `Ty003`,
        },
      ],
      isLoading: false,
    }
    useDiagnosticReportListResult.mockImplementation(() => results)
    const { queryByText } = render(<DiagnosticReportModalContent />)

    expect(queryByText('Ty001')).toBeTruthy()
  })

  it('loading DiagnosticReportModalContent', () => {
    const useDiagnosticReportListResult: any = useDiagnosticReportList as any
    const results: any = {
      data: [
        {
          codeText: `Ty001`,
        },
        {
          codeText: `Ty002`,
        },
        {
          codeText: `Ty003`,
        },
      ],
      isLoading: true,
    }
    useDiagnosticReportListResult.mockImplementation(() => results)
    const { queryByText } = render(<DiagnosticReportModalContent />)

    expect(queryByText('Ty001')).toBeFalsy()
    expect(queryByText('loading ...')).toBeTruthy()
  })
})
