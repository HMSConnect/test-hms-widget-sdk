const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.patientId) {
    andSelector.push({ 'subject.reference': `Patient/${filter.patientId}` })
  }

  if (filter.code) {
    const regExp = { $regex: new RegExp(`.*${filter.code}.*`, 'i') }
    andSelector.push({ 'code.coding.code': regExp })
  }
  if (filter.codeText) {
    const regExp = { $regex: new RegExp(`.*${filter.codeText}.*`, 'i') }
    andSelector.push({ 'code.text': regExp })
  }

  if (filter.periodStart_lt) {
    //minimongo can't upsert date, so I filter by ISOString date.
    andSelector.push({
      '__mock_meta.performedPeriod.start': {
        $lt: filter.periodStart_lt
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
  options.sort = [
    [orderBy || `__mock_meta.performedPeriod.start`, order || 'desc']
  ]
  return options
}

exports.processingPredata = data => {
  const __mock_meta = {}
  if (data.performedPeriod) {
    const performedPeriodStart = moment(data.performedPeriod.start).toDate()
    __mock_meta.performedPeriod = { start: performedPeriodStart }
  }
  return {
    ...data,
    __mock_meta
  }
}
