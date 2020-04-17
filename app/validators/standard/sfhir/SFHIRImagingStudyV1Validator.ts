import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import * as moment from 'moment'

class SFHIRImagingStudyV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'imaging_study'
    )
  }

  parse(imagingStudy: any): any {
    return {
      encounter: _.get(imagingStudy, 'context.reference'),
      series: _.get(imagingStudy, 'series'),
      started: moment.default(imagingStudy.started)
        ? moment.default(imagingStudy.started).toDate()
        : null,
      startedText: moment.default(imagingStudy.started)
        ? moment
            .default(imagingStudy.started)
            .format(environment.localFormat.dateTime)
        : null,
      uid: _.get(imagingStudy, 'uid'),
    }
  }
}

export default SFHIRImagingStudyV1Validator
