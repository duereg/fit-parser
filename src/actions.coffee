_ = require("underscore")

actions =
  sum: (collection, field) ->
    total = 0
    _.each collection, (item) ->
      if _.isFunction(item[field])
        total = total + item[field]()
      else if _.isString(item[field])
        total = item[field]
      else
        total = total + item[field]
      return
    total

  set: (collection, field, value) ->
    for item in collection
      if _.isFunction(item[field])
        item[field] value
      else
        item[field] = value
    return

module.exports = actions
