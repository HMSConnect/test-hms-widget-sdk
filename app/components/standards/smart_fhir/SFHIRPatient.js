export default function SFHIRPatient(){
    return {
        _patient:null,
        setData: function(p){
            this._patient = null;
            this._patient = Object.assign({}, p);
        },
        isValid: function(data){
            return data?data.hasOwnProperty('id')?true:false:false
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

                // console.log('Compile FHIR standard : ', compileStandard);
            }

            return compileStandard
        }
    }
}