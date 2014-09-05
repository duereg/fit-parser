interval = require("./interval")
actions = require("./actions")

set = (setName) ->
  @intervals = []
  @name = setName or ""
  @multiSet = 0
  return

set::setStuff = (key, value) ->
  if @multiSet
    actions.set @intervals, @multiSet, key, value
  else
    @current()[key] = value
  return

set::addInterval = (intervalToAdd) ->
  throw new Error("Give me a valid interval, would you?")  if intervalToAdd is null
  intervalToAdd = new interval()  if intervalToAdd is `undefined`
  @intervals.push intervalToAdd
  intervalToAdd

set::current = ->
  currentInterval = null
  intervalLength = @intervals.length
  if intervalLength > 0
    currentInterval = @intervals[intervalLength - 1]
  else
    currentInterval = @addInterval()
  currentInterval

set::changeToMulti = ->
  @multiSet = @current().distance
  @current().distance = 0
  i = 1

  while i < @multiSet
    @addInterval()
    i++
  return

set::reset = ->
  @multiSet = 0
  return

set::setDistance = (distance) ->
  @setStuff "distance", distance
  return

set::setTime = (time) ->
  @setStuff "time", time
  return

set::setType = (type) ->
  @setStuff "type", type
  return

set::totalDistance = ->
  actions.sum @intervals, "distance"

set::totalTime = ->
  actions.sum @intervals, "time"

module.exports = set
