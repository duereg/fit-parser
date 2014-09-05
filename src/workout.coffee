set = require("./set")
actions = require("./actions")

units =
  yards: 1
  meters: 1.3

workout = ->
  @sets = []
  @unit = units.yards
  @poolLength = 25
  return

workout.units = units

workout::addSet = (setName) ->
  newSet = new set(setName)
  @sets.push newSet
  newSet

workout::current = ->
  currentSet = null

  setLength = @sets.length
  if setLength > 0
    currentSet = @sets[setLength - 1]
  else
    currentSet = @addSet()

  currentSet

workout::totalDistance = ->
  actions.sum @sets, "totalDistance"

workout::totalTime = ->
  actions.sum @sets, "totalTime"

module.exports = workout
