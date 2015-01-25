Workout = require '../../workout'
WeightSet = require '../../weightSet'

module.exports =
  canHandle: (token) ->
    token is '**'

  act: (tokens, token, currentSet, workout) ->
    #weight token handler
    tokens.unshift(token) #add token back to tokens
    name = tokens.join(' ') #generate name from all strings
    tokens.length = 0 #empty tokens - we're done

    unless workout.current() instanceof WeightSet
      workout.sets.pop() #remove created set
    else
      workout.current().intervals.pop()

    currentSet = workout.addSet(name) #recreate as correct type
