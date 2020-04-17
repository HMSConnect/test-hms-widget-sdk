# **Widget Contribution**

Any developer who would like to create the new one. You should do following procedure below:

?> **note** : Clone or fork our source first via [Github](https://github.com/HMSConnect/hms-widget-sdk)

## **Create widget**

Any widget component, we allow you to create `stateful` or `stateless` component in `JS` style. The widget will import `sub-component` from `base` component. 

!> **note** : We recommended you to create your widget inside directory `./app/components/widget/`.

## **Create base component**

Base component or sub-component must be `stateless` component in `JS` style. All sub-components should be inside directory `./app/components/base/`

## **Create validator**

It should be inside `./app/components/standards/[DATA_STANDARD_NAME]/`. By `DATA_STANDARD_NAME` can be :

- `hms_connect` is component of HMSConnect standard
- `smart_fhir` is component of SmartFHIR standard

?> **Refer to** : [project structure](/introduction/project_structure)

## **HMS Widget SDK Checklist**
| ResourceType  | Comment  | Sample-data  |  Sample-Image1 |  Sample Image2 |
|---|---|---|---|---|
| Patient  | Patient Search  | patient.json   |  <a href="../assets/1-patient_search.png">![patient search](../assets/1-patient_search.png)</a> |<a href="../assets/2-patient_demographic.png">![patient search](../assets/2-patient_demographic.png)</a>   |
| Patient |Patent Summary (EHR)   | patient.json,observation,lab.json,diagnosis.json  |<a href="../assets/3-patient_summary.png">![EHR Summary](../assets/3-patient_summary.png)</a>   |   |
| Encounter  |Patient Encounter (Visit history)    | Encounter.json   | <a href="../assets/4-patient_encounter.png">![Encounter](../assets/4-patient_encounter.png)</a>  | Table View Style  |
       
