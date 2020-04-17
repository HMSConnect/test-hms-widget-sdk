import IValidator from './IValidator'

export interface ISchema {
  version: number
  standard: 'SFHIR' | 'HMS_CONNECT'
  resourceType: string
}

export interface IValidatorRegistry {
  name: string
  priority: number
  validator: IValidator
}

class ValidatorManager {
  instances: IValidatorRegistry[] = []

  register(name: string, clazz: any, priority: number) {
    console.info('registering validator..', name)
    this.instances.push({ name, priority, validator: clazz })
  }

  isExist(name: any) {
    return this.instances.some(instance => instance.name === name)
  }

  compile(schema: ISchema): IValidator | null {
    const availableValidators = this.instances.filter(instance => {
      return instance.validator.isValid(schema)
    })
    const sortedAvailableValidators = availableValidators.sort((a, b) => {
      return a.priority > b.priority ? 1 : -1
    })
    return sortedAvailableValidators.length > 0
      ? sortedAvailableValidators[0].validator
      : null
  }
}

export default new ValidatorManager()
