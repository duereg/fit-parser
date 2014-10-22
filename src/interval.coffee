#NUM_INTERVALS X DISTANCE TYPE @ TIME
#noTime = { milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 }
timeFormatter = require('./timeFormatter')

module.exports =
  class Interval
    constructor: (options) ->
      {@distance, @type, @time} = options if options

      @distance ?= 0
      @type ?= ''
      @time ?= 0

    isEmpty: ->
      @distance is 0 and @type is '' and @time is 0

    toString: ->
      if @time.humanize?
        if @distance
          "#{@distance} #{@type} @ #{timeFormatter(@time)}"
        else
          "#{timeFormatter(@time)} #{@type}"
      else
        "#{@distance} #{@type}"
