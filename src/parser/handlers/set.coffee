tokenActions = require './tokens'

module.exports =
  canHandle: (token) ->
    tokenActions.isSet token

  act: (tokens, token, currentSet) ->
    newTokens = token.split(tokenActions.setDividerRegex)
    throw new Error('Currently not supported')  if newTokens.length isnt 2
    tokens.unshift newTokens.pop()
    tokens.unshift 'x'
    tokens.unshift newTokens.pop()
