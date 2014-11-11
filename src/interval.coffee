#NUM_INTERVALS X DISTANCE TYPE @ TIME
#noTime = { milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 }
timeFormatter = require('./timeFormatter')

module.exports =
  class Interval
    constructor: (options) ->
      {@distance, @type, @time, @rest} = options if options

      @distance ?= 0
      @type ?= ''
      @time ?= 0
      @rest ?= 0

    isEmpty: ->
      @distance is 0 and @type is '' and @time is 0

    toString: ->
      if @time.humanize? or @rest.humanize?
        if @distance
          time = ''

          if @time.humanize?
            time = "@ #{timeFormatter(@time)}"
          else if @rest.humanize?
            time = "+#{timeFormatter(@rest)}"

          "#{@distance} #{@type} #{time}"
        else
          "#{timeFormatter(@time)} #{@type}"
      else
        "#{@distance} #{@type}"
