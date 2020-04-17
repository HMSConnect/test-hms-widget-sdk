# Practitioner Card

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/patient-info/patient-practitioner-card`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/patient-practitioner-card` url to your iframe project.

## Redux Structure
**Redux Store**
Store name is `patientPractitioner`
| Key         | Type/Format | Default | Description                                                |
| ----------- | ----------- | ------- | ---------------------------------------------------------- |
| encounterId | string      | -       | Encounter identification for fetch `encounter participant` |
| maxDisplay  | string      | -       | `Max` number for display `encounter participant` |
**Redux Action**
| Action               | Parameters | Description                  |
| -------------------- | ---------- | ---------------------------- |
| INIT_PATIENT_SUMMARY | any        | Initial Store for fetch data |

## Request HTTP GET
**Query Params**
| Key         | Type/Format | Default | Description                    |
| ----------- | ----------- | ------- | ------------------------------ |
| encounterId | string      |         | `required` ID of encounter     |
| maxDisplay  | number      | 2       | number for render practitioner |

## Example

### Request
 - pathname: `/embedded-widget/patient-info/patient-practitioner-card?encounterId=3898f0f9-385e-478d-be25-5f05719e80af` 

