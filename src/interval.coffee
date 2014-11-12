#NUM_INTERVALS X DISTANCE TYPE @ TIME
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

    toJSON: ->
      {time: timeFormatter.toJSON(@time), rest: timeFormatter.toJSON(@rest), @distance, @type}

    toString: ->
      if @time.humanize? or @rest.humanize?
        if @distance
          time = ''

          if @time.humanize?
            time = "@ #{timeFormatter.toString(@time)}"
          else if @rest.humanize?
            time = "+#{timeFormatter.toString(@rest)}"

          "#{@distance} #{@type} #{time}"
        else
          "#{timeFormatter.toString(@time)} #{@type}"
      else
        "#{@distance} #{@type}"
