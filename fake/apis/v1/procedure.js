const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const procedure = require('../../services/procedure')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['procedure']) {
      const selector = req.query.filter
        ? procedure.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? procedure.createOptions(req.query)
        : {}

      db['procedure'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'procedure'
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
