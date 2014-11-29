moment = require 'moment'
tokenActions = require '../tokens'

module.exports =
  canHandle: (token) ->
    tokenActions.isTime token

  act: (tokens, token, currentSet) ->
    currentSet.setTime moment.duration("00:#{token}")
