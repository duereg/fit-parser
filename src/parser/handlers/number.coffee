int = require './int'

module.exports =
  canHandle: (token, currentSet) ->
    !currentSet.current().distance and int.isNumber token

  act: (tokens, token, currentSet) ->
    currentSet.setDistance parseInt(token, 10)
