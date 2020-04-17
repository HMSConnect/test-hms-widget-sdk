# DiagnosticReport Card

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)

URL: `/embedded-widget/medical-records/diagnostic-report-card`

## Setup this widget to iframe
Replace `/embedded-widget/medical-records/diagnostic-report-card` url to your iframe project.

## Request HTTP GET
**Query Params**
| Key            | Type/Format | Default | Description                                  |
| -------------- | ----------- | ------- | -------------------------------------------- |
| patientId      | string      | ''      | `required` ID of patient                     |
| encounterId    | string      | ''      | `required` ID of encounter                   |
| isIncludeModal | boolean     | true    | component can open all data in term of Modal |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)
- **Avaliable event response**
   | Action | Message          | Description                                  |
   | ------ | ---------------- | -------------------------------------------- |
   | -      | handleModalShow  | Event is called when click `Show All` button |
   | -      | handleModalClose | Event is called when click close modal       |

## Example

### Request
 - pathname: `/embedded-widget/medical-records/diagnostic-report-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&isIncludeModal=true` 

### Action
 - Clcik `Show all` button to open modal

### Response
```json
{
    "message": "handleTabChange",
    "params": {
        "data": [
            {
                ... observationData
            },
            {
                ... observationData
            },
            .
            .
            .
        ],
        "tabTitle": "Blood Preassure"
    },
    "eventType": "embedded-widget",
}

// params.data is observationList that observationData.title is match with params.tabTitle
```
