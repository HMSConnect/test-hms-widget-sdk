const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const utilsService = require('../../services/utils')
const encounterService = require('../../services/encounter')
const diagnosticReportService = require('../../services/diagnostic_report')
const db = mockStorage.getDB()

router.get('/', async (req, res) => {
  try {
    if (db['encounter']) {
      const selector = req.query.filter
        ? encounterService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? encounterService.createOptions(
            req.query,
            utilsService.createOptions(req.query)
          )
        : {}
      const encounterResults = await new Promise((resolve, reject) => {
        db['encounter'].find(selector, options).fetch(resolve, reject)
      })

      let results = []
      if (
        req.query.withOrganization == 'true' ||
        req.query.withDiagnosticReport == 'true' ||
        req.query.withPractitioner == 'true' ||
        req.query.withDiagnosis == 'true'
      ) {
        // query not cast boolean
        for (const encounterResult of encounterResults) {
          if (req.query.withOrganization == 'true') {
            if (encounterResult.serviceProvider.reference) {
              const organizationId = encounterResult.serviceProvider.reference.split(
                '/'
              )[1]
              encounterResult.organization = await createOrganization(
                organizationId
              )
            } else {
              encounterResult.organization = {}
            }
          }

          if (req.query.withDiagnosticReport == 'true') {
            if (encounterResult.id) {
              encounterResult.diagnosticReport = await createDiagnosticReport(
                encounterResult.id
              )
            } else {
              encounterResult.diagnosticReport = {}
            }
          }

          if (req.query.withPractitioner == 'true') {
            if (encounterResult.participant) {
              let practitionerIds = []
              for (let i = 0; i < encounterResult.participant.length; i++) {
                practitionerIds.push(
                  encounterResult.participant[i].individual.reference.split(
                    '/'
                  )[1]
                )
              }
              encounterResult.participant = await createPractitioner(
                practitionerIds,
                encounterResult.participant
              )
            } else {
              encounterResult.participant = []
            }
          }
          if (req.query.withDiagnosis == 'true') {
            if (encounterResult.diagnosis) {
              const procedureIds = []
              const conditionIds = []
              for (let i = 0; i < encounterResult.diagnosis.length; i++) {
                const conditionDomain = encounterResult.diagnosis[
                  i
                ].condition.reference.split('/')
                switch (conditionDomain[0]) {
                  case 'Condition':
                    conditionIds.push(conditionDomain[1])
                    break
                  case 'Procedure':
                    procedureIds.push(conditionDomain[1])
                }
              }
              const encounterResultProcedure = await createProcedure(
                procedureIds,
                encounterResult.diagnosis
              )

              const encounterResultCondition = await createCondition(
                conditionIds,
                encounterResult.diagnosis
              )

              encounterResult.diagnosis =  [...encounterResultProcedure, ...encounterResultCondition]
            } else {
              encounterResult.diagnosis = []
            }
          }

          results.push(encounterResult)
        }
      }

      if (results.length === 0) {
        results = encounterResults
      }

      res.json({
        error: null,
        schema: { ...config.defaultSchema, resourceType: 'encounter' },
        data: results
      })
    } else {
      throw new Error("The domain resource doesn't exist")
    }
  } catch (error) {
    console.error(error)
    res.json({ error: error.message, data: null })
  }
})

