import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import moment from 'moment'

class SFHIRProcedureV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1.0 &&
      schema.resourceType === 'procedure'
    )
  }

  parse(data: any): any {
    return {
      code: _.get(data, 'code.coding[0].code'),
      codeText: data.code.text,
      performedPeriodStart: _.get(data, 'performedPeriod.start')
        ? moment(_.get(data, 'performedPeriod.start')).toDate()
        : null,
      performedPeriodStartText: _.get(data, 'performedPeriod.start')
        ? moment(_.get(data, 'performedPeriod.start')).format(
            environment.localFormat.dateTime,
          )
        : null,
      status: data.criticality,
    }
  }
}

export default SFHIRProcedureV1Validator
