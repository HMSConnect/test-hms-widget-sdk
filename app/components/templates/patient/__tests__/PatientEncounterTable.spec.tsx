import * as React from 'react'

import EncounterServiceMock from '@services/__mocks__/EncounterServiceMock'
import {
  act,
  fireEvent,
  render,
  waitForDomChange,
} from '@testing-library/react'
import EncounterService from '../../../../services/EncounterService'
import { HMSService } from '../../../../services/HMSServiceFactory'
import PatientEncounterTable from '../PatientEncounterTable'

describe('<PatientEncounterTable />', () => {
  beforeAll(() => {
    jest.spyOn(HMSService, 'getService').mockImplementation(() => {
      return EncounterServiceMock as EncounterService
    })
  })
  it('render <PatientEncounterTable />', () => {
    const resourceList = [
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'ADMS',
      },
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'CCS60',
      },
    ]
    const patient = {
      identifier: {
        id: {
          value: '123',
        },
      },
    }
    const { queryByText } = render(
      <PatientEncounterTable resourceList={resourceList} patient={patient} />,
    )
    expect(queryByText('ADMS')).toBeTruthy()
  })

  it('fire groupBy Type <PatientEncounterTable />', async () => {
    jest.spyOn(EncounterServiceMock, 'list').mockImplementation(() => {
      return Promise.resolve({
        data: [
          {
            reason: 'test3',
            type: 'HAM',
          },
          {
            reason: 'test4',
            type: 'HAM',
          },
        ],
        error: null,
      })
    })
    const resourceList = [
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'ADMS',
      },
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'CCS60',
      },
    ]
    const patient = {
      identifier: {
        id: {
          value: '123',
        },
      },
    }

    const { getByTestId, queryByText, queryAllByText } = render(
      <PatientEncounterTable resourceList={resourceList} patient={patient} />,
    )

    const checkboxElement = getByTestId(
      'check-by-type-input',
    ).getElementsByTagName('input')[0]
    expect(checkboxElement).toBeTruthy()

    expect(checkboxElement.checked).toBeFalsy()
    await act(async () => {
      fireEvent.click(checkboxElement)
      await waitForDomChange()
    })
    expect(checkboxElement.checked).toBeTruthy()

    await act(async () => {
      fireEvent.click(checkboxElement)
      await waitForDomChange()
    })

    expect(checkboxElement.checked).toBeFalsy()

    expect(queryByText('test3')).toBeTruthy()
    expect(queryAllByText('HAM')).toBeTruthy()
    expect(queryByText('test4')).toBeTruthy()
  })

  it('fire loadMore Type <PatientEncounterTable />', async () => {
    jest.spyOn(EncounterServiceMock, 'list').mockImplementation(() => {
      return Promise.resolve({
        data: [
          {
            reason: 'test3',
            type: 'HAM',
          },
          {
            reason: 'test4',
            type: 'HAM',
          },
        ],
        error: null,
      })
    })

    const resourceList = [
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'ADMS',
      },
      {
        classCode: 'test1',
        reason: 'Cannot tell',
        status: 'finished',
        type: 'CCS60',
      },
    ]
    const patient = {
      identifier: {
        id: {
          value: '123',
        },
      },
    }

    const {
      getByTestId,
      container,
      queryByText,
      getByText,
      queryAllByText,
    } = render(
      <PatientEncounterTable resourceList={resourceList} patient={patient} />,
    )

    const loadButton = getByText('Load More')
    expect(loadButton).toBeTruthy()

    await act(async () => {
      fireEvent.click(loadButton)
      await waitForDomChange()
    })

    expect(queryByText('CCS60')).toBeTruthy()
    expect(queryByText('ADMS')).toBeTruthy()
    expect(queryAllByText('test1')).toBeTruthy()
    expect(queryByText('test3')).toBeTruthy()
    expect(queryAllByText('HAM')).toBeTruthy()
    expect(queryByText('test4')).toBeTruthy()
  })
})
