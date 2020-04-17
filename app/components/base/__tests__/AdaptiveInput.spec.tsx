import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import AdaptiveInput from '../AdaptiveInput'

describe('<AdaptiveInput />', () => {
  it('render Text AdaptiveInput ', () => {
    const onChange = jest.fn()
    const adaptiveProps: any = {
      id: 'Text1',
      label: 'Text',
      name: 'textInput',
      type: 'text',
      value: '',
    }

    const { queryByText, getByTestId } = render(
      <AdaptiveInput onChange={onChange} {...adaptiveProps} />,
    )
    const textElement = getByTestId('adaptive-input-text-textInput')
    fireEvent.change(textElement, {
      target: { value: 'hello' },
    })

    expect(onChange).toBeCalled()
  })

  it('render Option AdaptiveInput', () => {
    const onChange = jest.fn()
    const adaptiveProps: any = {
      choices: [
        {
          label: 'Option1',
          value: 'option1',
        },
        {
          label: 'Option2',
          value: 'option2',
        },
      ],
      id: 'optionInput',
      label: 'Option',
      name: 'optionInput',
      type: 'options',
      value: {
        optionInput: 'option2',
      },
    }

    const { queryByText, getByText } = render(
      <AdaptiveInput onChange={onChange} {...adaptiveProps} />,
    )
    expect(queryByText('Option2')).toBeTruthy()

    const option2Element = getByText('Option2')

    userEvent.click(option2Element)
    const option1Element = getByText('Option1')
    userEvent.click(option1Element)
    expect(queryByText('Option1')).toBeTruthy()
    expect(onChange).toBeCalled()
  })

  it('render Option Without choice AdaptiveInput', () => {
    const onChange = jest.fn()
    const adaptiveProps: any = {
      id: 'optionInput',
      label: 'Option',
      name: 'optionInput',
      type: 'options',
      value: {
        optionInput: 'option2',
      },
    }

    const { queryByText } = render(
      <AdaptiveInput onChange={onChange} {...adaptiveProps} />,
    )
    expect(queryByText('Need choices..')).toBeTruthy()
  })

  it('render checkbox group AdaptiveInput', () => {
    const onChange = jest.fn()
    const adaptiveProps: any = {
      group: [
        {
          label: 'Blood Pressure',
          name: 'bloodName',
          value: 'bloodValue',
        },
        {
          label: 'Body Mass Index',
          name: 'bmiName',
          value: 'bmivalue',
        },
      ],
      label: 'Selection',
      name: 'selection',
      type: 'checkbox-group',
      value: {
        selection: { bloodName: false, bmiName: false },
      },
    }

    const { queryByText, getByText } = render(
      <AdaptiveInput onChange={onChange} {...adaptiveProps} />,
    )
    expect(queryByText('Body Mass Index')).toBeTruthy()

    const bmiElement = getByText('Body Mass Index')

    userEvent.click(bmiElement)
    expect(onChange).toBeCalled()
  })

  it('render checkbox group Without choice AdaptiveInput', () => {
    const onChange = jest.fn()
    const adaptiveProps: any = {
      label: 'Selection',
      name: 'selection',
      type: 'checkbox-group',
      value: {
        selection: { bloodName: false, bmiName: false },
      },
    }

    const { queryByText } = render(
      <AdaptiveInput onChange={onChange} {...adaptiveProps} />,
    )
    expect(queryByText('Need group..')).toBeTruthy()
  })

  it('render number AdaptiveInput ', () => {
    const onChange = jest.fn()
    const adaptiveProps: any = {
      id: 'number1',
      label: 'number',
      name: 'numberInput',
      type: 'number',
      value: {
        numberInput: 10,
      },
    }

    const { getByTestId } = render(
      <AdaptiveInput onChange={onChange} {...adaptiveProps} />,
    )
    const numberInput = getByTestId('adaptive-input-number-numberInput')

    fireEvent.change(numberInput, {
      target: { value: 20 },
    })

    expect(onChange).toBeCalled()
  })

  it('render boolean AdaptiveInput ', async () => {
    const onChange = jest.fn()
    const adaptiveProps: any = {
      id: 'boolean1',
      label: 'boolean',
      name: 'booleanInput',
      type: 'boolean',
      value: {
        booleanInput: false,
      },
    }

    const { queryByText, getByTestId } = render(
      <AdaptiveInput onChange={onChange} {...adaptiveProps} />,
    )
    const switchBoolean = getByTestId(
      'adaptive-input-boolean-booleanInput',
    ).getElementsByTagName('input')[0]
    // console.log('object :', switchBoolean.getElementsByTagName('input')[0].checked)
    expect(switchBoolean.checked).toBeFalsy()

    fireEvent.click(switchBoolean)

    expect(onChange).toBeCalled()
    // await waitForDomChange()
    // console.log('object :', switchBoolean.getElementsByTagName('input')[0].checked)
    // console.log('object :', switchBoolean.getElementsByTagName('input')[0].checked)
    // expect(switchBoolean.getElementsByTagName('input')[0].checked).toBeTruthy()
  })

  it('render Default AdaptiveInput ', () => {
    const onChange = jest.fn()
    const adaptiveProps: any = {
      id: 'default1',
      label: 'Default',
      name: 'defaultInput',
      type: 'default',
      value: {
        defaultInput: '',
      },
    }

    const { queryAllByText, getByTestId } = render(
      <AdaptiveInput onChange={onChange} {...adaptiveProps} />,
    )
    expect(queryAllByText('Default')).toBeTruthy()
    const textElement = getByTestId('adaptive-input-default-defaultInput')
    fireEvent.change(textElement, {
      target: { value: 'hello' },
    })

    expect(onChange).toBeCalled()
  })
})
