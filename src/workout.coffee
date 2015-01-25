TimedSet = require('./timedSet')
WeightSet = require('./weightSet')
actions = require('./actions')

isWeightSet = (str) ->
  !!str && str.indexOf('**') is 0 && str.lastIndexOf('**') is str.length - 2

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
    if isWeightSet(setName)
      newSet = new WeightSet {name: setName}
    else
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

Workout.isWeightSet = isWeightSet

module.exports = Workout
