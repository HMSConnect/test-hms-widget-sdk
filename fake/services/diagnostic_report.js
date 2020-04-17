const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.id) {
    andSelector.push({ id: `${filter.id}` })
  }

  if (filter.patientId) {
    andSelector.push({ 'subject.reference': `Patient/${filter.patientId}` })
  }

  if (filter.encounterId) {
    andSelector.push({ 'context.reference': `Encounter/${filter.encounterId}` })
  }

  if (filter.issued_lt) {
    //minimongo can't upsert date, so I filter by ISOString date.
    andSelector.push({
      '__mock_meta.issued': {
        $lt: filter.issued_lt
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

  if (query._lasted) {
    options.limit = 1
  }
  options.sort = [[orderBy || '__mock_meta.issued', order || 'desc']]
  return options
}

exports.processingPredata = data => {
  const __mock_meta = {}

  if (data.issued) {
    const issued = moment(data.issued).toDate()
    __mock_meta.issued = issued
  }

  return {
    ...data,
    __mock_meta
  }
}
