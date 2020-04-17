export default interface IValidator {
  isValid(schema: any): boolean
  parse(obj: any): any
}
