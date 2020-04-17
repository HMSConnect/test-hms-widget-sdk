import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
class SFHIRPractitionerV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'practitioner'
    )
  }

  parse(practitioner: any) {
    const individual = practitioner.individual
    return {
      displayName: `${
        _.isArray(_.get(individual, 'name[0].prefix'))
          ? _.join(_.get(individual, 'name[0].prefix'), '/')
          : _.get(individual, 'name[0].prefix')
      } ${
        _.isArray(_.get(individual, 'name[0].given'))
          ? _.join(_.get(individual, 'name[0].given'), ' ')
          : _.get(individual, 'name[0].given')
      } ${
        _.isArray(_.get(individual, 'name[0].family'))
          ? _.join(_.get(individual, 'name[0].family'), ' ')
          : _.get(individual, 'name[0].family')
      }`,
      name: individual.name,
      qualification: _.chain(individual.qualification)
        .map(qualification => _.get(qualification, 'code.text'))
        .join(', ')
        .value(),
      telecom: _.chain(individual.telecom)
        .map(telecom => telecom.value)
        .join(', ')
        .value(),
    }
  }
}

export default SFHIRPractitionerV1Validator
