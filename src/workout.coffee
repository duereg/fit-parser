TimedSet = require('./timedSet')
actions = require('./actions')

class Workout
  constructor: (options) ->
    {@sets} = options if options?
    @sets ?= []
    @sets = @sets.map (set) -> new TimedSet(set)

  toString: ->
    @sets.map((set) -> set.toString()).join('\n')

  toJSON: ->
    {sets: @sets.map (set) -> set.toJSON() }

  addSet: (setName) ->
    newSet = new TimedSet {name: setName}
    @sets.push newSet
    newSet

  current: ->
    currentSet = null

    setLength = @sets.length
    if setLength > 0
      currentSet = @sets[setLength - 1]
    else
      currentSet = @addSet()

    currentSet

  totalDistance: ->
    actions.sum @sets, 'totalDistance'

  totalTime: ->
    actions.sum @sets, 'totalTime'

  totalIntervals: ->
    total = 0
    total += set.totalIntervals() for set in @sets
    total

module.exports = Workout
