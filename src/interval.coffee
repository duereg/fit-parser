#NUM_INTERVALS X DISTANCE TYPE @ TIME

module.exports =
  class Interval
    constructor: ->
      @distance = 0
      @type = ''
      @time = 0

    timeFormatted: ->
      format = ''

      if @time.hours()
        format += @time.hours() + ":"
      format += @time.minutes() + ":" + @time.seconds()

      format

    toString: ->
      if @time.humanize?
        "#{@distance} #{@type} @ #{@timeFormatted()}"
      else
        "#{@distance} #{@type}"
