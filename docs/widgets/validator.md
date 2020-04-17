# **Validator**

In the real world, we can not guarantee that data source provider will providing data schema same as the previous one. So frontend should prevent the situation by creating validator to check data schema and create default value before rendering the data on the screen.

?> **note** : The validator should be validate data from `SmartFHIR` and `HMSConnect`.

## **SmartFHIR**

```js
// Ex. SmartFHIR standard for domain resource of "patient"
// Ref:
// ./app/components/standards/smart_fhir/SFHIRPatient.js

export default function SFHIRPatient(){
    return {
        _patient:null,
        setData: function(p){
            this._patient = null;
            this._patient = Object.assign({}, p);
        },
        isValid: function(data){
            return data
                ? data.hasOwnProperty('meta')
                ? data.meta.hasOwnProperty('tag')
                ? Array.isArray(data.meta.tag) && data.meta.tag[0].hasOwnProperty('code')
                ? data.meta.tag[0].code=='smart-8-2017'
                ? true
                : false
                : false
                : false
                : false
                : false;
        },
        compile: function(){
            let compileStandard;
            let patient = this._patient?Object.assign({}, this._patient):null;
            if(patient) {

                let name = patient.name[0];
                let age = patient
                    ? patient.birthDate
                    ? patient.deceasedDateTime
                    ? (patient.deceasedDateTime.split('-')[0] - patient.birthDate.split('-')[0])
                    : ((new Date().getFullYear()) - patient.birthDate.split('-')[0])
                    : 'Unknown'
                    : 'Unknown'
                let address = {
                    line:[], city:'', state:'', postalCode:'', country:'', geolocation:''
                }
                let geolocation = {
                    latitude:0,
                    longitude:0
                }

                let identifier = {};

                identifier['id'] = { systemCode: 'ID', value: patient.id }
                patient.identifier.map((o, oIndex) => {
                    if(o.hasOwnProperty('type') 
                        && o.type.hasOwnProperty('coding') 
                        && Array.isArray(o.type.coding)
                        && o.type.coding.length>0) {
                        if(o.value) {
                            identifier[o.type.coding[0].code.toLowerCase()] = {
                                systemCode: o.type.coding[0].code,
                                value: o.value?o.value:'Unknown'
                            };
                        }
                    } else {
                        let code = o.system.split('/').pop();
                        identifier[code] = {
                            systemCode: code,
                            value: o.value
                        };
                    }
                });

                if(Array.isArray(patient.address) && patient.address.length>0){ 
                    if(Array.isArray(patient.address[0].line)){ address.line = patient.address[0].line }

                    address.city = patient.address[0].city?patient.address[0].city:'';
                    address.state = patient.address[0].state?patient.address[0].state:'';
                    address.postalCode = patient.address[0].postalCode?patient.address[0].postalCode:'';
                    address.country = patient.address[0].country?patient.address[0].country:'';

                    // Geolocation
                    if(Array.isArray(patient.address[0].extension)){
                        if(patient.address[0].extension[0] && patient.address[0].extension[0].url=='latitude') geolocation.latitude = patient.address[0].extension[0].valueDecimal;
                        if(patient.address[0].extension[1] && patient.address[0].extension[1].url=='longitude') geolocation.longitude = patient.address[0].extension[1].valueDecimal;
                    }

                    address.geolocation = Object.assign({}, geolocation);
                }
                
                // Remove "unused" key
                delete name['use'];

                compileStandard = {
                    name:name,
                    gender:patient.gender,
                    birthDate:patient.birthDate,
                    identifier: identifier,
                    email:patient.email,
                    age:age,
                    telecom: patient.telecom,
                    address: [address],
                    deceasedDateTime:patient.deceasedDateTime
                };

                console.log('Compile FHIR standard : ', compileStandard);
            }

            return compileStandard
        }
    }
}
```

## **HMSConnect**

```js
// Ex. HMSConnect standard for domain resource of "patient"
// Ref:
// ./app/components/standards/hms_connect/HMSPatient.js

export default function HMSPatient(){
    return {
        _patient:null,
        setData: function(p){
            this._patient = null;
            this._patient = Object.assign({}, p);
        },
        isValid: function(data){
            return data?data.hasOwnProperty('hn')?true:false:false
        },
        compile: function(){
            let compileStandard;
            let patient = this._patient?Object.assign({}, this._patient):null;
            if(patient) {

                let name = {
                    "family": [
                        patient.name[0].familyName
                    ],
                    "given": [
                        patient.name[0].givenName
                    ],
                    "prefix": [
                        patient.name[0].prefix
                    ]
                };

                let age = patient
                    ? patient.birthDate
                    ? patient.deceasedDateTime
                    ? (patient.deceasedDateTime.split('-')[0] - patient.birthDate.split('-')[0])
                    : ((new Date().getFullYear()) - patient.birthDate.split('-')[0])
                    : 'Unknown'
                    : 'Unknown'
                let address = {
                    line:[], city:'', state:'', postalCode:'', country:''
                }

                let identifier = {};

                identifier['id'] = { systemCode: 'HN', value: patient.hn }
                patient.identifier.map((o, oIndex) => {
                    if(o.hasOwnProperty('type')) {
                        if(o.value) {
                            identifier[o.type.toLowerCase()] = {
                                systemCode: o.type,
                                value: o.value?o.value:'Unknown'
                            };
                        }
                    }
                });

                if(Array.isArray(patient.address) && patient.address.length>0){ 
                    if(Array.isArray(patient.address[0].line)){ address.line = patient.address[0].line }

                    address.city = patient.address[0].city?patient.address[0].city:'';
                    address.state = patient.address[0].state?patient.address[0].state:'';
                    address.postalCode = patient.address[0].postalCode?patient.address[0].postalCode:'';
                    address.country = patient.address[0].country?patient.address[0].country:'';
                }

                compileStandard = {
                    name:name,
                    gender:patient.gender,
                    birthDate:patient.birthDate,
                    identifier: identifier,
                    email:patient.email,
                    age:age,
                    telecom: patient.telecom,
                    address: [address],
                    deceasedDateTime:patient.deceasedDateTime
                };

                console.log('Compile FHIR standard : ', compileStandard);
            }

            return compileStandard
        }
    }
}
```

## **Usage**

```js
// Ref:
// ./app/components/widget/PatientInfo.js 
// in loadDataByStandard(...) function

    this.callingAPI(
        sanboxEndpoint, 
        'GET',
        null,
        null,
        function(data) {

            // Validate data before select compiler
            
            if(HMSPatientObj.isValid(data)) {
                HMSPatientObj.setData(data);
                info = HMSPatientObj.compile();
            } else if(SFHIRPatientObj.isValid(data)) {
                SFHIRPatientObj.setData(data);
                info = SFHIRPatientObj.compile();
            } else {
                alert('Sorry, we are not support current data standard!')
            }
            
            if(info) {
                _this.setState({ patient:info });
            }
        }
    );
```