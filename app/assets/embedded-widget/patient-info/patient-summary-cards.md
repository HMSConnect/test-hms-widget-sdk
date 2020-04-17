# Patient Demograhic Summary Table

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/patient-info/summary-cards`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/summary-cards` url to your iframe project.


## Redux Structure
**Redux Store**
Store name is `patientSummaryCards`
| Key       | Type/Format | Default | Description                                           |
| --------- | ----------- | ------- | ----------------------------------------------------- |
| patientId | string      | -       | Patient identification for fetch `observation result` |
**Redux Action**
| Action               | Parameters | Description                  |
| -------------------- | ---------- | ---------------------------- |
| INIT_PATIENT_SUMMARY | any        | Initial Store for fetch data |

## Request HTTP GET
**Query Params**
| Key         | Type/Format | Default | Description                |
| ----------- | ----------- | ------- | -------------------------- |
| patientId   | string      |         | `required` ID of patient   |
| encounterId | string      |         | `required` ID of encounter |


## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)
- **Avaliable event response**
   | Action | Message         | Description                              |
   | ------ | --------------- | ---------------------------------------- |
   | -      | handleCardClick | Event is called when click value on card |

## Example

### Request
 - pathname: `/embedded-widget/patient-info/summary-cards?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af` 

### Action
 - Click BMI label

### Response
```json
{
    "message": "handleCardClick",
    "name": "PatientSummaryCards",
    "params": {
        "cardName": "bodyMassIndex"
    },
    "eventType": "embedded-widget"
}
```


