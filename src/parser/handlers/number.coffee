int = require './int'

module.exports =
  canHandle: (token) ->
    int.isNumber token

  act: (tokens, token, currentSet) ->
    currentSet.setDistance parseInt(token, 10)
