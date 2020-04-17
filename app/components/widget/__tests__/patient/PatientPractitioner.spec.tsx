import * as React from 'react'

import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import patientPractitioner from '@app/reducers-redux/patientPractitioner.reducer'
import useEncounter from '@components/hooks/useEncounter'
import PatientPractitioner, {
  PatientPractitionerWithConnector,
} from '@components/widget/patient/PatientPractitioner'
import { render } from '@testing-library/react'
import { createStore } from 'redux'

jest.mock('@components/hooks/useEncounter', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<PatientPractitioner />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientPractitioner', () => {
    const useEncounterResult: any = useEncounter as any
    useEncounterResult.mockImplementation(() => ({
      data: {
        participant: {
          displayName: 'Mr. Test1 FTest1',
          gender: 'male',
          name: {
            family: ['FTest1'],
            given: ['Test1'],
            prefix: ['Mr.'],
          },
          type: 'Encounter Type1',
        },
      },
      error: null,
      isLoading: false,
    }))
    const { queryByText } = render(<PatientPractitioner encounterId='1' />)
    expect(queryByText('Mr. Test1 FTest1')).toBeTruthy()
  })

  it('render PatientPractitioner Group', () => {
    const useEncounterResult: any = useEncounter as any
    useEncounterResult.mockImplementation(() => ({
      data: {
        participant: [
          {
            displayName: 'Mr. Test2 FTest2',
            gender: 'male',
            name: [
              {
                family: ['FTest2'],
                given: ['Test2'],
                prefix: ['Mr.'],
              },
            ],
          },
          {
            displayName: 'Mr. Test1 FTest1',
            gender: 'male',
            name: [
              {
                family: ['FTest1'],
                given: ['Test1'],
                prefix: ['Mr.'],
              },
            ],
          },
        ],
        type: 'Encounter Type1',
      },
      error: null,
      isLoading: false,
    }))
    const { queryByText } = render(
      <PatientPractitioner encounterId='1' maxDisplay={3} />,
    )
    expect(queryByText('Test2, Test1')).toBeTruthy()
  })

  it('render PatientPractitionerWithConnector With Redux', () => {
    const useEncounterResult: any = useEncounter as any
    useEncounterResult.mockImplementation(() => ({
      data: {
        participant: [
          {
            displayName: 'Mr. Test2 FTest2',
            gender: 'male',
            name: [
              {
                family: ['FTest2'],
                given: ['Test2'],
                prefix: ['Mr.'],
              },
            ],
          },
          {
            displayName: 'Mr. Test1 FTest1',
            gender: 'male',
            name: [
              {
                family: ['FTest1'],
                given: ['Test1'],
                prefix: ['Mr.'],
              },
            ],
          },
        ],
        type: 'Encounter Type1',
      },
      error: null,
      isLoading: false,
    }))

    const { queryByText } = renderWithRedux(
      <PatientPractitionerWithConnector />,
      {
        initialState: {},
        store: createStore(patientPractitioner, {
          patientPractitioner: {},
        }),
      },
    )
    expect(queryByText('Test2, Test1')).toBeTruthy()
  })

  it('loading PatientPractitioner', () => {
    const useEncounterResult: any = useEncounter as any
    useEncounterResult.mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: true,
    }))
    const { queryByText, getByText } = render(
      <PatientPractitioner encounterId='1' />,
    )
    expect(queryByText('Mr. Test1 FTest1')).toBeFalsy()
  })

  it('error PatientPractitioner', () => {
    const errorMessage = 'Test Error'
    const useEncounterResult: any = useEncounter as any
    useEncounterResult.mockImplementation(() => ({
      data: null,
      error: errorMessage,
      isLoading: false,
    }))
    const { queryByText, getByText } = render(
      <PatientPractitioner encounterId='1' />,
    )
    expect(queryByText(`Something went wrong`)).toBeTruthy()
  })
})
