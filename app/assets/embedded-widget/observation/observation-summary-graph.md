# Observation Summary Graph

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/observation/summary-graph`

## Setup this widget to iframe
Replace `/embedded-widget/observation/summary-graph` url to your iframe project.

## Redux Structure
**Redux Store**
Store name is `observationSummaryGraph`
| Key       | Type/Format | Default | Description                                           |
| --------- | ----------- | ------- | ----------------------------------------------------- |
| patientId | string      | -       | Patient identification for fetch `observation result` |
**Redux Action**
| Action               | Parameters | Description                  |
| -------------------- | ---------- | ---------------------------- |
| INIT_PATIENT_SUMMARY | any        | Initial Store for fetch data |

## Request HTTP GET
**Query Params**
| Key       | Type/Format | Default | Description              |
| --------- | ----------- | ------- | ------------------------ |
| patientId | string      |         | `required` ID of patient |


## Example

### Request
 - pathname: `/embedded-widget/observation/summary-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5` 

