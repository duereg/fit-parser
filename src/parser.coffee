set = require("./set.js")
workout = require("./workout.js")
integer = require("./int.js")
tokenActions = require("./tokens.js")
_ = require("underscore")
require "./string.js"

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

processTokens = (tokens, work) ->
  numStartTokens = tokens.length
  currentSet = work.current()
  currentSet.addInterval()

  while tokens.length > 0
    token = tokens.shift()
    if token.isEmpty()
      #do nothing - this is the emptyTokenHandler
      continue
    else if integer.isNumber(token)
      #numberTokenHandler
      currentSet.setDistance parseInt(token)
    else if tokenActions.isSetDivider(token)
      #set divider token handler
      currentSet.changeToMulti()
    else if tokenActions.isSet(token)
      #set token handler
      newTokens = token.split(tokenActions.setDividerRegex)
      throw new Error("Currently not supported")  if newTokens.length isnt 2
      tokens.unshift newTokens.pop()
      tokens.unshift "x"
      tokens.unshift newTokens.pop()
    else if tokenActions.isTimeDivider(token)
      #time divider token handler
      continue
    else if tokenActions.isTime(token)
      #time token handler
      currentSet.setTime tokenActions.parseTime(token)
    else
      #string token handler
      if numStartTokens is 1
        currentSet.intervals.pop() #Delete created interval - not needed
        if currentSet.name.isEmpty()
          currentSet.name = token
        else
          currentSet = work.addSet(token)
      else
        currentSet.setType token

  #line is done - now what?
  currentSet.reset()
  return

parser = (stringToParse) ->
  throw new Error("You must provide a valid string to parse to continue.")  if stringToParse is `undefined`
  return stringToParse  if stringToParse is null
  lines = stringToParse.split("\n")
  workToMake = new workout()
  parseLine lines, workToMake
  workToMake

module.exports = parser
