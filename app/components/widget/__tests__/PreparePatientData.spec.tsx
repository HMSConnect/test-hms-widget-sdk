import useEncounter from '@components/hooks/useEncounter'
import { render } from '@testing-library/react'
import * as React from 'react'
import routes from '../../../routes'
import PreparePatientData from '../PreparePatientData'
import useEncounterList from '@components/hooks/useEncounterList'

jest.mock('@components/hooks/useEncounterList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('../../../routes', () => ({
  __esModule: true,
  default: {
    Router: {
      ready: jest.fn(),
      back: jest.fn(),
      pushRoute: jest.fn(),
      replaceRoute: jest.fn(),
    },
  },
}))

describe('<PreparePatientData />', () => {
  beforeAll(() => {
    const useEncounterListMock: any = useEncounterList as any
    useEncounterListMock.mockImplementation(() => ({
      data: [
        {
          type: 'Encounter Type1',
        },
        {
          type: 'Encounter Type2',
        },
      ],
      error: null,
      isLoading: false,
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('render PreparePatientData', () => {
    render(<PreparePatientData query={{ patientId: '1' }} />)
    const replaceRouteFn = routes.Router.ready

    expect(replaceRouteFn).toHaveBeenCalled()
    // expect(replaceRouteFn.mock.calls[0][0]).toBe('/patient-summary')
  })
})
