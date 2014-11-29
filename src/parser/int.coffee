# code snippets stolen from
# http://usefulscripts.wordpress.com/2008/10/02/integer-parsing-in-javascript/

integer =
  isNumRegEx: /^\d+$/

  isNumber: (num) ->
    @isNumRegEx.test num

module.exports = integer
