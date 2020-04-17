const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.name) {
    const regExp = { $regex: new RegExp(`.*${filter.name}.*`, 'i') }
    andSelector.push({ name: regExp })
  }

  if (filter.code) {
    andSelector.push({ 'type.coding.code': filter.code })
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
  //   options.sort = [[orderBy || `__mock_meta.period.start`, order || 'desc']]
  return options
}

exports.processingPredata = data => {
  const __mock_meta = {}

  if (data.period) {
    const periodStart = moment(data.period.start).toDate()
    __mock_meta.period = { start: periodStart }
  }

  return {
    ...data,
    __mock_meta
  }
}
