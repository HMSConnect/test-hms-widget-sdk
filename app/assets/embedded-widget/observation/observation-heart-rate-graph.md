# Observation Heart Rate Graph

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)


URL: `/embedded-widget/observation/heart-rate-graph`

## Setup this widget to iframe
Replace `/embedded-widget/observation/heart-rate-graph` url to your iframe project.

## Request HTTP GET
**Query Params**
| Key       | Type/Format | Default | Description                           |
| --------- | ----------- | ------- | ------------------------------------- |
| patientId | string      |         | `required` ID of patient              |
| max       | string      | 20      | Number of total records in each fetch |

## Example

### Request
 - pathname: `/embedded-widget/observation/heart-rate-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&max=20` 

