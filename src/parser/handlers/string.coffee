module.exports =
  canHandle: (token) ->
    true

  act: (tokens, token, currentSet, workout) ->
    #string token handler
    if currentSet.current().isEmpty()
      currentSet.intervals.pop() #Delete created interval - not needed
      tokens.unshift(token) #add token back to tokens
      name = tokens.join(' ') #generate name from all strings
      tokens.length = 0 #empty tokens - we're done

      if currentSet.name.isEmpty()
        currentSet.name = name
      else
        currentSet = workout.addSet(name)
    else
      currentSet.setType token
