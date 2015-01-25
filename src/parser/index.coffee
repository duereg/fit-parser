moment = require 'moment'
_ = require 'underscore'

require './string'
Workout = require '../workout'
handlers = require './handlers'

#NUM_INTERVALS X DISTANCE TYPE @ TIME
parseLine = (lines, work) ->

  while lines.length > 0
    line = lines.shift().trim()
    tokens = line.split(/[ \t]/)

    notAllEmpty = not _.all tokens, (item) -> item.isEmpty()

    processTokens tokens, work if notAllEmpty
  return

processTokens = (tokens, work) ->
  numStartTokens = tokens.length
  currentSet = work.current()
  currentSet.add()

  while tokens.length > 0
    token = tokens.shift()

    for handler in handlers
      if handler.canHandle(token, currentSet)
        handler.act(tokens, token, currentSet, work)
        break

parser = (stringToParse) ->
  throw new Error('You must provide a valid string to parse to continue.') unless stringToParse?
  lines = stringToParse.split('\n')
  workToMake = new Workout()
  parseLine lines, workToMake
  workToMake

module.exports = parser
