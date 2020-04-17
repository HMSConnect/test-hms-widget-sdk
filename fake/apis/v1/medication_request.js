const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const medicationRequestService = require('../../services/medication_request')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['medication_request']) {
      const selector = req.query.filter
        ? medicationRequestService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? medicationRequestService.createOptions(req.query)
        : {}

      db['medication_request'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'medication_request'
            },
            data: results
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

module.exports = router
