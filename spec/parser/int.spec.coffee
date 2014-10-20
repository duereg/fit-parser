{expect} = require "../spec-helper"
integer = require("../../lib/parser/int")

describe "Working with the Integer Library", ->
  describe "Testing tryParse", ->
    it "the string \"123\" parses to a number", ->
      expect(integer.tryParse("123", 0)).to.eq 123

    it "the string \"abc\", with default set to 10, to be 10", ->
      expect(integer.tryParse("abc", 10)).to.eq 10

  describe "Testing isNumber", ->
    it "the string \"123\" returns true", ->
      expect(integer.isNumber("123")).to.eq true

    it "the string \"abc\" returns false", ->
      expect(integer.isNumber("abc")).to.eq false
