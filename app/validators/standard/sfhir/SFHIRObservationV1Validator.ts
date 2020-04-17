import environment from '@environment'
import IValidator from '@validators/IValidator'
import * as _ from 'lodash'
import * as moment from 'moment'
class SFHIRObservationV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1.0 &&
      schema.resourceType === 'observation'
    )
  }

  parse(observation: any): any {
    const valueQuantity = _.get(observation, 'valueQuantity.value')
    const referenceRange = _.get(observation, 'component')
      ? _.chain(observation.component)
          .map(component => {
            return _.map(component.referenceRange, ref => {
              return {
                ...ref,
                code: _.get(component, 'code.coding[0].code'),
                codeText: _.get(component, 'code.text'),
              }
            })
          })
          .flatten()
          .value()
      : _.map(observation.referenceRange, ref => {
          return {
            ...ref,
            code: _.get(observation, 'code.coding[0].code'),
            codeText: _.get(observation, 'code.text'),
          }
        })

    return {
      categoryText: _.get(observation, 'category[0].coding[0].display'),
      code: _.get(observation, 'code.coding[0].code'),
      codeText: _.get(observation, 'code.text'),
      display: observation.display,
      issued: _.get(observation, 'issued')
        ? moment
            .default(_.get(observation, 'issued'))
            .format(environment.localFormat.dateTime)
        : '',
      issuedDate: _.get(observation, 'issued')
        ? moment.default(_.get(observation, 'issued')).toDate()
        : null,
      referenceRange: referenceRange,
      unit: observation.component
        ? _.get(observation, 'component[0].valueQuantity.unit')
        : _.get(observation, 'valueQuantity.unit'),
      value: observation.component
        ? _.chain(observation.component)
            .map((c: any) => c.valueQuantity.value.toFixed(2))
            .join('/')
            .value()
        : _.isNumber(this.getObservationValue(observation))
        ? Number(this.getObservationValue(observation)).toFixed(2)
        : this.getObservationValue(observation),
      valueModal: observation.component
        ? _.chain(observation.component)
            .map((c: any) => ({
              code: c.code.text,
              value: c.valueQuantity.value,
            }))
            .value()
        : [
            {
              code: observation.code.text,
              value: this.getObservationValue(observation),
            },
          ],
    }
  }

  private getObservationValue(observation: any) {
    const valueKey = _.chain(_.keys(observation))
      .find(key => key.startsWith('value'))
      .value()
    switch (valueKey) {
      case 'valueQuantity':
        return _.get(observation, 'valueQuantity.value')
      case 'valueCodeableConcept':
        return _.get(observation, 'valueCodeableConcept.text')
      default:
        return
    }
  }
}

export default SFHIRObservationV1Validator
