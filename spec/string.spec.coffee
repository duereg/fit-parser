{expect} = require "./spec-helper"
require("../lib/string")

describe "string:: extensions", ->
  describe "trim", ->
    it "removes whitespace from the ends of a string", ->
      expect(" this string ".trim()).to.eq "this string"

    it "does nothing is no leading or trailing whitespace is present", ->
      expect("this string".trim()).to.eq "this string"

  describe "isEmpty", ->
    it "returns true for an empty string", ->
      expect("".isEmpty()).to.be.true

    it "returns false for a string of whitespace", ->
      expect(" ".isEmpty()).to.be.false
