const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const organizationService = require('../../services/organization')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['organization']) {
      const selector = req.query.filter
        ? organizationService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? organizationService.createOptions(req.query)
        : {}

      db['organization'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'organization'
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
