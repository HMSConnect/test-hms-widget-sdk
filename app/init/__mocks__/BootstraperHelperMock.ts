import { serviceConfig, validatorConfig } from '@config'
import { HMSService } from '@services/HMSServiceFactory'
import ValidatorManager from '@validators/ValidatorManager'
import * as _ from 'lodash'

export const BootstraperHelperMock = {
  registerServices: jest.fn(),
  registerValidators: jest.fn(),
}
