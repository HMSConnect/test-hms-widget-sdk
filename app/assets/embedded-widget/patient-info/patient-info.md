# Patient Info

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)

URL: `/embedded-widget/patient-info-with-table`

## Setup this widget to iframe
Replace `/embedded-widget/patient-info-with-table` url to your iframe project.

## Request HTTP GET


**Query Params**
| Key          | Type/Format | Default   | Description              |
| ------------ | ----------- | --------- | ------------------------ |
| patientId    | string      |           | `required` ID of patient |
| menuNavigate | string      | 'patient' | Name of sidemenu         |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)

- **Avaliable Response**
   | Action     | Message               | Description                           |
   | ---------- | --------------------- | ------------------------------------- |
   | -          | handleNavigateChange  | Event is called when select sidemenu  |
   | PUSH_ROUTE | handleEncounterSelect | Event is called when select encounter |
## Example

### Request
 - pathname: `/embedded-widget/patient-info-with-table?patientId=0debf275-d585-4897-a8eb-25726def1ed5&menuNavigate=encounter` 

### Action
 - Select side menu `claim`

### Response
```json
{
    "message": "handleNavigateChange",
    "params": {
        "menuNavigate": "claim"
    },
    "path": "/embedded-widget/patient-info-with-table?patientId=0debf275-d585-4897-a8eb-25726def1ed5&menuNavigate=claim",
    "eventType": "embedded-widget",
}
```
