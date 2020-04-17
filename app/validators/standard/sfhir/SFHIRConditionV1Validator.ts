import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import * as moment from 'moment'

class SFHIRConditionV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1.0 &&
      schema.resourceType === 'condition'
    )
  }

  parse(data: any): any {
    return {
      clinicalStatus: _.get(data, 'clinicalStatus') || '',
      codeText: _.get(data, 'code.text'),
      onset: _.get(data, 'onsetDateTime')
        ? moment
            .default(_.get(data, 'onsetDateTime'))
            .format(environment.localFormat.dateTime)
        : null,
      onsetDateTime: _.get(data, 'onsetDateTime')
        ? moment.default(_.get(data, 'onsetDateTime')).toDate()
        : null,
      verificationStatus: _.get(data, 'verificationStatus') || '',
    }
  }
}

export default SFHIRConditionV1Validator
