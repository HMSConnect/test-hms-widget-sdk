const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const immunizationService = require('../../services/immunization')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['immunization']) {
      const selector = req.query.filter
        ? immunizationService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? immunizationService.createOptions(req.query)
        : {}

      db['immunization'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'immunization'
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

router.get('/type', (req, res) => {
  try {
    if (db['immunization']) {
      const selector = req.query.filter
        ? immunizationService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? immunizationService.createOptions(req.query)
        : {}
      // force limit for find all type
      db['immunization'].find(selector, { ...options, limit: null }).fetch(
        results => {
          res.json({
            error: null,
            schema: { ...config.defaultSchema, resourceType: 'immunization' },
            data: immunizationService.parseToTypes(results)
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
