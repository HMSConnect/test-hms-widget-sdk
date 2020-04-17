const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []
  if (filter.id) {
    const regExp = { $regex: new RegExp(`.*${filter.id}.*`, 'i') }
    andSelector.push({ id: regExp })
  }
  if (filter.patientId) {
    andSelector.push({ 'subject.reference': `Patient/${filter.patientId}` })
  }
  if (filter.status) {
    andSelector.push({ status: `${filter.status}` })
  }

  if (filter.periodStart_lt) {
    //minimongo can't upsert date, so I filter by ISOString date.
    andSelector.push({
      '__mock_meta.period.start': {
        $lt: filter.periodStart_lt
      }
    })
  }

  if (filter.type) {
    andSelector.push({ 'type.text': filter.type })
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
  options.sort = [[orderBy || `__mock_meta.period.start`, order || 'desc']]
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

exports.parseToTypes = (encounters = []) => {
  const groupEncounterByType = {}
  for (const encounter of encounters) {
    const type = encounter.type[0].text
    if (!groupEncounterByType[type]) {
      groupEncounterByType[type] = {
        type: type,
        totalCount: 0
      }
    }
    groupEncounterByType[type].totalCount += 1
  }
  return Object.values(groupEncounterByType)
}
