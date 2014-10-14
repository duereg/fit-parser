# code snippets stolen from
# http://usefulscripts.wordpress.com/2008/10/02/integer-parsing-in-javascript/

integer =
  isNumRegEx: /^\d+$/

  tryParse: (str, defaultValue) ->
    defaultValue = parseInt(str)  if @isNumber(str)
    defaultValue

  isNumber: (num) ->
    @isNumRegEx.test num

module.exports = integer
