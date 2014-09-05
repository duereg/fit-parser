unless String::isEmpty
  String::isEmpty = ->
    (typeof this is "undefined") or (this is null) or (@length is 0)

module.exports = String
