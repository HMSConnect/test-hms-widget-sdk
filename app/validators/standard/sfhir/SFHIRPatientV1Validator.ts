import IValidator from '@validators/IValidator'
import get from 'lodash/get'
import map from 'lodash/map'

class SFHIRPatientV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'patient'
    )
  }

  parse(patient: any): any {
    let compileStandard
    const name = patient.name[0]
    const age = patient
      ? patient.birthDate
        ? patient.deceasedDateTime
          ? patient.deceasedDateTime.split('-')[0] -
            patient.birthDate.split('-')[0]
          : new Date().getFullYear() - patient.birthDate.split('-')[0]
        : 'Unknown'
      : 'Unknown'
    const address: any = {
      city: '',
      country: '',
      geolocation: '',
      line: [],
      postalCode: '',
      state: '',
    }
    const geolocation = {
      latitude: 0,
      longitude: 0,
    }

    const identifier: any = {}

    identifier['id'] = { systemCode: 'ID', value: patient.id }
    patient.identifier.map((o: any, oIndex: number) => {
      if (
        o.hasOwnProperty('type') &&
        o.type.hasOwnProperty('coding') &&
        Array.isArray(o.type.coding) &&
        o.type.coding.length > 0
      ) {
        if (o.value) {
          identifier[o.type.coding[0].code.toLowerCase()] = {
            systemCode: o.type.coding[0].code,
            value: o.value ? o.value : 'Unknown',
          }
        }
      } else {
        const code = o.system.split('/').pop()
        identifier[code] = {
          systemCode: code,
          value: o.value,
        }
      }
    })

    if (Array.isArray(patient.address) && patient.address.length > 0) {
      if (Array.isArray(patient.address[0].line)) {
        address.line = patient.address[0].line
      }

      address.city = patient.address[0].city ? patient.address[0].city : ''
      address.state = patient.address[0].state ? patient.address[0].state : ''
      address.postalCode = patient.address[0].postalCode
        ? patient.address[0].postalCode
        : ''
      address.country = patient.address[0].country
        ? patient.address[0].country
        : ''

      // Geolocation
      if (Array.isArray(patient.address[0].extension)) {
        if (
          patient.address[0].extension[0] &&
          patient.address[0].extension[0].url === 'latitude'
        ) {
          geolocation.latitude = patient.address[0].extension[0].valueDecimal
        }
        if (
          patient.address[0].extension[1] &&
          patient.address[0].extension[1].url === 'longitude'
        ) {
          geolocation.longitude = patient.address[0].extension[1].valueDecimal
        }
      }

      address.geolocation = Object.assign({}, geolocation)
    }

    const communication = map(patient.communication, com =>
      get(com, 'language.text'),
    )

    // Remove "unused" key
    delete name['use']

    compileStandard = {
      address: [address],
      age,
      birthDate: patient.birthDate,
      communication,
      deceasedDateTime: patient.deceasedDateTime,
      email: patient.email,
      gender: patient.gender,
      identifier,
      name,
      telecom: patient.telecom,
    }
    return compileStandard
  }
}

export default SFHIRPatientV1Validator
