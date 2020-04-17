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