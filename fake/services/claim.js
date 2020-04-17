const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.patientId) {
    andSelector.push({ 'patient.reference': `Patient/${filter.patientId}` })
  }

  if (filter.organizationId) {
    andSelector.push({
      'organization.reference': `Organization/${filter.organizationId}`
    })
  }

  if (filter.status) {
    andSelector.push({ status: `${filter.status}` })
  }

  if (filter.billablePeriodStart_lt) {
    andSelector.push({
      '__mock_meta.billablePeriod.start': {
        $lt: filter.billablePeriodStart_lt
      }
    })
  }

  if (filter.billablePeriodStart_gt) {
    andSelector.push({
      '__mock_meta.billablePeriod.start': {
        $gt: filter.billablePeriodStart_gt
      }
    })
  }

  if (filter.billablePeriodEnd_lt) {
    andSelector.push({
      '__mock_meta.billablePeriod.end': {
        $lt: filter.billablePeriodEnd_lt
      }
    })
  }

  if (filter.billablePeriodEnd_gt) {
    andSelector.push({
      '__mock_meta.billablePeriod.end': {
        $gt: filter.billablePeriodEnd_gt
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
    [orderBy || `__mock_meta.billablePeriod.start`, order || 'desc']
  ]
  return options
}

exports.processingPredata = data => {
  const __mock_meta = {}

  if (data.billablePeriod) {
    const billablePeriodStart = moment(data.billablePeriod.start).toDate()
    const billablePeriodEnd = moment(data.billablePeriod.end).toDate()
    __mock_meta.billablePeriod = {
      start: billablePeriodStart,
      end: billablePeriodEnd
    }
  }

  return {
    ...data,
    __mock_meta
  }
}
