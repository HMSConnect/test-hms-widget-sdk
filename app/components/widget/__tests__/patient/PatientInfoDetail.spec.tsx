import * as React from 'react'

import useEncounter from '@components/hooks/useEncounter'
import usePatient from '@components/hooks/usePatient'
import useResourceList from '@components/hooks/useResourceList'
import { routesMock } from '@routes/__mocks__/routesMock'
import { fireEvent, render } from '@testing-library/react'
import routes from '../../../../routes'
import PatientInfoDetail from '../../patient/PatientInfoDetail'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import { createStore } from 'redux'
import patientDemographic, {
  patientDemographicInitialState,
} from '@app/reducers-redux/patientDemographic.reducer'

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
describe('<PatientInfoDetail />', () => {
  let mockQuery: any
  beforeAll(async () => {
    mockQuery = {
      patientId: '0001',
    }
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: {
        gender: 'male',
        name: {
          family: ['FTest1'],
          given: ['Test1'],
          prefix: ['Mr.'],
        },
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

  it('render PatientInfoDetail', () => {
    const { queryAllByText, getByText } = renderWithRedux(
      <PatientInfoDetail query={mockQuery} />,
      {
        initialState: {},
        store: createStore(patientDemographic, {
          patientDemographic: patientDemographicInitialState,
        }),
      },
    )
    expect(queryAllByText('Mr. Test1 FTest1')[0]).toBeTruthy()
  })

  it('loading PatientInfoDetail', () => {
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: true,
    }))
    const { queryAllByText, getByText } = renderWithRedux(
      <PatientInfoDetail query={mockQuery} />,
      {
        initialState: {},
        store: createStore(patientDemographic, {
          patientDemographic: patientDemographicInitialState,
        }),
      },
    )
    expect(queryAllByText('Mr. Test1 FTest1')[0]).toBeFalsy()
  })

  it('error PatientInfoDetail', () => {
    const errorMessage = 'Test Error'
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: null,
      error: errorMessage,
      isLoading: true,
    }))

    const { queryAllByText, getByText } = renderWithRedux(
      <PatientInfoDetail query={mockQuery} />,
      {
        initialState: {},
        store: createStore(patientDemographic, {
          patientDemographic: patientDemographicInitialState,
        }),
      },
    )
    expect(queryAllByText(`ERR: ${errorMessage}`)).toBeTruthy()
  })

  it('render Navigate PatientInfoDetail', () => {
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: {
        gender: 'male',
        name: {
          family: ['FTest1'],
          given: ['Test1'],
          prefix: ['Mr.'],
        },
      },
      error: null,
      isLoading: false,
    }))
    const { queryAllByText, getByText } = renderWithRedux(
      <PatientInfoDetail query={mockQuery} />,
      {
        initialState: {},
        store: createStore(patientDemographic, {
          patientDemographic: patientDemographicInitialState,
        }),
      },
    )
    expect(queryAllByText('Mr. Test1 FTest1')[0]).toBeTruthy()

    const dianosticMenuElement = getByText('Diagnostic')
    fireEvent.click(dianosticMenuElement)
    const replaceRouteFn = routes.Router.replaceRoute

    expect(replaceRouteFn).toBeCalled()

    // const encounterMenuElement = getByText('Encounter')
    // fireEvent.click(encounterMenuElement)
    // expect(queryByText('ServiceTest2')).toBeTruthy()

    // expect(queryByText('Comming soon')).toBeTruthy()
  })
})
