const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const utilsService = require('../../services/utils')
const patientService = require('../../services/patient')
const encounterService = require('../../services/encounter')
const carePlanService = require('../../services/care_plan')
const conditionService = require('../../services/condition')
const immunizationService = require('../../services/immunization')
const allergyIntoleranceService = require('../../services/allergy_intolerance')
const procedureService = require('../../services/procedure')
const medicationRequestService = require('../../services/medication_request')
const observationService = require('../../services/observation')
const claimService = require('../../services/claim')
const imagingStudyService = require('../../services/imaging_study')
const practitionerStudyService = require('../../services/practitioner')

const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['patient']) {
      const selector = req.query.filter
        ? patientService.createSelector(req.query.filter)
        : {}
      const options = req.query ? patientService.createOptions(req.query) : {}

      db['patient'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: { ...config.defaultSchema, resourceType: 'patient' },
            ...utilsService.createPaginate(results, req.query)
          })
        },
        error => {
          throw error
        }
      )
    } else {
      throw new Error("The domain resource doesn't exist")
    }
  } catch (error) {
    console.error(error)
    res.json({ error: error.message, data: null })
  }
})

router.get('/:id/resource-list', async (req, res) => {
  try {
    let domainResources
    if (req.query.filter && req.query.filter.domainResouce) {
      const domainResourcesArray = req.query.filter.domainResouce.split(',')
      domainResourcesArray.forEach(resourceName => {
        domainResources = mockStorage
          .getDomainNameResourceList()
          .filter(domainResouce => domainResouce === resourceName)
      })
    } else {
      domainResources = mockStorage
        .getDomainNameResourceList()
        .filter(domainResouce => domainResouce !== 'patient')
    }

    // const domainResources = mockStorage
    // .getDomainNameResourceList()
    // .filter(domainResouce => domainResouce !== 'patient')

    const results = []
    for (const domainResouce of domainResources) {
      const result = await queryResource(domainResouce, {
        query: req.query,
        params: req.params
      })
      results.push(result)
    }

    res.json({
      error: null,
      schema: { ...config.defaultSchema, resourceType: 'patient' },
      data: results
    })
  } catch (error) {
    console.error(error)
    res.json({ error: error.message, data: null })
  }
})

async function queryResource(domainResource, option) {
  const entries = await new Promise((resolve, reject) => {
    let options = {}
    if (domainResource === 'encounter') {
      options = encounterService.createOptions(option.query)
    } else if (domainResource === 'care_plan') {
      options = carePlanService.createOptions(option.query)
    } else if (domainResource === 'condition') {
      options = conditionService.createOptions(option.query)
    } else if (domainResource === 'immunization') {
      options = immunizationService.createOptions(option.query)
    } else if (domainResource === 'allergy_intolerance') {
      options = allergyIntoleranceService.createOptions(option.query)
    } else if (domainResource === 'procedure') {
      options = procedureService.createOptions(option.query)
    } else if (domainResource === 'medication_request') {
      options = medicationRequestService.createOptions(option.query)
    } else if (domainResource === 'observation') {
      options = observationService.createOptions(option.query)
    } else if (domainResource === 'claim') {
      options = claimService.createOptions(option.query)
    } else if (domainResource === 'imaging_study') {
      options = imagingStudyService.createOptions(option.query)
    } else if (domainResource === 'practitioner') {
      options = practitionerStudyService.createOptions(option.query)
    } else {
      options = utilsService.createOptions(option.query)
    }

    db[domainResource]
      .find(
        {
          $or: [
            { 'subject.reference': `Patient/${option.params.id}` },
            { 'patient.reference': `Patient/${option.params.id}` }
          ]
        },
        { ...options, limit: null } //force limit, use createPaginate slice data instead of
      )
      .fetch(resolve, reject)
  })

  const { totalCount } = utilsService.createPaginate(entries, option.query)

  return {
    schema: { ...config.defaultSchema, resourceType: domainResource },
    resourceType: domainResource,
    totalCount
  }
}

module.exports = router
