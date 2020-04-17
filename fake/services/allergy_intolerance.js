const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.patientId) {
    andSelector.push({ 'patient.reference': `Patient/${filter.patientId}` })
  }

  if (filter.encounterId) {
    andSelector.push({ 'context.reference': `Encounter/${filter.encounterId}` })
  }
  if (filter.type) {
    andSelector.push({ type: `${filter.type}` })
  }
  if (filter.criticality) {
    andSelector.push({ criticality: `${filter.criticality}` })
  }

  if (filter.codeText) {
    const regExp = {
      $regex: new RegExp(`.*${filter.codeText}.*`, 'i')
    }
    andSelector.push({
      'code.coding.display': regExp
    })
  }
  if (filter.category) {
    const regExp = {
      $regex: new RegExp(`.*${filter.category}.*`, 'i')
    }
    andSelector.push({
      category: regExp
    })
  }

  if (filter.assertedDate_lt) {
    //minimongo can't upsert date, so I filter by ISOString date.
    andSelector.push({
      '__mock_meta.assertedDate': {
        $lt: filter.assertedDate_lt
      }
    })
  }

  if (andSelector.length > 0) {
    selector['$and'] = andSelector
  }
  return selector
}

exports.createOptions = (query, options = {}) => {
  options = { ...utilService.createOptions(query), ...options }
  const { orderBy, order } = query.sort || {}
  options.limit = query.max ? Number(query.max) : 10
  options.sort = [[orderBy || `__mock_meta.assertedDate`, order || 'desc']]
  return options
}

exports.processingPredata = data => {
  const __mock_meta = {}
  if (data.assertedDate) {
    const assertedDate = moment(data.assertedDate).toDate()
    __mock_meta.assertedDate = assertedDate
  }
  return {
    ...data,
    __mock_meta
  }
}
