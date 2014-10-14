Set = require('./set')
actions = require('./actions')

units =
  yards: 1
  meters: 1.3

class Workout
  constructor: ->
    @sets = []
    @unit = units.yards
    @poolLength = 25

  toString: ->
    @sets.map((set) -> set.toString()).join('\n')

  addSet: (setName) ->
    newSet = new Set(setName)
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

Workout.units = units

module.exports = Workout
