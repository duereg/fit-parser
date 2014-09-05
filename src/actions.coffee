_ = require("underscore")

actions =
  sum: (collection, field) ->
    total = 0
    _.each collection, (item) ->
      if _.isFunction(item[field])
        total = total + item[field]()
      else
        total = total + item[field]
      return
    total

  set: (collection, amount, field, value) ->
    i = collection.length - amount
    len = collection.length

    while i < len
      item = collection[i]
      if _.isFunction(item[field])
        item[field] value
      else
        item[field] = value
      i++
    return

module.exports = actions
