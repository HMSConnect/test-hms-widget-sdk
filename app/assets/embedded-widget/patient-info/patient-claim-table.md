# Patient Claim Table

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/patient-info/claim-table`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/claim-table` url to your iframe project.

## Request HTTP GET

**Query Params**
| Key                   | Type/Format | Default   | Description                                                                                |
| --------------------- | ----------- | --------- | ------------------------------------------------------------------------------------------ |
| patientId             | string      |           | `required` ID of patient                                                                   |
| initialFilter[status] | string      | undefined | InitialFilter is original filter, when click `reset` filter value will equal initialFilter |
| max                   | number      | 20        | Number of total records in each fetch                                                      |

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
 - pathname: `/embedded-widget/patient-info/claim-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20` 

### Action
 - Filter with `status` value `active`

### Response
```json
{
      "message": "handleModalClose: Claim Filter",
      "name": "patientClaimTableModal",
      "params": {
        "open": false,
},
```
```json
{
    
    "message": "handleSearchSubmit",
    "name": "patientClaimTable",
    "params": {
        "filter": {
            "status": "active",
            "organizationId": "",
            "billablePeriodStart_lt": undefined,
            "patientId": "6f8f470e-07e8-4273-ad11-6e3fdc384a09",
        },
        "max": 20
    },
    "eventType": "embedded-widget"
}
```
```json
{
      "message": "handleModalClose: Claim Filter",
      "name": "patientClaimTableModal",
      "params": {
        "open": true,
},
```
