import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme } from '../../presentation/styles/theme/defaultTheme'
import Login from './index'
import '../../presentation/tests/mock-match-media'
import { Validation } from '../../presentation/protocols/validation'

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(
    <ChakraProvider theme={defaultTheme}>
      <Login validation={ValidationSpy} />
    </ChakraProvider>,
  )

  return {
    sut,
    validationSpy,
  }
}

describe('Login component', () => {
  afterEach(cleanup)
  test('Should call validation with correct value', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: 'my-email' } })
    expect(validationSpy.input).toEqual({
      email: 'my-email',
    })
  })
})
