const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const carePlanService = require('../../services/care_plan')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['care_plan']) {
      const selector = req.query.filter
        ? carePlanService.createSelector(req.query.filter)
        : {}
      const options = req.query ? carePlanService.createOptions(req.query) : {}

      db['care_plan'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'care_plan'
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

router.get('/category', (req, res) => {
  try {
    if (db['care_plan']) {
      const selector = req.query.filter
        ? carePlanService.createSelector(req.query.filter)
        : {}
      const options = req.query ? carePlanService.createOptions(req.query) : {}
      
      // force limit for find all type
      db['care_plan'].find(selector, { ...options, limit: null }).fetch(
        results => {
          res.json({
            error: null,
            schema: { ...config.defaultSchema, resourceType: 'care_plan' },
            data: carePlanService.parseToCategories(results)
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
