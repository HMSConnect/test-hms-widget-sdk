// TODO update interface Patient Information
interface IPatientInfoName {
  use: string
  family: string
  given: string[]
  prefix: string[]
}
interface IPatientInfoIdentifierCoding {
  system: string
  code: string
}
interface IPatientInfoIdentifierType {
  coding: IPatientInfoIdentifierCoding[]
}
interface IPatientInfoIdentifier {
  type: IPatientInfoIdentifierType
}
export interface IPatientInfoList {
  name: IPatientInfoName[]
  id: string
  gender: string
  identifier: IPatientInfoIdentifier[]
  use: string
  birthDate: string
}