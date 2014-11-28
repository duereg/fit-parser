#NUM_INTERVALS X DISTANCE TYPE @ TIME
timeFormatter = require('./timeFormatter')
_ = require 'underscore'

module.exports =
  class Interval
    constructor: (options) ->
      {@distance, @type, @time, @rest} = options if options

      @distance ?= 0
      @type ?= ''
      @rest = timeFormatter.toDuration(@rest)
      @time = timeFormatter.toDuration(@time)

    isEmpty: ->
      @distance is 0 and
      @type is '' and
      timeFormatter.isEmpty(@time) and
      timeFormatter.isEmpty(@rest)

    toJSON: ->
      {time: timeFormatter.toJSON(@time), rest: timeFormatter.toJSON(@rest), @distance, @type}

    toString: ->
      if not timeFormatter.isEmpty(@time) or not timeFormatter.isEmpty(@rest)
        if @distance
          time = ''

          if not timeFormatter.isEmpty @time
            time = " @ #{timeFormatter.toString(@time)}"
          else if not timeFormatter.isEmpty @rest
            time = " +#{timeFormatter.toString(@rest)}"

          "#{@distance} #{@type}#{time}"
        else
          "#{timeFormatter.toString(@time)} #{@type}"
      else
        "#{@distance} #{@type}"
