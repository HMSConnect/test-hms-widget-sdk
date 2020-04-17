# Patient Search

If you are new user, please read [Getting started with HMS Widget](/embedded-widget?widget=get-started)

URL: `/embedded-widget/patient-search`

## Setup this widget to iframe
Replace `/embedded-widget/patient-search` url to your iframe project.

## Request HTTP GET
**Query Params**
| Key                | Type/Format         | Default | Description                                      |
| ------------------ | ------------------- | ------- | ------------------------------------------------ |
| filter[gender]     | ` male|female|all ` | all     | Filter patient result by gender                  |
| filter[searchText] | string              | ""      | Filter patient result by name/surname/identifier |
| sort[order]        | ` asc"desc`         | asc     | Order for `orderBy` query param                  |
| sort[orderBy]      | string              | id      | Sort field                                       |
| max                | number              | 10      | Number of total records in one page              |
| offset             | number              | 0       | Index for lazyload                               |
| page               | number              | 0       | Page number                                      |

## Response
- **Object Response**
    You can learn this in topic [Getting started with HMS Widget](/embedded-widget?widget=get-started)

- **Avaliable Response**
   | Action        | Message               | Description                              |
   | ------------- | --------------------- | ---------------------------------------- |
   | REPLACE_ROUTE | handleSearchSubmit    | Event is called when click search button |
   | REPLACE_ROUTE | handlePaginationReset | Event is called when click reset button  |
   | REPLACE_ROUTE | handlePageChange      | Event is called when page\max is changed |
   | REPLACE_ROUTE | handleRequestSort     | Event is called when click sort button   |
   | PUSH_ROUTE    | handlePatientSelect   | Event is called when click row data      |
## Example

### Request
 - pathname: `/embedded-widget/patient-search` 

### Action
 - Search by 
```json
    {
        "filter": {
            "searchText": "kai",
            "gender": "female"
        }
    }
```

### Response
```json
{
    "action": "REPLACE_ROUTE",
    "message": "handleSearchSubmit",
    "params": {
        "filter": {
            "gender": "female",
            "searchText": "kai",
        },
        "max": 10,
        "offset": 0,
        "page": 0,
        "sort": {
            "order": "asc",
            "orderBy": "id",
        },
    },
    "path": "/embedded-widget/patient-search?filter%5Bgender%5D=female&filter%5BsearchText%5D=kai&max=10&offset=0&page=0&sort%5Border%5D=asc&sort%5BorderBy%5D=id",
    "eventType": "embedded-widget",
}
```
