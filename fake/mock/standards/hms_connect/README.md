# MockUp Data Usage Guide
There are 2 data format
- **JSON**  is baseon 
- **NBJSON**  is base on version 3 on smart fhire 

Recommended to use **NBJSON**

## Usage guide of **nbjson**
**Organization** has 0--m  relation to **Encounter**
**Patient** has 1--m relation to **Encounter**
**Encounter** has 1--m relation to [**Observeion(vital-sign)**, **Observation(lab)**, **Medication **, **MeicationRequest**]
### Identificaiton from patient to encounter
- Use Patient id=**a1f91f29-b0d7-4f4c-a530-b7719dfbd470** represent Mrs.Susan Miden ,Hudson.
- Use Encounter id =**3b8066d8-15fd-4687-9343-3eb48df24dcb** navigate to other health record.
   
