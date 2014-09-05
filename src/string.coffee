unless String::trim
  String::trim = ->
    @replace /^\s+|\s+$/g, ""

unless String::ltrim
  String::ltrim = ->
    @replace /^\s+/, ""

unless String::rtrim
  String::rtrim = ->
    @replace /\s+$/, ""

unless String::fulltrim
  String::fulltrim = ->
    @replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace /\s+/g, " "

unless String::isEmpty
  String::isEmpty = ->
    (typeof this is "undefined") or (this is null) or (@length is 0)

unless String::isBlank
  String::isBlank = ->
    /^\s*$/.test this

module.exports = String
