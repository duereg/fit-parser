set = require("./set.js")
actions = require("./actions.js")

workout = ->
  @sets = []
  @unit = workout.units.yards
  @poolLength = 25
  return

workout.units =
  yards: 1
  meters: 1.3

workout::addSet = (setName) ->
  newSet = new set(setName)
  @sets.push newSet
  newSet

workout::current = ->
  set = null
  setLength = @sets.length
  if setLength > 0
    set = @sets[setLength - 1]
  else
    set = @addSet()
  set

workout::totalDistance = ->
  actions.sum @sets, "totalDistance"

workout::totalTime = ->
  actions.sum @sets, "totalTime"

module.exports = workout
