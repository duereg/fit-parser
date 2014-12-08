moment = require 'moment'
_ = require 'underscore'

Interval = require './interval'
propertyFactory = require './propertyFactory'
int = require './parser/handlers/int'

class IntervalSet
  constructor: (intervals) ->
    @intervals = []

    propertyFactory(this, @intervals, 'distance')
    propertyFactory(this, @intervals, 'type')
    propertyFactory(this, @intervals, 'time')
    propertyFactory(this, @intervals, 'rest')

    if intervals?
      if int.isNumber intervals
        i = 0
        while i < intervals
          @intervals.push new Interval()
          i++

      if _(intervals).isArray()
        intervals.map (interval) =>
          @intervals.push new Interval(interval)

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

  toJSON: ->
    {intervals: @intervals.map (interval) -> interval.toJSON()}

module.exports = IntervalSet
