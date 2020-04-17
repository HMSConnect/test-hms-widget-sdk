import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import moment from 'moment'

class SFHIRMedicationRequestV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1.0 &&
      schema.resourceType === 'medication_request'
    )
  }

  parse(data: any): any {
    return {
      authoredOn: _.get(data, 'authoredOn')
        ? moment(_.get(data, 'authoredOn')).toDate()
        : null,
      authoredOnText: _.get(data, 'authoredOn')
        ? moment(_.get(data, 'authoredOn')).format(
            environment.localFormat.dateTime,
          )
        : null,
      medicationCodeableConcept: _.get(data, 'medicationCodeableConcept.text'),
      sctCode: _.get(data, 'code.coding[0].code'),
      status: data.status,
    }
  }
}

export default SFHIRMedicationRequestV1Validator
