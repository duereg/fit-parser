{expect} = require "../spec-helper"
integer = require("../../lib/parser/handlers/int")

describe "Working with the Integer Library", ->
  describe "Testing isNumber", ->
    it "the string \"123\" returns true", ->
      expect(integer.isNumber("123")).to.eq true

    it "the string \"abc\" returns false", ->
      expect(integer.isNumber("abc")).to.eq false
