tokenActions = require './tokens'
timeFormatter = require '../../timeFormatter'

module.exports =
  canHandle: (token) ->
    tokenActions.isTime token

  act: (tokens, token, currentSet) ->
    currentSet.setTime timeFormatter.toDuration token
