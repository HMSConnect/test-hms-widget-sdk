const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const imagingStudyService = require('../../services/imaging_study')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['imaging_study']) {
      const selector = req.query.filter
        ? imagingStudyService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? imagingStudyService.createOptions(req.query)
        : {}

      db['imaging_study'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'imaging_study'
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
