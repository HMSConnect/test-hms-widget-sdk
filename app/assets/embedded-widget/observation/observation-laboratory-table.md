# Observation Laboratory Table

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/observation/laboratory-table`

## Setup this widget to iframe
Replace `/embedded-widget/observation/laboratory-table` url to your iframe project.

## Redux Structure
**Redux Store**
Store name is `observationLaboratoryTable`
| Key         | Type/Format | Default | Description                                               |
| ----------- | ----------- | ------- | --------------------------------------------------------- |
| patientId   | string      | -       | Patient identification for fetch `laboratory information` |
| encounterId | string      | -       | Patient identification for fetch `laboratory information` |
**Redux Action**
| Action               | Parameters | Description                  |
| -------------------- | ---------- | ---------------------------- |
| INIT_PATIENT_SUMMARY | any        | Initial Store for fetch data |

## Request HTTP GET
**Query Params**
| Key         | Type/Format | Default | Description                           |
| ----------- | ----------- | ------- | ------------------------------------- |
| patientId   | string      |         | `required` ID of patient              |
| encounterId | string      |         | `required` ID of encounter            |
| max         | number      | 20      | Number of total records in each fetch |

## Example

### Request
 - pathname: `/embedded-widget/observation/laboratory-table?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20` 

