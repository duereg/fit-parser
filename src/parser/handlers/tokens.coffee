integer = require './int'

module.exports =
  setDividerRegex: /[xX\\*]/
  isSetRegex: /[0-9][xX\\*][0-9]/
  isSetDividerRegex: /^[xX\\*]$/
  isTimeRegex: /^(([0-9])|([0-1][0-9])|([2][0-3]))?:(([0-9])|([0-5][0-9]))$/

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

