exports.createPaginate = (results, paginationOption) => {
  const offset = paginationOption.offset ? Number(paginationOption.offset) : 0
  const max = paginationOption.max ? Number(paginationOption.max) : 10

  return {
    data: results.slice(offset, offset + max),
    totalCount: results.length
  }
}

exports.getRandomIntInclusive = (min, max, type) => {
  if (type === 'int') {
    min = Math.ceil(min)
    max = Math.floor(max)
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Give a sort spec, which can be in any of these forms:
//   {"key1": 1, "key2": -1}
//   [["key1", "asc"], ["key2", "desc"]]
//   ["key1", ["key2", "desc"]]
exports.createOptions = query => {
  query = query || {}
  const options = { fields: { __mock_meta: 0 } }
  const { orderBy, order } = query.sort || {}
  options.sort = [[orderBy || 'id', order || 'desc']]
  return options
}
