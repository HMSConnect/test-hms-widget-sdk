# Patient Procedure Table

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/patient-info/procedure-table`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/procedure-table` url to your iframe project.

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
   | Action | Message            | Description                                       |
   | ------ | ------------------ | ------------------------------------------------- |
   | -      | handleLoadMore     | Event is called when scroll to bottom of timeline |
   | -      | handleSearchSubmit | Event is called when submit search                |
   | -      | handleSearchReset  | Event is called when click reset                  |
   | -      | handleModalShow    | Event is called when click filter icon to open    |
   | -      | handleModalClose   | Event is called when click close filter modal     |


## Example

### Request
 - pathname: `/embedded-widget/patient-info/procedure-table?patientId=0debf275-d585-4897-a8eb-25726def1ed5&max=20` 

### Action
 - Scroll to bottom of table

### Response
```json
{
    "message": "handleLoadMore",
    "name": "patientProcedureTable",****
    "params": {
        "filter": {
            "code": "",
            "patientId": "0debf275-d585-4897-a8eb-25726def1ed5",
            "periodStart_lt": Sat Aug 06 2016 10:39:53 GMT+0700 (Indochina Time),
        },
        "max": 20
    },
    "eventType": "embedded-widget"
}
```
