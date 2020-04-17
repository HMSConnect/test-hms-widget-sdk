const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const utilService = require('../../services/utils')
const observationService = require('../../services/observation')
const db = mockStorage.getDB()

router.get('/', async (req, res) => {
  try {
    if (db['observation']) {
      const selector = req.query.filter
        ? observationService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? observationService.createOptions(req.query)
        : {}

      let results = await new Promise((resolve, reject) => {
        db['observation'].find(selector, options).fetch(resolve, reject)
      })

      // specific case
      if (
        req.query &&
        req.query.filter &&
        req.query._lasted === 'true' &&
        req.query.filter.codes
      ) {
        results = observationService.mappingLastIssueByCodes(
          results,
          req.query.filter.codes
        )
      }

      res.json({
        error: null,
        schema: {
          ...config.defaultSchema,
          resourceType: 'observation'
        },
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

router.get('/category', (req, res) => {
  try {
    if (db['observation']) {
      const selector = req.query.filter
        ? observationService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? observationService.createOptions(req.query)
        : {}
      // force limit for find all type
      db['observation'].find(selector, { ...options, limit: null }).fetch(
        results => {
          res.json({
            error: null,
            schema: { ...config.defaultSchema, resourceType: 'observation' },
            data: observationService.parseToCategories(results)
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

router.get('/code', (req, res) => {
  try {
    if (db['observation']) {
      const selector = req.query.filter
        ? observationService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? observationService.createOptions(req.query)
        : {}
      // force limit for find all type
      db['observation'].find(selector, { ...options, limit: null }).fetch(
        results => {
          res.json({
            error: null,
            schema: { ...config.defaultSchema, resourceType: 'observation' },
            data: observationService.parseToCodes(results)
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
