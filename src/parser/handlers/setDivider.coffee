tokenActions = require '../tokens'

module.exports =
  canHandle: (token) ->
    tokenActions.isSetDivider token

  act: (tokens, token, currentSet) ->
    currentSet.changeToMulti()
