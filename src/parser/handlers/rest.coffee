tokenActions = require './tokens'
timeFormatter = require '../../timeFormatter'

module.exports =
  canHandle: (token) ->
    tokenActions.isRest token

  act: (tokens, token, currentSet) ->
    rest = tokenActions.getRest token
    currentSet.setRest timeFormatter.toDuration rest
