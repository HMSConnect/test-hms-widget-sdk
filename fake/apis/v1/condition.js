const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const conditionService = require('../../services/condition')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['condition']) {
      const selector = req.query.filter
        ? conditionService.createSelector(req.query.filter)
        : {}
      const options = req.query ? conditionService.createOptions(req.query) : {}

      db['condition'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'condition'
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
