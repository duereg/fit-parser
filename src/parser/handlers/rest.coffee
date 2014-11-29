moment = require 'moment'
tokenActions = require '../tokens'

module.exports =
  canHandle: (token) ->
    tokenActions.isRest token

  act: (tokens, token, currentSet) ->
    rest = tokenActions.getRest token
    currentSet.setRest moment.duration("00:#{rest}")
