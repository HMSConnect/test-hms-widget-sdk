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
  if (filter.category) {
    // const regExp = {
    //   $regex: new RegExp(`.*${filter.category}.*`, 'i')
    // }
    andSelector.push({ 'category.text': filter.category })
  }

  if (filter.periodStart_lt) {
    //minimongo can't upsert date ? so we filter by ISO string date.
    andSelector.push({
      '__mock_meta.period.start': {
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

exports.parseToCategories = (carePlans = []) => {
  const groupByCategory = {}
  for (const carePlan of carePlans) {
    const category = carePlan.category[0].coding[0].display
    if (!groupByCategory[category]) {
      groupByCategory[category] = {
        type: category, // TODO: rename type to category
        totalCount: 0
      }
    }
    groupByCategory[category].totalCount += 1
  }
  return Object.values(groupByCategory)
}
