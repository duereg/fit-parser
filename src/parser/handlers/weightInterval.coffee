WeightSet = require '../../weightSet'
Interval = require '../../interval'
timeFormatter = require '../../timeFormatter'

convertToTimedInterval = (currentSet, time, distance) ->
  currentSet.intervals.pop()
  currentSet.intervals.push new Interval {time, distance}

module.exports =
  canHandle: (token, currentSet) ->
    token is '-' and currentSet instanceof WeightSet

  act: (tokens, token, currentSet) ->
    #weight token handler
    if tokens.length is 5
      currentSet.current().weight = parseFloat tokens[0]
      currentSet.current().reps = parseInt tokens[3], 10
    if tokens.length is 4
      convertToTimedInterval currentSet, timeFormatter.toDuration(tokens[3]), parseFloat tokens[0]
    if tokens.length is 2
      currentSet.current().reps = parseInt tokens[0], 10
    if tokens.length is 1
      convertToTimedInterval currentSet, timeFormatter.toDuration(tokens[0])

    tokens.length = 0 #empty tokens - we're done
