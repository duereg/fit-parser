actions = require('./actions')

class Set
  constructor: (options) ->
    {@name, @intervals} = options if options?
    @intervals ?= []
    @name ?= ''

  toString: ->
    output = ''
    output += @name + '\n' if @name.length
    output += @intervals.map((interval) -> interval.toString()).join('\n')
    output

  toJSON: ->
    {@name, intervals: @intervals.map (interval) -> interval.toJSON()}

  current: ->
    currentInterval = null
    intervalLength = @intervals.length
    if intervalLength > 0
      currentInterval = @intervals[intervalLength - 1]
    else
      currentInterval = @addInterval()
    currentInterval

  totalIntervals: ->
    total = 0

    for interval in @intervals
      if interval?.intervals
        total += interval.intervals.length
      else
        total += 1

    total

module.exports = Set
