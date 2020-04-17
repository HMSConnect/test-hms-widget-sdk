import IValidator from '@validators/IValidator'
class SFHIRXV1Validator implements IValidator {
  // For Mock
  isValid(schema: any): boolean {
    return schema.standard === 'SFHIRX' && schema.version === 1.0
  }

  parse(x: any): any {
    return x
  }
}

export default SFHIRXV1Validator
