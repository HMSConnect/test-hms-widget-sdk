const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.uid) {
    andSelector.push({ uid: uid })
  }

  if (filter.patientId) {
    andSelector.push({ 'patient.reference': `Patient/${filter.patientId}` })
  }

  if (filter.encounterId) {
    andSelector.push({ 'context.reference': `Encounter/${filter.encounterId}` })
  }

  if (filter.started_lt) {
    //minimongo can't upsert date ? so we filter by ISO string date.
    andSelector.push({
      '__mock_meta.started': {
        $lt: filter.started_lt
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
  options.sort = [[orderBy || `__mock_meta.started`, order || 'desc']]
  return options
}

exports.processingPredata = data => {
  const __mock_meta = {}

  if (data.started) {
    const started = moment(data.started).toDate()
    __mock_meta.started = started
  }

  return {
    ...data,
    __mock_meta
  }
}
