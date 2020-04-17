const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.patientId) {
    andSelector.push({ 'subject.reference': `Patient/${filter.patientId}` })
  }
  if (filter.clinicalStatus) {
    andSelector.push({ clinicalStatus: `${filter.clinicalStatus}` })
  }
  if (filter.verificationStatus) {
    andSelector.push({ verificationStatus: `${filter.verificationStatus}` })
  }

  if (filter.codeText) {
    const regExp = {
      $regex: new RegExp(`.*${filter.codeText}.*`, 'i')
    }
    andSelector.push({
      'code.coding.display': regExp
    })
  }

  if (filter.onsetDateTime_lt) {
    //minimongo can't upsert date ? so we filter by ISO string date.
    andSelector.push({
      '__mock_meta.onsetDateTime': {
        $lt: filter.onsetDateTime_lt
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
  options.sort = [[orderBy || `__mock_meta.onsetDateTime`, order || 'desc']]
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
