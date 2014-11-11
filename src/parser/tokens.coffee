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
    plusPosition = str.indexOf('+')
    justTime = str.slice(plusPosition + 1)
    isRemainderTime = @isTimeRegex.test justTime

    (plusPosition > -1) and isRemainderTime
