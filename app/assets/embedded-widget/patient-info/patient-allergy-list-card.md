# Patient Allergy List Card

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/patient-info/patient-allergy-list-card`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/patient-allergy-list-card` url to your iframe project.

## Redux Structure
**Redux Store**
Store name is `patientAllergyList`
| Key       | Type/Format | Default | Description                                            |
| --------- | ----------- | ------- | ------------------------------------------------------ |
| patientId | string      | -       | Patient identification for fetch `allergy information` |
**Redux Action**
| Action               | Parameters | Description                  |
| -------------------- | ---------- | ---------------------------- |
| INIT_PATIENT_SUMMARY | any        | Initial Store for fetch data |

## Request HTTP GET
**Query Params**
| Key       | Type/Format | Default | Description                         |
| --------- | ----------- | ------- | ----------------------------------- |
| patientId | string      |         | `required` ID of patient            |
| max       | number      | 20      | Number of total records in one page |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)
- **Avaliable event response**
   | Action | Message        | Description                                       |
   | ------ | -------------- | ------------------------------------------------- |
   | -      | handleLoadMore | Event is called when scroll to bottom of timeline |


## Example

### Request
 - pathname: `/embedded-widget/patient-info/patient-allergy-list-card?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20` 

### Action
 - Scroll to bottom of list
 - 
### Response
```json
{
    "message": "handleLoadMore",
    "name": "patientAllergyList",
    "params": {
        "filter": {
            "patientId": "0debf275-d585-4897-a8eb-25726def1ed5",
            "assertedDate_lt": Mon Nov 29 1971 07:31:15 GMT+0700 (Indochina Time),
            "category": "",
            "codeText": "",
            "criticality": "",
            "type": "",
        },
        "max": 20
    },
    "eventType": "embedded-widget"
}
```