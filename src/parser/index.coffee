moment = require 'moment'
_ = require 'underscore'

workout = require '../workout'
tokenActions = require './tokens'
require './string'

#NUM_INTERVALS X DISTANCE TYPE @ TIME
parseLine = (lines, work) ->

  while lines.length > 0
    line = lines.shift().trim()
    tokens = line.split(/[ \t]/)
    notAllEmpty = not _.all(tokens, (item) ->
      item.isEmpty()
    )
    processTokens tokens, work  if notAllEmpty
  return

#TODO: Break into chain of responsibility
processTokens = (tokens, work) ->
  numStartTokens = tokens.length
  currentSet = work.current()
  currentSet.addInterval()

  while tokens.length > 0
    token = tokens.shift()
    if token.isEmpty()
      #do nothing - this is the emptyTokenHandler
      continue
    else if tokenActions.isNumber(token)
      #numberTokenHandler
      currentSet.setDistance tokenActions.getNumber(token)
    else if tokenActions.isSetDivider(token)
      #set divider token handler
      currentSet.changeToMulti()
    else if tokenActions.isSet(token)
      #set token handler
      newTokens = token.split(tokenActions.setDividerRegex)
      throw new Error('Currently not supported')  if newTokens.length isnt 2
      tokens.unshift newTokens.pop()
      tokens.unshift 'x'
      tokens.unshift newTokens.pop()
    else if tokenActions.isTimeDivider(token)
      #time divider token handler
      continue
    else if tokenActions.isTime(token)
      #time token handler
      currentSet.setTime moment.duration("00:#{token}")
    else if tokenActions.isRest(token)
      rest = tokenActions.getRest(token)
      currentSet.setRest moment.duration("00:#{rest}")
    else
      #string token handler
      if currentSet.current().isEmpty()
        currentSet.intervals.pop() #Delete created interval - not needed
        tokens.unshift(token) #add token back to tokens
        name = tokens.join(' ') #generate name from all strings
        tokens.length = 0 #empty tokens - we're done

        if currentSet.name.isEmpty()
          currentSet.name = name
        else
          currentSet = work.addSet(name)
      else
        currentSet.setType token

parser = (stringToParse) ->
  throw new Error('You must provide a valid string to parse to continue.') unless stringToParse?
  lines = stringToParse.split('\n')
  workToMake = new workout()
  parseLine lines, workToMake
  workToMake

module.exports = parser
