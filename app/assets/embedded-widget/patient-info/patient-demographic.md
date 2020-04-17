# Patient Demographic
If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)

URL: `/embedded-widget/patient-info/patient-demographic`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/patient-demographic` url to your iframe project.

## Redux Structure
**Redux Store**
Store name is `patientEncounterTimeline`
| Key       | Type/Format | Default | Description                                            |
| --------- | ----------- | ------- | ------------------------------------------------------ |
| patientId | string      | -       | Patient identification for fetch `patient information` |


**Redux Action**
| Action               | Parameters | Description                  |
| -------------------- | ---------- | ---------------------------- |
| INIT_PATIENT_SUMMARY | any        | Initial Store for fetch data |

## Request HTTP GET
**Query Params**
| Key       | Type/Format | Default | Description              |
| --------- | ----------- | ------- | ------------------------ |
| patientId | string      |         | `required` ID of patient |

## Iframe-sdk Setup
widgetName is `patientDemographic`

**Structure Setup**

| Key           | Default | Description                             |
| ------------- | ------- | --------------------------------------- |
| nameField     | True    | if true will render patient's name      |
| ageField      | True    | if true will render patient's age       |
| addressField  | True    | if true will render patient's address   |
| dobField      | True    | if true will render patient's birthdath |
| emailField    | True    | if true will render patient's email     |
| genderField   | True    | if true will render patient's gender    |
| iconField     | True    | if true will render patient's icon      |
| languageField | True    | if true will render patient's language  |
| phoneField    | True    | if true will render patient's phone     |

## Example

### Request
 - pathname: `/embedded-widget/patient-info/patient-demographic?patientId=0debf275-d585-4897-a8eb-25726def1ed5` 
