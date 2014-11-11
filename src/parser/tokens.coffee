integer = require './int'

module.exports =
  setDividerRegex: /[xX\\*]/
  isSetRegex: /[0-9][xX\\*][0-9]/
  isSetDividerRegex: /^[xX\\*]$/
  isTimeRegex: /^(([0-9])|([0-1][0-9])|([2][0-3]))?:(([0-9])|([0-5][0-9]))$/

  isNumber: (str) ->
    integer.isNumber(str)

  getNumber: (str) ->
    parseInt(str, 10)

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
    isRemainderTime = @isTimeRegex.test justTime
    isRemainderNumber = @isNumber(justTime)

    if (plusPosition > -1)
      if isRemainderTime
        return justTime
      else if isRemainderNumber
        return ":#{justTime}"

    return ''

