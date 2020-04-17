const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const claimService = require('../../services/claim')
const db = mockStorage.getDB()

router.get('/', async (req, res) => {
  try {
    if (db['claim']) {
      const selector = req.query.filter
        ? claimService.createSelector(req.query.filter)
        : {}
      const options = req.query ? claimService.createOptions(req.query) : {}
      const claimResults = await new Promise((resolve, reject) => {
        db['claim'].find(selector, options).fetch(resolve, reject)
      })
      let results = []
      for (const claimResult of claimResults) {
        if (req.query.withOrganization == 'true') {
          if (claimResult.organization.reference) {
            const organizationId = claimResult.organization.reference.split(
              '/'
            )[1]
            claimResult.organization = await createOrganization(organizationId)
          } else {
            claimResult.organization = {}
          }
        }
        results.push(claimResult)
      }
      if (results.length === 0) {
        results = claimResults
      }
      res.json({
        error: null,
        schema: {
          ...config.defaultSchema,
          resourceType: 'claim'
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

async function createOrganization(organizationId) {
  const organization = await new Promise((resolve, reject) => {
    db['organization'].findOne(
      { id: { $regex: organizationId, $options: 'i' } },
      {},
      resolve,
      reject
    )
  })
  return {
    schema: { ...config.defaultSchema, resourceType: 'organization' },
    ...organization
  }
}

module.exports = router
