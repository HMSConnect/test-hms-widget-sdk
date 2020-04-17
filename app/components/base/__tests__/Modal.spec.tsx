import * as React from 'react'

import { render } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import ModalContentTest from '../__mocks__/ModalContentTest'
import Modal, { useModal } from '../Modal'

describe('<Modal />', () => {
  it('render <Modla />', () => {
    const onClose = jest.fn()
    const { queryByText, queryByTestId } = render(
      <Modal isOpen={true} onClose={onClose}>
        {' '}
        OpenModal
      </Modal>,
    )
    expect(queryByText('OpenModal')).toBeTruthy()
    expect(queryByTestId('close-button')).toBeTruthy()
  })

  it('render <Modla isOpen={false}/>', () => {
    const onClose = jest.fn()
    const { queryByText, queryByTestId } = render(
      <Modal isOpen={false} onClose={onClose}>
        {' '}
        OpenModal
      </Modal>,
    )

    expect(queryByText('OpenModal')).toBeFalsy()
    expect(queryByTestId('close-button')).toBeNull()
  })

  it('not send onclose render <Modla isOpen={false}/>', async () => {
    const { queryByTestId } = render(<Modal isOpen={true}> OpenModal</Modal>)

    expect(queryByTestId('close-button')).toBeNull()
  })

  it('render useHook', async () => {
    const { result } = renderHook(() =>
      useModal(ModalContentTest, { isOpen: true }),
    )

    expect(result.current.isOpen).toBeTruthy()

    act(() => {
      result.current.closeModal()
    })

    expect(result.current.isOpen).toBeFalsy()
    act(() => {
      result.current.showModal()
    })
    expect(result.current.isOpen).toBeTruthy()
  })

  it('not render useHook', async () => {
    const { result } = renderHook(() => useModal(ModalContentTest))

    expect(result.current.isOpen).toBeNull()
    expect(result.current.renderModal).toBeNull()

    act(() => {
      result.current.showModal()
    })
    expect(result.current.isOpen).toBeTruthy()
  })
})
