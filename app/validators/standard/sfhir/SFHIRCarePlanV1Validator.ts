import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import * as moment from 'moment'
class SFHIRCarePlanV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'care_plan'
    )
  }

  parse(carePlan: any): any {
    return {
      activity: _.get(carePlan, 'activity'),
      category: _.chain(carePlan.category)
        .map(category => category.text)
        .join(', ')
        .value(),
      periodStart: _.get(carePlan, 'period.start')
        ? moment.default(_.get(carePlan, 'period.start')).toDate()
        : null,
      periodStartText: _.get(carePlan, 'period.start')
        ? moment
            .default(_.get(carePlan, 'period.start'))
            .format(environment.localFormat.dateTime)
        : null,
      status: _.get(carePlan, 'status'),
    }
  }
}

export default SFHIRCarePlanV1Validator
