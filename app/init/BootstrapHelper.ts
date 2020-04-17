import { serviceConfig, validatorConfig } from '@config'
import { HMSService } from '@services/HMSServiceFactory'
import ValidatorManager from '@validators/ValidatorManager'
import * as _ from 'lodash'

class BootstrapHelper {
  registerServices(services: string[]) {
    for (const serviceName of services) {
      if (!HMSService.isExist(serviceName)) {
        const Service = _.get(serviceConfig, `${serviceName}.clazz`)
        if (Service) {
          if (serviceName.startsWith('$')) {
            // $ = default class config
            // TODO: discuss how to define service name?
            HMSService.register(
              _.chain(serviceName)
                .replace('$', '')
                .snakeCase()
                .value(),
              Service,
            )
          } else {
            // TODO: create class from object
          }
        } else {
          throw new Error(`can't get service name ${serviceName}.`)
        }
      }
    }
  }

  registerValidators(validators: string[]) {
    for (const validatorName of validators) {
      if (!ValidatorManager.isExist(validatorName)) {
        const validator = _.get(validatorConfig, validatorName)

        if (validator) {
          const ValidatorClazz = validator.clazz
          if (validatorName.startsWith('$')) {
            // $ = default class config
            ValidatorManager.register(
              _.chain(validatorName)
                .replace('$', '')
                .value(),
              new ValidatorClazz(),
              validator.priority,
            )
          } else {
            // TODO: create class from object
          }
        } else {
          throw new Error(`can't get validator name ${validatorName}.`)
        }
      }
    }
  }
}

export default new BootstrapHelper()
