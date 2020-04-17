## Widget List
### 1. Patient Search Bar [link](https://hms-widget.bonmek.com/embedded-widget/patient-search-bar?max=10&offset=0&page=0&filter[gender]=all)

- Able to search Patient by give_name , last_name , identification (Passport , MRN, HN), gender
- Able to return search result in json form
- Filtering will start when click on Search button on press `Enter` on keyboard
- Able to reset filter by click Reset button

### 2. Patient Search Result [link](https://hms-widget.bonmek.com/embedded-widget/patient-search-result?max=10&offset=0&page=0&filter[gender]=all&sort[order]=asc&sort[orderBy]=id)

 - Represent search result of Patient in term of table
 - Able to lazy loading when change page or search 
 - Able to sort by given_name, gender, DOB, ID, MRN
 - Able to navigate to `Patient Summary` by click on Patient row record

### 3. Patient Search [link](https://hms-widget.bonmek.com/embedded-widget/patient-search?max=10&offset=0&page=0&filter[gender]=all&sort[order]=asc&sort[orderBy]=id)

- Able to search Patient by give_name , last_name , identification (Passport, MRN, HN), gender
- Able to return search result in json form
- Filtering will start when click on Search button on press `Enter` on keyboard
- Able to reset filter by click Reset button
- Represent search result of Patient in term of table
- Able to lazy loading when change page or search 
- Able to sort by given_name, gender, DOB, ID, MRN
- Able to navigate to `Patient Summary` by click on Patient row record

### 4. Patient Demographic [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-demographic?patientId=0debf275-d585-4897-a8eb-25726def1ed5)

- Represent Patient's information by use ID of Patient
- Patient's information is first name, last name, picture, age, gender, DOB, phone, address, email, language

### 5. Patient Encounter Timeline [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/encounter-timeline?patientId=0debf275-d585-4897-a8eb-25726def1ed5&max=20&isRouteable=true)

- Represent list of Encounter by use ID of Patient
- Represent list of Encounter in term of timeline table which has date and Encounter's information on right 
- Able to click Encounter row record for show more information like diagnosis, class code, practitioner, type

### 6. Patient Practitioner Card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-practitioner-card?encounterId=3898f0f9-385e-478d-be25-5f05719e80af&maxDisplay=2)

- Represent the list of people responsible for providing the service each encounter by use ID of Encounter
- Able to config maximum number for display practitioners's names. If number of practitioners have more maximum number, it will show `...` for the rest of practitioners
  
### 7. Patient Allergy List Card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-allergy-list-card?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- Represent allergies/intolerance of Patient by use ID of Patient
- Color represents critical allergy/intolerance. Orange represents low critical. Red represents high critical and grey represents unable to assess 
- Represent information in term of table with able to lazy loading when scrolling to bottom
  
### 8. Patient Medication Request List Card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/patient-medication-request-list-card?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- Represent an order or request for both supply of the medication and the instructions for administration of the medication to a patient by use ID of Patient
  
### 9. Patient Immunization Table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/immunization-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

  - Represent the event of a patient being administered a vaccine or a record of immunization as reported by use ID of Patient
- Represent information in term of table with able to lazy loading when scrolling to bottom
- Able to filter by vaccine code and status
- Able to display number of filter that already use for fetch information
- Able to grouping immunization by vaccine code
  
### 10. Patient Condition Table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/condition-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- Represent  a clinical condition, problem, diagnosis or other events of patient by use ID of Patient
- Represent information in term of table with able to lazy loading when scrolling to bottom
- Able to filter by name, clinical status, and verification status
- Able to display number of filters that already use for fetch information
  
### 11. Patient Procedure Table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/procedure-table?patientId=0debf275-d585-4897-a8eb-25726def1ed5&max=20)

- Represent an action that is/was performes on or for a patient by use ID of Patient
- Represent information in term of table with able to lazy loading when scrolling to bottom
- Able to filter by code
- Able to display number of filters that already use for fetch information
  
### 12. Patient Care Plan Table [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/care-plan-table?patientId=6f8f470e-07e8-4273-ad11-6e3fdc384a09&max=20)

- Represent the intention of how practitioners intend to deliver care for patient by use ID of patient
- Represent information in term of table with able to lazy loading when scrolling to bottom
- Able to filter by status
- Able to display number of filters that already use for fetch information
- Able to grouping care plane by category
  
