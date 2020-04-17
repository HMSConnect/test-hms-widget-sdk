# Getting started with Redux - HMS Widget

# **Redux Structure**

HMS Widget use redux to store some state that need to use for many widget such as `ObservationBloodPressureCard` and `ObservationBodyMeasurement`, both need `patientId` and `encounterId` to fetch data.

In our structure, redux-store will create per widget. **We will explain the Redux structure in each of those widgets.**
