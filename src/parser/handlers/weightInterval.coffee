WeightSet = require '../../weightSet'

module.exports =
  canHandle: (token, currentSet) ->
    token is '-' and currentSet instanceof WeightSet

  act: (tokens, token, currentSet) ->
    #weight token handler
    if tokens.length is 5
      currentSet.current().weight = parseFloat tokens[0]
      currentSet.current().reps = parseInt tokens[3], 10
    if tokens.length is 2
      currentSet.current().reps = parseInt tokens[0], 10

    tokens.length = 0 #empty tokens - we're done
