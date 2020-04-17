# **Data Schema**

We plan to use only one data schema to be main standard. But for now, `SmartFHIR` and `HMSConnect` have different data schema, please refer to example data below:

## **Schema**

 - SmartFHIR : [see more detail](https://github.com/HMSConnect/hms-widget-sdk/blob/master/fake/mock/standards/smart_fhir/patient.js)
 - HMSConnect : [see more detail](https://github.com/HMSConnect/hms-widget-sdk/blob/master/fake/mock/standards/hms_connect/patient.json)

Our widget (HMSConnect standard) will detect data standard from an attribute `hn` in data schema. 

?> **Example**: If it found the attribute in data schema, it will select parser which are support `HMSConnect` standard and render the data on it.