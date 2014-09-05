{expect} = require "./spec-helper"
set = require("../src/set")

describe "workout-set", ->
  describe "Creating a new set", ->
    {workoutSet} = {}

    beforeEach ->
      workoutSet = new set("set 1")

    it "creates an array of intervals", ->
      expect(workoutSet.intervals).to.eql []

    it "creates a multi-set property equal to 0", ->
      expect(workoutSet.multiSet).to.eq 0

    it "sets the name to the given value", ->
      expect(workoutSet.name).to.eq "set 1"
