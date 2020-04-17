//////////// allergy ///////////////////

export const allergyIntoleranceType = {
  ALLERGY: 'allergy',
  INTOLERANCE: 'intolerance',
}

export const allergyIntoleranceCriticality = {
  HIGH: 'high',
  LOW: 'low',
  UNABLETOASSESS: 'unable-to-assess',
}

export const allergyIntoleranceTypeOption = [
  {
    label: 'Allergy',
    value: allergyIntoleranceType.ALLERGY,
  },
  {
    label: 'Intolerance',
    value: allergyIntoleranceType.INTOLERANCE,
  },
]

export const allergyIntoleranceCriticalityOption = [
  {
    label: 'Low',
    value: allergyIntoleranceCriticality.LOW,
  },
  {
    label: 'High',
    value: allergyIntoleranceCriticality.HIGH,
  },
  {
    label: 'Unable to Assess Risk',
    value: allergyIntoleranceCriticality.UNABLETOASSESS,
  },
]
//////////// allergy ///////////////////

///////////////// condition ///////////////////

export const conditionClinicalStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  RECURRENCE: 'recurrence',
  RELAPSE: 'relapse',
  REMISSION: 'remission',
  RESOLVED: 'resolved',
}

export const conditionVerificationStatus = {
  CONFIRMED: 'confirmed',
  PROVISIONAL: 'provisional',
  REFUTED: 'refuted',
  DIFFERENTIAL: 'differential',
  UNCONFIRMED: 'unconfirmed',
  ENTEREDINERROR: 'entered-in-error',
}

export const conditionClinicalStatusOption = [
  {
    label: 'Active',
    value: conditionClinicalStatus.ACTIVE,
  },
  {
    label: 'Recurrence',
    value: conditionClinicalStatus.RECURRENCE,
  },
  {
    label: 'Relapse',
    value: conditionClinicalStatus.RELAPSE,
  },
  {
    label: 'Inactive',
    value: conditionClinicalStatus.INACTIVE,
  },
  {
    label: 'Remission',
    value: conditionClinicalStatus.REMISSION,
  },
  {
    label: 'Resolved',
    value: conditionClinicalStatus.RESOLVED,
  },
]

export const conditionVerificationStatusOption = [
  {
    label: 'Unconfirmed',
    value: conditionVerificationStatus.UNCONFIRMED,
  },
  {
    label: 'Provisional',
    value: conditionVerificationStatus.PROVISIONAL,
  },
  {
    label: 'Differential',
    value: conditionVerificationStatus.DIFFERENTIAL,
  },
  {
    label: 'Confirmed',
    value: conditionVerificationStatus.CONFIRMED,
  },
  {
    label: 'Refuted',
    value: conditionVerificationStatus.REFUTED,
  },
  {
    label: 'Entered in Error',
    value: conditionVerificationStatus.ENTEREDINERROR,
  },
]

///////////////// condition ///////////////////

/////////////////////// encounter /////////////////////

export const encounterStatus = {
  PLANNED: 'planned',
  ARRIVED: 'arrived',
  TRIAGED: 'triaged',
  INPROGRESS: 'in-progress',
  ONLEAVE: 'onleave',
  FINISHED: 'finished',
  CANCELLED: 'cancelled',
  ENTEREDINERROR: 'entered-in-error',
  UNKNOW: 'unknow',
}

export const encounterStatusOption = [
  {
    label: 'planned',
    value: encounterStatus.PLANNED,
  },
  {
    label: 'arrived',
    value: encounterStatus.ARRIVED,
  },
  {
    label: 'triaged',
    value: encounterStatus.TRIAGED,
  },
  {
    label: 'in-progress',
    value: encounterStatus.INPROGRESS,
  },
  {
    label: 'onleave',
    value: encounterStatus.ONLEAVE,
  },
  {
    label: 'finished',
    value: encounterStatus.FINISHED,
  },
  {
    label: 'cancelled',
    value: encounterStatus.CANCELLED,
  },
  {
    label: 'entered-in-error',
    value: encounterStatus.ENTEREDINERROR,
  },
  {
    label: 'unknown',
    value: encounterStatus.UNKNOW,
  },
]

/////////////////////// encounter /////////////////////

/////////////////////// immunization /////////////////////

export const immunizationStatus = {
  COMPLETED: 'COMPLETED',
  ENTEREDINERROR: 'entered-in-error',
  NOTDONE: 'not-done',
}

export const immunizationStatusOption = [
  {
    label: 'Completed',
    value: 'completed',
  },
  {
    label: 'Entered in Error',
    value: 'entered-in-error',
  },
  {
    label: 'Not Done',
    value: 'not-done',
  },
]

/////////////////////// immunization /////////////////////

/////////////////////// medicationRequest /////////////////////

export const medicationRequestStatus = {
  ACTIVE: 'active',
  ONHOLD: 'on-hold',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  ENTEREDINERROR: 'entered-in-error',
  STOPPED: 'stopped',
  DRAFT: 'draft',
  UNKNOW: 'unknow',
  NOTDONE: 'not-done',
}

export const medicationRequestStatusOption = [
  {
    label: 'Acitve',
    value: medicationRequestStatus.ACTIVE,
  },
  {
    label: 'On Hold',
    value: medicationRequestStatus.ONHOLD,
  },
  {
    label: 'Cancelled',
    value: medicationRequestStatus.CANCELLED,
  },
  {
    label: 'Completed',
    value: medicationRequestStatus.COMPLETED,
  },
  {
    label: 'Entered in Error',
    value: medicationRequestStatus.ENTEREDINERROR,
  },
  {
    label: 'Stopped',
    value: medicationRequestStatus.STOPPED,
  },
  {
    label: 'Draft',
    value: medicationRequestStatus.DRAFT,
  },
  {
    label: 'Unknown',
    value: medicationRequestStatus.UNKNOW,
  },
]

/////////////////////// medicationRequest /////////////////////

/////////////////////// claim /////////////////////

export const claimStatus = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  ENTEREDINERROR: 'entered-in-error',
  DRAFT: 'draft',
}

export const claimStatusOption = [
  {
    label: 'Active',
    value: claimStatus.ACTIVE,
  },
  {
    label: 'Cancelled',
    value: claimStatus.CANCELLED,
  },
  {
    label: 'Entered in Error',
    value: claimStatus.ENTEREDINERROR,
  },
  {
    label: 'Draft',
    value: claimStatus.DRAFT,
  },
]

/////////////////////// claim /////////////////////

/////////////////////// carePlan /////////////////////

export const carePlanStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ONHOLD: 'on-hold',
  REVOKED: 'revoked',
  COMPLETED: 'completed',
  ENTEREDINERROR: 'entered-in-error',
  UNKNOW: 'unknow',
}

export const carePlanStatusOption = [
  {
    label: 'Draft',
    value: carePlanStatus.DRAFT,
  },
  {
    label: 'Acitve',
    value: carePlanStatus.ACTIVE,
  },
  {
    label: 'On Hold',
    value: carePlanStatus.ONHOLD,
  },
  {
    label: 'Revoked',
    value: carePlanStatus.REVOKED,
  },
  {
    label: 'Completed',
    value: carePlanStatus.COMPLETED,
  },
  {
    label: 'Entered in Error',
    value: carePlanStatus.ENTEREDINERROR,
  },

  {
    label: 'Unknown',
    value: carePlanStatus.UNKNOW,
  },
]

/////////////////////// carePlan /////////////////////
