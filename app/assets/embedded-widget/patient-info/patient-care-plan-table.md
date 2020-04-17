# Patient Care Plan Table

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/patient-info/care-plan-table`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/care-plan-table` url to your iframe project.

## Request HTTP GET
**Query Params**
| Key                 | Type/Format | Default   | Description                                                                                |
| ------------------- | ----------- | --------- | ------------------------------------------------------------------------------------------ |
| patientId           | string      |           | `required` ID of patient                                                                   |
| initialFilter[code] | string      | undefined | InitialFilter is original filter, when click `reset` filter value will equal initialFilter |
| max                 | number      | 20        | Number of total records in each fetch                                                      |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)
- **Avaliable event response**
   | Action | Message               | Description                                             |
   | ------ | --------------------- | ------------------------------------------------------- |
   | -      | handleLoadMore        | Event is called when scroll to bottom of timeline       |
   | -      | handleSearchSubmit    | Event is called when submit search                      |
   | -      | handleSearchReset     | Event is called when click reset                        |
   | -      | handleModalShow       | Event is called when click filter icon to open          |
   | -      | handleModalClose      | Event is called when click close filter modal           |
   | -      | handleGroupByCategory | Event is called when click `Group By Category` checkbox |
   | -      | handleTabChange       | Event is called when change tab of group                |

## Example

### Request
 - pathname: `/embedded-widget/patient-info/care-plan-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20` 

### Action
 - Click `Group By Category` checkbox

### Response
```json
{
    "message": "handleTabChange",
    "name": "patientCarePlanTable",
    "params": {
        "filter": {
            "category": "Respiratory therapy",
            "patientId": "6f8f470e-07e8-4273-ad11-6e3fdc384a09",
            "periodStart_lt": undefined,
            "status": ""
        },
        "result": {
            "error": null,
            "schema": {
                "version": 1,
                "standard": "SFHIR",
                "resourceType": "care_plan"
            },
            "data": [
                // ...Care plan data
            ],
        },
        "tabTitle": "Raspiratory therapy",
    },
    "eventType": "embedded-widget"
}
```
```json
{
    "message": "handleGroupByCategory",
    "name": "patientCarePlanTable",
    "params": {
        "filter": {
            "isGroup": true
        },
    },
    "eventType": "embedded-widget"
}
```