### 13. Patient Summary Card [link](https://hms-widget.bonmek.com/embedded-widget/patient-info/summary-cards?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)

- Represent list of observation which have vial-signs category for a patient per encounter like, Blood Pressure, Body Measurement, Body Temperature, Heart Rate and Tobacco Smoking Status by use ID of patient and encounter
  
### 14. Observation Blood Pressure Card [link](http://localhost:3000/embedded-widget/observation/blood-pressure-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)

- Represent information of blood pressure of patient per encounter  by use ID of patient and encounter
  
### 15. Observation Temperature Card [link](https://hms-widget.bonmek.com/embedded-widget/observation/temperature-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)

- Represent information of body temperature of patient per encounter  by use ID of patient and encounter
  
### 16. Observation Body Measurement Card [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-measurement-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)

- Represent information of body measurement of patient per encounter  by use ID of patient and encounter like height, weight, and body mass index
  
### 17. Observation Heart Rate Card [link](https://hms-widget.bonmek.com/embedded-widget/observation/heart-rate-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)

- Represent information of heart rate of patient per encounter  by use ID of patient and encounter
  
### 18. Observation Tobacco Smoking Status Card [link](https://hms-widget.bonmek.com/embedded-widget/observation/tobacco-smoking-status-card?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)

- Represent information of tobacco smoking status of patient per encounter  by use ID of patient and encounter
  
### 19. Observation Blood Pressure Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/blood-pressure-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)

- Represent information of blood pressure of patient in term of line area graph by use ID of patient
  
### 20. Observation Body Height Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-height-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)

- Represent information of body height of patient in term of line area graph by use ID of patient
  
### 21. Observation Body Weight Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-weight-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)

- Represent information of body weight of patient in term of line area graph by use ID of patient
  
### 22. Observation Body Mass Index Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/body-mass-index-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)

- Represent information of body mass index of patient in term of line area graph by use ID of patient
- 
### 23. Observation Body Temperature Graph [link](http://hms-widget.bonmek.com/embedded-widget/observation/body-temperature-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)

- Represent information of body temperature of patient in term of line area graph by use ID of patient
  
### 24. Observation Heart Rate Graph [link](http://hms-widget.bonmek.com/embedded-widget/observation/heart-rate-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)

- Represent information of heart rate of patient in term of line area graph by use ID of patient
  
### 25. Observation Summary Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/summary-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5)

- Represent information of patient in term of line graph by use ID of patient
- Able to choose what data which user want to display
  
### 26. Observation Laboratory Table [link](https://hms-widget.bonmek.com/embedded-widget/observation/laboratory-table?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af&max=20)

- Represent information of laboratory result of observation of patient by use ID of patient
- Represent information in term of table with able to lazy loading when scrolling to bottom
- Red color on value represents value less than standard and green color is represent value above standard
  
### 27. Observation History Graph [link](https://hms-widget.bonmek.com/embedded-widget/observation/history-graph?patientId=0debf275-d585-4897-a8eb-25726def1ed5&selectedCard=bloodPressure)

- Represent list of observation which have vial-signs category of patient in term of graph
- This widget need information what you want to display like blood pressure, body height, body weight, body mass index, body temperature, heart rate
  
### 28. Patient Summary [link](https://hms-widget.bonmek.com/embedded-widget/patient-summary?patientId=0debf275-d585-4897-a8eb-25726def1ed5&encounterId=3898f0f9-385e-478d-be25-5f05719e80af)

- Represent summary information that relate on patient. The information is allergy/intolerance, medication request, immunization, condition, procedure, care plan and encounter. Also include list of observation which have vital-signs category represent in term of graph like body height, body weight, body mass index, blood pressure, body temperature, and heart rate
- Represent summary information that relates on encounter and patient like practitioners, body height, body weight, body mass index, blood pressure, body temperature, heart rate, and tobacco smoking status
- Able to change position on card
- Able to add/remove card
- Able to resize card
- Able to save state of card that have change position or size as long as page is exist
- Able to rollback to default state
- Able to display list of observation which have vital-signs category in term of graph by click on title of Patient Summary Card that wants to display graph
  
### 29. Embedded Widget [link](https://hms-widget.bonmek.com/embedded-widget)
- Represent document and playground for Embedded widget
- Playground includes form for config parameter which widget use it to represent data and include event response for display event from widget
- Document represents how to install or use the widget and include possible event that can fire from widget
Collapse





