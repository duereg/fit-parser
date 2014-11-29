moment = require 'moment'
integer = require './int'

module.exports =
  setDividerRegex: /[xX\\*]/
  isSetRegex: /[0-9][xX\\*][0-9]/
  isSetDividerRegex: /^[xX\\*]$/
  isTimeRegex: /^(([0-9])|([0-9][0-9]))?:?(([0-9])|([0-5][0-9]))$/

  isSet: (str) ->
    @isSetRegex.test str

  isSetDivider: (str) ->
    @isSetDividerRegex.test str

  isTimeDivider: (str) ->
    str is '@'

  isTime: (str) ->
    @isTimeRegex.test str

  isRest: (str) ->
    @getRest(str).length > 0

  getDuration: (str) ->
    timeTokens = str.split(':')
    timeTypes = ['hours', 'minutes', 'seconds']
    duration = {}

    while timeTokens.length
      token = timeTokens.pop()
      type = timeTypes.pop()
      duration[type] = parseInt token, 10

    moment.duration duration

  getRest: (str) ->
    plusPosition = str.indexOf('+')
    justTime = str.slice(plusPosition + 1)
    isRemainderTime = @isTime justTime
    isRemainderNumber = integer.isNumber(justTime)

    if (plusPosition > -1)
      if isRemainderTime
        return justTime
      else if isRemainderNumber
        return ":#{justTime}"

    return ''

