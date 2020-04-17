# Patient Imaging Study Table

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/patient-info/imaging-study-table`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/imaging-study-table` url to your iframe project.

## Request HTTP GET
**Query Params**
| Key       | Type/Format | Default | Description                           |
| --------- | ----------- | ------- | ------------------------------------- |
| patientId | string      |         | `required` ID of patient              |
| max       | number      | 20      | Number of total records in each fetch |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)
- **Avaliable event response**
   | Action | Message        | Description                                       |
   | ------ | -------------- | ------------------------------------------------- |
   | -      | handleLoadMore | Event is called when scroll to bottom of timeline |

## Example

### Request
 - pathname: `/embedded-widget/patient-info/imaging-study-table?patientId=03c2e1b5-9fe0-4735-bc7d-a54c449bfdae&max=20` 

### Action
 - Scroll to bottom of table

### Response
```json
{
    "message": "handleLoadMore",
    "name": "patientImagingStudyTable",
    "params": {
        "filter": {
            "patientId": "019fe101-2d2b-4346-89d6-7c7187c0ee3c",
            "started_lt": Tue Jul 28 2015 07:31:15 GMT+0700 (Indochina Time),
        },
        "max": 20
    },
    "eventType": "embedded-widget"
}
```
