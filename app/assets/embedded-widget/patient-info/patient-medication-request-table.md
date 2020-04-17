# Patient Medication Request Table

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/patient-info/medication-request-table`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/medication-request-table` url to your iframe project.

## Request HTTP GET

**Query Params**
| Key                                      | Type/Format | Default   | Description                                                                                |
| ---------------------------------------- | ----------- | --------- | ------------------------------------------------------------------------------------------ |
| patientId                                | string      |           | `required` ID of patient                                                                   |
| initialFilter[status]                    | string      | undefined | InitialFilter is original filter, when click `reset` filter value will equal initialFilter |
| initialFilter[medicationCodeableConcept] | string      | undefined | InitialFilter is original filter, when click `reset` filter value will equal initialFilter |
| max                                      | number      | 20        | Number of total records in each fetch                                                      |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)
- **Avaliable event response**
   | Action | Message            | Description                                       |
   | ------ | ------------------ | ------------------------------------------------- |
   | -      | handleLoadMore     | Event is called when scroll to bottom of timeline |
   | -      | handleSearchSubmit | Event is called when submit search                |
   | -      | handleSearchReset  | Event is called when click reset                  |
   | -      | handleModalShow    | Event is called when click filter icon to open    |
   | -      | handleModalClose   | Event is called when click close filter modal     |

## Example

### Request
 - pathname: `/embedded-widget/patient-info/medication-request-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20` 

### Action
 - Scroll to bottom of table

### Response
```json
{
    "message": "handleLoadMore",
    "name": "patientMedicationRequestTable",
    "params": {
        "filter": {
            "patientId": "6f8f470e-07e8-4273-ad11-6e3fdc384a09",
            "authoredOn_lt": Fri Apr 06 2012 07:31:15 GMT+0700 (Indochina Time)),
            "medicationCodeableConcept": "",
            "status": ""
        },
        "max": 20
    },
    "eventType": "embedded-widget"
}
```
