# Patient Search Bar

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)

URL: `/embedded-widget/patient-search-bar`

## Setup this widget to iframe
Replace `/embedded-widget/patient-search-bar` url to your iframe project.

## Request HTTP GET
**Query Params**
| Key                | Type/Format         | Default | Description                                      |
| ------------------ | ------------------- | ------- | ------------------------------------------------ |
| filter[gender]     | ` male|female|all ` | all     | Filter patient result by gender                  |
| filter[searchText] | string              | ""      | Filter patient result by name/surname/identifier |
| max                | number              | 10      | Number of total records in one page              |
| offset             | number              | 0       | Index for lazyload                               |
| page               | number              | 1       | Page number                                      |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)

- **Avaliable Response**
   | Action | Message               | Description                              |
   | ------ | --------------------- | ---------------------------------------- |
   | -      | initialize            | Event is called when initialize widget   |
   | -      | handleSearchSubmit    | Event is called when click search button |
   | -      | handlePaginationReset | Event is called when click reset button  |

## Example

### Request
 - pathname: `/embedded-widget/patient-search-bar` 

### Response
```json
{
  "message": "initialize",
  "name": "patientSearchBar",
  "params": {
    "filter": {
      "gender": "all",
      "searchText": ""
    },
    "max": 10,
    "offset": 0,
    "page": 1
  },
  "path": "embedded-widget/patient-search-bar?filter%5Bgender%5D=all&filter%5BsearchText%5D=&max=10&offset=0&page=1",
  "result": {
    "error": null,
    "schema": {},
    "version": 1,
    "standard": "SFHIR",
    "resourceType": "patient",
    "data": [],
    "totalCount": 1050
  }
}
```
