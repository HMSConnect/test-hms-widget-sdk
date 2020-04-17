const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.patientId) {
    andSelector.push({ 'patient.reference': `Patient/${filter.patientId}` })
  }

  if (filter.status) {
    andSelector.push({ status: `${filter.status}` })
  }

  if (filter.date_lt) {
    //minimongo can't upsert date ? so we filter by ISO string date.
    andSelector.push({
      '__mock_meta.date': {
        $lt: filter.date_lt
      }
    })
  }

  if (filter.vaccineCode) {
    andSelector.push({ 'vaccineCode.text': filter.vaccineCode })
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
  options.sort = [[orderBy || `__mock_meta.date`, order || 'desc']]
  return options
}

exports.processingPredata = data => {
  const __mock_meta = {}

  if (data.date) {
    const date = moment(data.date).toDate()
    __mock_meta.date = date
  }
  return {
    ...data,
    __mock_meta
  }
}

exports.parseToTypes = (immunizations = []) => {
  const groupImmunizationByType = {}
  for (const immunization of immunizations) {
    const type = immunization.vaccineCode.text
    if (!groupImmunizationByType[type]) {
      groupImmunizationByType[type] = {
        type: type,
        totalCount: 0
      }
    }
    groupImmunizationByType[type].totalCount += 1
  }
  return Object.values(groupImmunizationByType)
}
