import useObservationList from '@components/hooks/useObservationList'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import * as React from 'react'
import ObservationBloodPressureGraph from '../../observation/ObservationBloodPressureGraph'

const defaultIgnore = [
  'react-error-boundaries',
  'componentWillUpdate has been renamed, and is not recommended for use.',
  'componentWillReceiveProps has been renamed, and is not recommended for use.',
]

export const setupConsole = (config: any = {}) => {
  /* eslint-disable no-console */
  const savedConsoleWarn = console.warn
  const savedConsoleError = console.error
  const ignore = [...defaultIgnore, ...(config.ignore || [])]

  const logToError = (...args: any) => {
    const errorMessage = args[0]

    if (!ignore.some(message => errorMessage.includes(message))) {
      throw new Error('Test')
    }
  }

  console.warn = logToError
  console.error = logToError

  return () => {
    console.warn = savedConsoleWarn
    console.error = savedConsoleError
  }
  /* eslint-enable no-console */
}

jest.mock('@components/hooks/useObservationList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<ObservaionBloodPressureGraph />', () => {
  let resetConsole: any
  beforeAll(() => {
    // resetConsole = setupConsole()
    const router = jest.spyOn(nextRouter, 'useRouter') as any
    router.mockImplementation(() => ({
      query: {
        encounterId: '0001',
        patientId: '0001',
      },
    }))
  })
  afterAll(() => {
    // resetConsole()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  // it('render ObservaionBloodPressureGraph', () => {
  //   const useObservationListResult: any = useObservationList as any
  //   const results: any = {
  //     data: [
  //       {
  //         codeText: 'Code Text1',
  //         id: '1',
  //         issued: '2019-01-01',
  //         valueModal: [
  //           {
  //             code: 'Systolic Blood Pressure',
  //             unit: 'mmHg',
  //             value: 120,
  //           },
  //           {
  //             code: 'Diastolic Blood Pressure',
  //             unit: 'mmHg',
  //             value: 89,
  //           },
  //         ],
  //       },
  //     ],
  //     error: null,
  //     totalCount: 2,
  //   }
  //   useObservationListResult.mockImplementation(() => results)
  //   const query = {
  //     encounterId: '1',
  //     patientId: '1',
  //   }
  //   const { queryByText, queryAllByText } = render(
  //     <ObservationBloodPressureGraph patientId={'1'} />,
  //   )

  //   expect(true).toBeTruthy()

  //   // expect(queryByText('31')).toBeTruthy()
  //   // expect(queryAllByText('C')).toBeTruthy()
  // })

  it('loading ObservaionBloodPressureGraph', () => {
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: null,
      isLoading: true,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText, queryAllByText } = render(
      <ObservationBloodPressureGraph patientId={query.patientId} />,
    )
    expect(queryByText('loading..')).toBeTruthy()
  })

  it('error ObservaionBloodPressureGraph', () => {
    const errorText = 'Error'
    const useObservationListResult: any = useObservationList as any
    const results: any = {
      data: [],
      error: errorText,
      isLoading: true,
    }
    useObservationListResult.mockImplementation(() => results)
    const query = {
      encounterId: '1',
      patientId: '1',
    }
    const { queryByText } = render(
      <ObservationBloodPressureGraph patientId={query.patientId} />,
    )
    expect(queryByText('Error')).toBeTruthy()
  })
})
