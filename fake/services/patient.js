const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  //give_name , last_name , identification (Passport , MRN, HN)
  const selector = {}
  const andSelector = []

  if (filter.gender && ['male', 'female'].includes(filter.gender)) {
    andSelector.push({ gender: filter.gender })
  }

  if (filter.searchText) {
    const multiSearch = []
    const regExp = { $regex: new RegExp(`.*${filter.searchText}.*`, 'i') }
    multiSearch.push({ 'identifier.value': regExp })
    multiSearch.push({ 'name.family': regExp })
    multiSearch.push({ 'name.given': regExp })
    andSelector.push({
      $or: multiSearch
    })
  }
  if (andSelector.length > 0) {
    selector['$and'] = andSelector
  }
  return selector
}

exports.createOptions = (query, options) => {
  options = { ...utilService.createOptions(query), ...options }
  if (query.sort) {
    const { orderBy, order } = query.sort || {}
    if (orderBy.includes('identifier')) {
      options.sort = [[`__mock_meta.${orderBy}`, order]]
    }
  }
  return options
}

exports.processingPredata = data => {
  const identifier = {}

  for (const id of data.identifier) {
    if (id.type) {
      identifier[id.type.coding[0].code.toLowerCase()] = id.value
    } else {
      const systemWords = id.system.split('/')
      const systemLastWord = systemWords[systemWords.length - 1].toLowerCase()
      identifier[systemLastWord] = id.value
    }
  }
  return {
    ...data,
    __mock_meta: {
      identifier
    }
  }
}
