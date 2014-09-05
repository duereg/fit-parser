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
    str is "@"

  isTime: (str) ->
    @isTimeRegex.test str

  parseTime: (str) ->
    #TODO: fix implementation
    str