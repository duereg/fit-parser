#NUM_INTERVALS X DISTANCE TYPE @ TIME

module.exports =
  class Interval
    constructor: (options) ->
      {@distance, @type, @time} = options if options

      @distance ?= 0
      @type ?= ''
      @time ?= 0

    timeFormatted: ->
      format = ''

      if @time.hours()
        format += @time.hours() + ":"

      if @time.minutes() is 0 and @time.hours()
        format += "00:"
      else
        format += @time.minutes() + ":"

      if @time.seconds() is 0
        format += "00"
      else
        format += @time.seconds()

      format

    toString: ->
      if @time.humanize?
        "#{@distance} #{@type} @ #{@timeFormatted()}"
      else
        "#{@distance} #{@type}"
