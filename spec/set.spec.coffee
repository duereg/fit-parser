{expect} = require "./spec-helper"
Set = require "../lib/set"
Interval = require "../lib/interval"
moment = require 'moment'

describe "Set", ->
  describe "Creating a new set", ->
    {workoutSet} = {}

    beforeEach ->
      workoutSet = new Set("set 1")

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

    describe "::toString", ->
      beforeEach ->
        workoutSet.addInterval new Interval {distance: 100, type: 'huho', time: moment.duration('00:01:30')}
        workoutSet.addInterval new Interval {distance: 100, type: 'huho', time: moment.duration('00:01:30')}
        workoutSet.addInterval new Interval {distance: 100, type: 'huho', time: moment.duration('00:01:30')}

      describe 'multi-set', ->
        beforeEach ->
          workoutSet.multiSet = 3

        it 'displays correct set notation for all intervals', ->
          expect(workoutSet.toString()).to.eq "3x100 huho @ 1:30"

      describe 'mixed set', ->
        it 'displays correct notation for all intervals', ->
          expect(workoutSet.toString()).to.eq "100 huho @ 1:30\n100 huho @ 1:30\n100 huho @ 1:30\n"
