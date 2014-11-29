integer = require '../int'

module.exports =
  canHandle: (token) ->
    integer.isNumber token

  act: (tokens, token, currentSet) ->
    currentSet.setDistance parseInt(token, 10)
