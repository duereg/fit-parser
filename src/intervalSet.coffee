Interval = require './interval'
propertyFactory = require './propertyFactory'
moment = require 'moment'

class IntervalSet
  constructor: (numIntervals) ->
    @intervals = []

    propertyFactory(@, @intervals, 'distance')
    propertyFactory(@, @intervals, 'type')
    propertyFactory(@, @intervals, 'time')

    if (numIntervals)
      i = 0
      while i < numIntervals
        @intervals.push new Interval()
        i++

  isEmpty: ->
    @intervals.length is 0

  current: ->
    currentInterval = null
    intervalLength = @intervals.length
    if intervalLength > 0
      currentInterval = @intervals[intervalLength - 1]
    else
      currentInterval = @addInterval()
    currentInterval

  addInterval: (intervalToAdd) ->
    throw new Error('Invalid interval given')  if intervalToAdd is null
    intervalToAdd = new Interval() unless intervalToAdd?
    @intervals.push intervalToAdd
    intervalToAdd

  toString: ->
    if @intervals.length
      "#{@intervals.length}x#{@current().toString()}"
    else
      ''

module.exports = IntervalSet
