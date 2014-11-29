tokenActions = require './tokens'

module.exports =
  canHandle: (token) ->
    tokenActions.isTime token

  act: (tokens, token, currentSet) ->
    currentSet.setTime tokenActions.getDuration token
