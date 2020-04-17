import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import moment from 'moment'

class SFHIRClaimV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'claim'
    )
  }

  parse(claim: any): any {
    return {
      billablePeriodStart: _.get(claim, 'billablePeriod.start')
        ? moment(_.get(claim, 'billablePeriod.start')).toDate()
        : null,
      billablePeriodStartText: _.get(claim, 'billablePeriod.start')
        ? moment(_.get(claim, 'billablePeriod.start')).format(
            environment.localFormat.dateTime,
          )
        : null,
      organization: _.get(claim, 'organization'),
      status: _.get(claim, 'status'),
      totalPrice: `${_.get(claim, 'total.value')} ${_.get(
        claim,
        'total.code',
      )}`,
      use: _.get(claim, 'use'),
    }
  }
}

export default SFHIRClaimV1Validator
