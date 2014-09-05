{expect} = require "./spec-helper"

tokens = require("../src/tokens")

describe "Working with the token determiner Library", ->
  describe "Testing isSet", ->
    it "the string \"4x100\" is a Set", ->
      expect(tokens.isSet("4x100")).to.eq true

    it "the string \"4X100\" is a Set", ->
      expect(tokens.isSet("4X100")).to.eq true

    it "the string \"4*100\" is a Set", ->
      expect(tokens.isSet("4*100")).to.eq true

    it "the string \"4xabc\" is not a Set", ->
      expect(tokens.isSet("4xabc")).to.eq false

    it "the string \"abcX200\" is not a Set", ->
      expect(tokens.isSet("abcX200")).to.eq false

  describe "Testing isSetDivider", ->
    it "the string \"x\" is a Set Divider", ->
      expect(tokens.isSetDivider("x")).to.eq true

    it "the string \"X\" is a Set Divider", ->
      expect(tokens.isSetDivider("X")).to.eq true

    it "the string \"*\" is a Set Divider", ->
      expect(tokens.isSetDivider("*")).to.eq true

    it "the string \"abc\" is not a Set Divider", ->
      expect(tokens.isSetDivider("abc")).to.eq false

    it "the string \"4x100\" is not a Set Divider", ->
      expect(tokens.isSetDivider("4x100")).to.eq false

  describe "Testing isTimeDivider", ->
    it "the string \"@\" is a Time Divider", ->
      expect(tokens.isTimeDivider("@")).to.eq true

    it "the string \"abc\" is not a Time Divider", ->
      expect(tokens.isTimeDivider("abc")).to.eq false

  describe "Testing isTime", ->
    it "the string \"1:30\" is a Time", ->
      expect(tokens.isTime("1:30")).to.eq true

    it "the string \"0:45\" is a Time", ->
      expect(tokens.isTime("0:45")).to.eq true

    it "the string \":20\" is a Time", ->
      expect(tokens.isTime(":20")).to.eq true

    it "the string \"a:30\" is not a Time", ->
      expect(tokens.isTime("a:30")).to.eq false

    it "the string \"2:3z\" is not a Time", ->
      expect(tokens.isTime("2:3z")).to.eq false


# describe("Testing parseTime", function() {
#   it('the string "123" parses to a number', function () {
#     expect(tokens.parseTime("123")).to.eq(123);
#   });

#   it('the string "abc", with default set to 10, to be 10', function () {
#     expect(tokens.parseTime("abc")).to.eq(10);
#   });
# });
