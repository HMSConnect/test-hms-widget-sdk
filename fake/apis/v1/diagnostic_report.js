const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const diagnosticReportService = require('../../services/diagnostic_report')
const utilService = require('../../services/utils')
const db = mockStorage.getDB()
/**
|--------------------------------------------------
| query : orderBy, order, offset, max, _lasted, withObservation, 
| query.filter : { patientId, encounterId }
|--------------------------------------------------
*/
router.get('/', async (req, res) => {
  try {
    const schema = {
      ...config.defaultSchema,
      resourceType: 'diagnostic_report'
    }

    if (db['diagnostic_report']) {
      const selector = diagnosticReportService.createSelector(req.query.filter)
      const options = diagnosticReportService.createOptions(req.query)

      const diagnosticReports = await new Promise((resolve, reject) => {
        db['diagnostic_report'].find(selector, options).fetch(resolve, reject)
      })

      if (req.query.withObservation == 'true') {
        // query not cast boolean
        for (const diagnosticReport of diagnosticReports) {
          diagnosticReport.result = await createObservationByDianosticReportResult(
            diagnosticReport.result
          )
        }
      }

      if (req.query._lasted) {
        res.json({
          error: null,
          schema,
          data: diagnosticReports[0]
        })
      } else {
        res.json({
          error: null,

          schema,
          ...utilService.createPaginate(diagnosticReports, req.query)
        })
      }
    } else {
      throw new Error("The domain resource doesn't exist")
    }
  } catch (error) {
    console.error(error)
    res.json({ error: error.message, data: null })
  }
})

async function createObservationByDianosticReportResult(results) {
  const _results = []
  for (const result of results) {
    const observation = await createObservation(result.reference.split('/')[1])
    _results.push({
      schema: { ...config.defaultSchema, resourceType: 'observation' },
      ...result,
      ...observation
    })
  }
  return _results
}

async function createObservation(observationId) {
  const observation = await new Promise((resolve, reject) => {
    db['observation'].findOne(
      { id: { $regex: observationId, $options: 'i' } },
      {},
      resolve,
      reject
    )
  })
  return observation
}

module.exports = router
