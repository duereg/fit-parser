interval = require("./interval")
actions = require("./actions")

class Set
  constructor: (setName) ->
    @intervals = []
    @name = setName or ""
    @multiSet = 0

  toString: ->
    output = ''

    if @multiSet
      output = "#{@multiSet}x#{@current().toString()}"
    else
      output += interval.toString() + '\n' for interval in @intervals

    output

  setStuff: (key, value) ->
    if @multiSet
      actions.set @intervals, @multiSet, key, value
    else
      @current()[key] = value
    return

  addInterval: (intervalToAdd) ->
    throw new Error("Invalid interval given")  if intervalToAdd is null
    intervalToAdd = new interval()  unless intervalToAdd?
    @intervals.push intervalToAdd
    intervalToAdd

  current: ->
    currentInterval = null
    intervalLength = @intervals.length
    if intervalLength > 0
      currentInterval = @intervals[intervalLength - 1]
    else
      currentInterval = @addInterval()
    currentInterval

  changeToMulti: ->
    @multiSet = @current().distance
    @current().distance = 0
    i = 1

    while i < @multiSet
      @addInterval()
      i++
    return

  reset: ->
    @multiSet = 0
    return

  setDistance: (distance) ->
    @setStuff "distance", distance
    return

  setTime: (time) ->
    @setStuff "time", time
    return

  setType: (type) ->
    @setStuff "type", type
    return

  totalDistance: ->
    actions.sum @intervals, "distance"

  totalTime: ->
    actions.sum @intervals, "time"

module.exports = Set
