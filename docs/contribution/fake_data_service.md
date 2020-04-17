# **Fake Data Service Contribution**

Any developer who would like to top up feature in the service. You should do following procedure below:

?> **note** : Clone or fork our source first via [Github](https://github.com/HMSConnect/hms-widget-sdk)

## **Introduction**

We provide local database using `minimongo` library to handle query from client, including (for now) :

 - Initial database
 - Uploading raw data to the local database
 
You can refer to `/fake/storage.js`. It is our database object, you can use it in `server.js` to serve data to client. `minimongo` has similar feature like `mongodb` or `mongoose` but it keep all data in memory. If you close it, you will lost the data.

## **Adding more feature**

We allow you to add any features to fake server `/fake/server.js` but you should create the feature to be an object in another file and then import it into `server.js`.

!> **IMPORTANT** : For local database, I recommended you to use `read` only method, you should not adding any `write` feature to local database.

Example our service:

```js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const MockStorage = require('./storage');

const port = process.env.FAKE_PORT || 3002;
const mockStorage = new MockStorage();
let db;

let initService = function(){
    // Prepare data from ".ndjson" files
    mockStorage.setupStorage();

    // Get instance of storage
    db = mockStorage.getDB();
    // Upsert data to the storage
    mockStorage.loadMockSmartFHIRData(function(key, data){
        console.log(`${key}:`, data)

        let fObj = key.split('.');
        let domainNameRes = fObj.length>1?fObj[0]:null;


        if(domainNameRes){
            console.log(`Upsert domain resource name "${domainNameRes}"...`)
            db[domainNameRes].upsert(data, function() {
                // console.log(`Upsert to ${domainNameRes} :`, data)
            });
        }
    })
}

// -----------------------------------------------
// Setup middleware
app.use(cors());

// -----------------------------------------------
// Initial service
initService();

// -----------------------------------------------
// Serv endpoint

// SmartFHIR
app.get('/smart_fhir/:domain_resource/:id', (req, res) => {
    try {
        // Access the storage here

        if(db[req.params.domain_resource]) {
            db[req.params.domain_resource].findOne({ id:req.params.id }, {}, function(data) {
                console.log(`${req.params.domain_resource}: ` + data);
                res.json({ error:null, data:data })
            });
        } else {
            res.json({ error:'The domain resource doesn\'t exist', data:null })
        }
    } catch(err) {
        console.error(err)
        res.json({ error:err, data:null })
    }
})

// -----------------------------------------------
// Listening client
app.listen(port, function(){
  console.log(`Providing fake patient data via port ${port}!`)
});
```