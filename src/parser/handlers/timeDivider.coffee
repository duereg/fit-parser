tokenActions = require './tokens'

module.exports =
  canHandle: (token) ->
    token is '@'

  act: (tokens, token, currentSet) ->
    #do nothing
