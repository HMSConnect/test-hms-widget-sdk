import * as React from 'react'

import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import patientDemographic, {
  patientDemographicInitialState,
} from '@app/reducers-redux/patientDemographic.reducer'
import useEncounter from '@components/hooks/useEncounter'
import usePatient from '@components/hooks/usePatient'
import useResourceList from '@components/hooks/useResourceList'
import { routesMock } from '@routes/__mocks__/routesMock'
import { render } from '@testing-library/react'
import { createStore } from 'redux'
import PatientDemographic, {
  PatientDemographicWithConnector,
} from '../../patient/PatientDemographic'

jest.mock('@components/hooks/usePatient', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useResourceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useEncounter', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('../../../../routes', () => ({
  __esModule: true,
  default: routesMock,
}))
describe('<PatientDemographic />', () => {
  let mockQuery: any
  beforeAll(async () => {
    mockQuery = {
      patientId: '0001',
    }
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: {
        communication: ['English', 'Thai'],
        gender: 'male',
        name: {
          family: ['FTest1'],
          given: ['Test1'],
          prefix: ['Mr.'],
        },
        telecom: [
          {
            value: '091133',
          },
        ],
      },
      error: null,
      isLoading: false,
    }))
    const useEncounterResult: any = useEncounter as any
    useEncounterResult.mockImplementation(() => ({
      data: {
        type: 'Encounter Type1',
      },
      error: null,
      isLoading: false,
    }))

    const useResourceListResult: any = useResourceList as any
    // const encounterListData = await EncounterServiceMock.list(null)
    useResourceListResult.mockImplementation(() => ({
      data: [
        { resourceType: 'patient', totalCount: 1, data: [] },
        { resourceType: 'diagnostic', totalCount: 1, data: [] },
        {
          data: [
            {
              reason: 'Test1',
              serviceProvider: {
                name: `ServiceTest1`,
              },

              type: 'ADMS',
            },
            {
              reason: 'Test1',
              serviceProvider: {
                name: `ServiceTest2`,
              },
              type: 'EECM',
            },
          ],
          resourceType: 'encounter',
          totalCount: 2,
        },
      ],
      error: null,
      isLoading: false,
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientDemographic', () => {
    const structure = patientDemographicInitialState.structure
    const { queryAllByText, getByText } = render(
      <PatientDemographic patientId='1' structure={structure} />,
    )
    expect(queryAllByText('Mr. Test1 FTest1')[0]).toBeTruthy()
  })

  it('render PatientDemographicWithConnector with Redux', () => {
    const { queryAllByText, getByText } = renderWithRedux(
      <PatientDemographicWithConnector />,
      {
        initialState: {},
        store: createStore(patientDemographic, {
          patientDemographic: patientDemographicInitialState,
        }),
      },
    )
    expect(queryAllByText('Mr. Test1 FTest1')[0]).toBeTruthy()
  })

  it('loading PatientDemographic', () => {
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: true,
    }))
    const structure = patientDemographicInitialState.structure
    const { queryAllByText, getByText } = render(
      <PatientDemographic patientId='1' structure={structure} />,
    )
    expect(queryAllByText('Mr. Test1 FTest1')[0]).toBeFalsy()
  })

  it('error PatientDemographic', () => {
    const errorMessage = 'Test Error'
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: null,
      error: errorMessage,
      isLoading: true,
    }))
    const structure = patientDemographicInitialState.structure
    const { queryAllByText, getByText } = render(
      <PatientDemographic patientId='1' structure={structure} />,
    )
    expect(queryAllByText(`ERR: ${errorMessage}`)).toBeTruthy()
  })
})
