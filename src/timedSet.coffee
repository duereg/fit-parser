Interval = require('./interval')
IntervalSet = require('./intervalSet')
Set = require('./set')
actions = require('./actions')
timeFormatter = require('./timeFormatter')

class TimedSet extends Set
  constructor: (options) ->
    #this isn't the right way to do this
    _super.call(this, options)

    @intervals = @intervals.map (interval) ->
      if interval.intervals
        new IntervalSet(interval.intervals)
      else
        new Interval(interval)

  addInterval: (intervalToAdd) ->
    throw new Error('Invalid interval given')  if intervalToAdd is null
    intervalToAdd = new Interval()  unless intervalToAdd?
    @intervals.push intervalToAdd
    intervalToAdd

  changeToMulti: ->
    numIntervals = @current().distance
    #remove single interval
    @intervals.pop()
    #replace with interval set
    @addInterval new IntervalSet(numIntervals)

  setRest: (rest) ->
    @current().rest = rest

  setDistance: (distance) ->
    @current().distance = distance

  setTime: (time) ->
    @current().time = timeFormatter.toDuration time

  setType: (type) ->
    @current().type = type

  totalDistance: ->
    actions.sum @intervals, 'distance'

  totalTime: ->
    actions.sum @intervals, 'time'

module.exports = TimedSet
