import { render } from '@testing-library/react'

import ModalContentTest from '@components/base/__mocks__/ModalContentTest'
import * as customModal from '@components/base/Modal'
import useLastDiagnosticReport from '@components/hooks/useLastDiagnosticReport'
import * as React from 'react'

import * as nextRouter from 'next/router'
import DiagnosticReportCard from '../medical-records/DiagnosticReportCard'

jest.mock('@components/hooks/useLastDiagnosticReport', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<DianosticReportCard>', () => {
  beforeEach(() => {
    const useRouterMockResult = jest.spyOn(nextRouter, 'useRouter') as any
    useRouterMockResult.mockImplementation(() => ({
      query: {
        encounterId: '0001',
        patientId: '0001',
      },
    }))

    const useModalMockResult = jest.spyOn(customModal, 'useModal') as any
    useModalMockResult.mockImplementation(() => ({
      renderModal: ModalContentTest,
      showModal: jest.fn(),
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('render DianosticREportCard', () => {
    const useDiagnosticReportListResult: any = useLastDiagnosticReport as any
    const results: any = {
      data: {
        codeText: `Ty001`,
        result: [
          {
            display: 'Obser1',
            unit: 'bottle',
            value: '10',
          },
          {
            display: 'Obser2',
            unit: 'bottle',
            value: '20',
          },
          { 
            display: 'Obser3',
            unit: 'bottle',
            value: '30',
          },
        ],
      },
      error: null,
      isLoading: false,
    }
    useDiagnosticReportListResult.mockImplementation(() => results)
    const { queryByText } = render(<DiagnosticReportCard />)

    expect(queryByText('Ty001')).toBeTruthy()
    expect(queryByText('Show All')).toBeTruthy()
    expect(queryByText('Obser1')).toBeTruthy()
  })

  //   it('render with Observation DianosticREportCard', () => {
  //     const useDiagnosticReportListResult: any = useLastDiagnosticReport as any
  //     const results: any = {
  //       data: {
  //         codeText: `Ty001`,
  //         results: [
  //           {
  //             display: 'Obser1',
  //           },
  //           {
  //             display: 'Obser2',
  //           },
  //           {
  //             display: 'Obser3',
  //           },
  //         ],
  //       },
  //       error: null,
  //       isLoading: false,
  //     }
  //     useDiagnosticReportListResult.mockImplementation(() => results)
  //     const { queryByText, getByText } = render(<DiagnosticReportCard />)
  //     getByText('Obser3')
  //     expect(queryByText('Ty001')).toBeTruthy()
  //     expect(queryByText('Obser1')).toBeTruthy()
  //   })

  it('loading DianosticREportCard', () => {
    const useDiagnosticReportListResult: any = useLastDiagnosticReport as any
    const results: any = {
      data: {
        codeText: `Ty001`,
      },
      error: null,
      isLoading: true,
    }
    useDiagnosticReportListResult.mockImplementation(() => results)
    const { queryByText } = render(<DiagnosticReportCard />)

    expect(queryByText('Ty001')).toBeFalsy()
    expect(queryByText('loading..')).toBeTruthy()
  })

  it('error DianosticREportCard', () => {
    const errorMessage = 'Test Error'
    const useDiagnosticReportListResult: any = useLastDiagnosticReport as any
    const results: any = {
      data: {
        codeText: `Ty001`,
      },
      error: errorMessage,
      isLoading: false,
    }
    useDiagnosticReportListResult.mockImplementation(() => results)
    const { queryByText } = render(<DiagnosticReportCard />)

    expect(queryByText('Ty001')).toBeFalsy()
    expect(queryByText(`Something went wrong`)).toBeTruthy()
    expect(queryByText(errorMessage)).toBeTruthy()
  })
})
