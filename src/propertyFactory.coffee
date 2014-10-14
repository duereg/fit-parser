actions = require('./actions')

module.exports = (target, intervals, key) ->
  Object.defineProperty target, key,
    enumerable: true
    set: (value) ->
      actions.set(intervals, key, value)
    get: ->
      return actions.sum(intervals, key)
