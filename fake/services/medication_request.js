const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.patientId) {
    andSelector.push({ 'subject.reference': `Patient/${filter.patientId}` })
  }

  if (filter.status) {
    andSelector.push({ status: `${filter.status}` })
  }

  if (filter.medicationCodeableConcept) {
    const regExp = {
      $regex: new RegExp(`.*${filter.medicationCodeableConcept}.*`, 'i')
    }
    andSelector.push({
      'medicationCodeableConcept.coding.display': regExp
    })
  }
  if (filter.encounterId) {
    andSelector.push({ 'context.reference': `Encounter/${filter.encounterId}` })
  }

  if (filter.authoredOn_lt) {
    //minimongo can't upsert date, so I filter by ISOString date.
    andSelector.push({
      '__mock_meta.authoredOn': {
        $lt: filter.authoredOn_lt
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
  options.sort = [[orderBy || `__mock_meta.authoredOn`, order || 'desc']]
  return options
}

exports.processingPredata = data => {
  const __mock_meta = {}
  if (data.authoredOn) {
    const authoredOn = moment(data.authoredOn).toDate()
    __mock_meta.authoredOn = authoredOn
  }
  return {
    ...data,
    __mock_meta
  }
}
