const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const practitionerService = require('../../services/practitioner')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['practitioner']) {
      const selector = req.query.filter
        ? practitionerService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? practitionerService.createOptions(req.query)
        : {}

      db['practitioner'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'practitioner'
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
