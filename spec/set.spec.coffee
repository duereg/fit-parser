{expect} = require "./spec-helper"
set = require("../lib/set")

describe "workout-set", ->
  describe "Creating a new set", ->
    {workoutSet} = {}

    beforeEach ->
      workoutSet = new set("set 1")

    it "creates an array of empty intervals", ->
      expect(workoutSet.intervals).to.eql []

    it "creates a multi-set property equal to 0", ->
      expect(workoutSet.multiSet).to.eq 0

    it "sets the name to the given value", ->
      expect(workoutSet.name).to.eq "set 1"

    describe "::current", ->
      {interval} = {}

      beforeEach ->
        interval = workoutSet.current()

      it 'creates a new interval if called when empty', ->
        expect(workoutSet.intervals.length).to.eq 1

      it 'creates a valid interval', ->
        expect(interval).to.be.ok

    describe "::addInterval", ->
      it "calling with null throws", ->
        expect(() -> workoutSet.addInterval(null)).to.throw "Invalid interval given"

      it "calling with no params creates an empty interval", ->
        expect(workoutSet.addInterval()).to.be.ok