router.get('/type', (req, res) => {
  try {
    if (db['encounter']) {
      const selector = req.query.filter
        ? encounterService.createSelector(req.query.filter)
        : {}
      const options = req.query ? encounterService.createOptions(req.query) : {}
      // force limit for find all type
      db['encounter'].find(selector, { ...options, limit: null }).fetch(
        results => {
          res.json({
            error: null,
            schema: { ...config.defaultSchema, resourceType: 'encounter' },
            data: encounterService.parseToTypes(results)
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

async function createOrganization(organizationId) {
  const organization = await new Promise((resolve, reject) => {
    db['organization'].findOne(
      { id: { $regex: organizationId, $options: 'i' } },
      {},
      resolve,
      reject
    )
  })
  return {
    schema: { ...config.defaultSchema, resourceType: 'organization' },
    ...organization
  }
}

async function createPractitioner(practitionerIds, oldData) {
  const practitioners = await new Promise((resolve, reject) => {
    db['practitioner']
      .find({ id: { $in: practitionerIds } }, { limit: null })
      .fetch(resolve, reject)
  })
  const newPractitioner = oldData.map(data => {
    return {
      schema: { ...config.defaultSchema, resourceType: 'practitioner' },
      ...data,
      individual: practitioners.find(practitioner => {
        return practitioner.id === data.individual.reference.split('/')[1]
      })
    }
  })
  return newPractitioner
}
async function createProcedure(procedureIds, oldData) {
  const procedure = await new Promise((resolve, reject) => {
    db['procedure']
      .find({ id: { $in: procedureIds } }, { limit: null })
      .fetch(resolve, reject)
  })
  const newProcedure = oldData.map(data => {
    return {
      schema: { ...config.defaultSchema, resourceType: 'procedure' },
      ...data,
      condition: procedure.find(procedure => {
        return procedure.id === data.condition.reference.split('/')[1]
      })
    }
  })
  return newProcedure
}

async function createCondition(conditionIds, oldData) {
  const condition = await new Promise((resolve, reject) => {
    db['condition']
      .find({ id: { $in: conditionIds } }, { limit: null })
      .fetch(resolve, reject)
  })
  const newCondition = oldData.map(data => {
    return {
      schema: { ...config.defaultSchema, resourceType: 'condition' },
      ...data,
      individual: condition.find(condition => {
        return condition.id === data.individual.reference.split('/')[1]
      })
    }
  })
  return newCondition
}

async function createDiagnosticReport(encounterId) {
  const diagnosticReport = await new Promise((resolve, reject) => {
    db['diagnostic_report'].findOne(
      diagnosticReportService.createSelector({ encounterId }),
      {},
      resolve,
      reject
    )
  })
  return {
    schema: { ...config.defaultSchema, resourceType: 'diagnostic_report' },
    ...diagnosticReport
  }
}

router.get('/:id', async (req, res) => {
  try {
    if (db['encounter']) {
      const encounterResult = await new Promise((resolve, reject) => {
        db['encounter'].findOne({ id: req.params.id }, {}, resolve, reject)
      })

      if (encounterResult.serviceProvider.reference) {
        const organizationId = encounterResult.serviceProvider.reference.split(
          '/'
        )[1]
        encounterResult.organization = await createOrganization(organizationId)
      } else {
        encounterResult.organization = {}
      }

      if (req.query.withDiagnosticReport == 'true') {
        if (encounterResult.id) {
          encounterResult.diagnosticReport = await createDiagnosticReport(
            encounterResult.id
          )
        } else {
          encounterResult.diagnosticReport = {}
        }
      }

      if (encounterResult.participant) {
        let practitionerIds = []
        for (let i = 0; i < encounterResult.participant.length; i++) {
          practitionerIds.push(
            encounterResult.participant[i].individual.reference.split('/')[1]
          )
        }
        encounterResult.participant = await createPractitioner(
          practitionerIds,
          encounterResult.participant
        )
      } else {
        encounterResult.participant = []
      }
      res.json({
        error: null,
        schema: { ...config.defaultSchema, resourceType: 'encounter' },
        data: encounterResult
      })
    } else {
      throw new Error("The domain resource doesn't exist")
    }
  } catch (error) {
    console.error(error)
    res.json({ error: error.message, data: null })
  }
})
// router.get('/resource-list', async (req, res) => {
//   const domainResources = mockStorage
//     .getDomainNameResourceList()
//     .filter(domainResouce => domainResouce !== 'encounter')

//   const encounters = await new Promise((resolve, reject) => {
//     return db['encounter'].find({}).fetch(data => {
//       resolve(data)
//     }, reject)
//   })

//   const encounterIds = [...new Set(encounters.map(it => it.id))].splice(0, 10)

//   const result = {}
//   for (const encounterId of encounterIds) {
//     result[encounterId] = {}
//     for (const domainResouce of domainResources) {
//       const entry = await new Promise((resolve, reject) => {
//         db[domainResouce].findOne(
//           {
//             'context.reference': `Encounter/${encounterId}`
//           },
//           {},
//           resolve
//         )
//       })

//       result[encounterId][domainResouce] = entry ? 1 : 0
//     }

//     result[encounterId].sum = Object.values(result[encounterId]).reduce(
//       (prev, curr) => prev + curr,
//       0
//     )
//   }

//   let maxEncounter = { sum: 0 }

//   for (const key in result) {
//     const encounter = result[key]
//     if (encounter.sum > maxEncounter.sum) {
//       maxEncounter = encounter
//       maxEncounter.id = key
//     }
//   }

//   // id| allergy_intolerance |
//   // 65787ab8-63e4-4927-9a6c-66c51a10c97c

//   res.json({
//     maxEncounter
//   })
// })

// router.get('/:id/resource-list', async (req, res) => {
//   try {
//     const domainResources = mockStorage
//       .getDomainNameResourceList()
//       .filter(domainResouce => domainResouce !== 'encounter')

//     const results = []
//     for (const domainResouce of domainResources) {
//       const entries = await new Promise((resolve, reject) => {
//         let options = {}
//         if (domainResouce === 'care_plan') {
//           options = carePlanService.createOptions(req.query)
//         } else {
//           options = utilsService.createOptions(req.query)
//         }

//         db[domainResouce]
//           .find(
//             { 'context.reference': `Encounter/${req.params.id}` },
//             { ...options, limit: null } //force limit, use createPaginate slice data instead of
//           )
//           .fetch(resolve, reject)
//       })

//       results.push({
//         schema: {
//           ...config.defaultSchema,
//           resourceType: domainResouce,
//           standard: 'SFHIRX'
//         },
//         resourceType: domainResouce,
//         ...utilsService.createPaginate(entries, req.query)
//       })
//     }

//     res.json({
//       error: null,
//       schema: { ...config.defaultSchema, resourceType: 'encounter' },
//       data: results
//     })
//   } catch (error) {
//     console.error(error)
//     res.json({ error: error.message, data: null })
//   }
// })

module.exports = router
