import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import * as moment from 'moment'

class SFHIRImmunizationV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1.0 &&
      schema.resourceType === 'immunization'
    )
  }

  parse(data: any): any {
    return {
      date: moment.default(data.date)
        ? moment.default(data.date).toDate()
        : null,
      dateText: moment.default(data.date)
        ? moment.default(data.date).format(environment.localFormat.dateTime)
        : null,
      primarySource: _.get(data, 'primarySource') || false,
      status: _.get(data, 'status') || 'Unknow',
      vaccineCode: _.get(data, 'vaccineCode.text') || 'Unknow',
    }
  }
}

export default SFHIRImmunizationV1Validator
