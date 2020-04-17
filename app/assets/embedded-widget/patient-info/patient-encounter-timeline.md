# Patient Encounter Timeline

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/patient-info/encounter-timeline`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info/encounter-timeline` url to your iframe project.

## Redux Structure
**Redux Store**
Store name is `patientDemographic`
| Key       | Type/Format | Default | Description                                            |
| --------- | ----------- | ------- | ------------------------------------------------------ |
| patientId | string      | -       | Patient identification for fetch `patient information` |
**Redux Action**
| Action               | Parameters | Description                  |
| -------------------- | ---------- | ---------------------------- |
| INIT_PATIENT_SUMMARY | any        | Initial Store for fetch data |

## Request HTTP GET

**Query Params**
| Key       | Type/Format | Default                  | Description |
| --------- | ----------- | ------------------------ | ----------- |
| patientId | string      | `required` ID of patient |

| initialFilter[status] | string      | undefined | InitialFilter is original filter, when click `reset` filter value will equal initialFilter |
| max                   | number      | 20        | Number of total records in one page                                                        |
| isRouteable           | boolean     | true      | Is allow route to medical Panel                                                            |
| withOrganization      | boolean     | true      | Is data include `Organization` infomation                                                  |
| withDiagnosticReport  | boolean     | true      | Is data include `DiagnosticReport` infomation                                              |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)
- **Avaliable event response**
   | Action         | Message               | Description                                                                           |
   | -------------- | --------------------- | ------------------------------------------------------------------------------------- |
   | -              | handleLoadMore        | Event is called when scroll to bottom of timeline                                     |
   | -              | handleSearchSubmit    | Event is called when submit search                                                    |
   | -              | handleSearchReset     | Event is called when click reset                                                      |
   | -              | handleModalShow       | Event is called when click filter icon to open                                        |
   | -              | handleModalClose      | Event is called when click close filter modal                                         |
   | PUSH_ROUTE / - | handleEncounterSelect | Event is called when select encounter it will `PUSH_ROUTE` if `isRouteable` is `true` |

## Example

### Request
 - pathname: `/embedded-widget/patient-info/encounter-timeline?patientId=0debf275-d585-4897-a8eb-25726def1ed5&max=20&isRouteable=true` 

### Action
 - Scroll to bottom of timeline

### Response
```json
{
    "message": "handleLoadMore",
    "name": "patientEncounterTimeline",
    "params": {
        "filter": {
            "patientId": "0debf275-d585-4897-a8eb-25726def1ed5",
            "periodStart_lt": Sat Sep 17 2016 10:39:53 GMT+0700 (Indochina Time),
            "status": "",
            "type": undefined
        },
        "max": 20
    },
    "eventType": "embedded-widget"
}
```
