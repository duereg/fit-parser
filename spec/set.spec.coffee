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

    describe "::changeToMulti", ->
      beforeEach ->
        workoutSet.current().distance = 2
        workoutSet.changeToMulti()

      it "removes the previous interval", ->
        expect(workoutSet.current().distance).not.to.eq 2

      it "creates an intervalSet to replace the previous interval", ->
        expect(workoutSet.current().intervals.length).to.eq 2

    describe "::toString", ->
      beforeEach ->
        workoutSet.addInterval new Interval {distance: 100, type: 'huho', time: moment.duration('00:01:30')}
        workoutSet.addInterval new Interval {distance: 100, type: 'huho', time: moment.duration('00:01:30')}
        workoutSet.addInterval new Interval {distance: 100, type: 'huho', time: moment.duration('00:01:30')}

      describe 'mixed set', ->
        it 'displays correct notation for all intervals', ->
          expect(workoutSet.toString()).to.eq "100 huho @ 1:30\n100 huho @ 1:30\n100 huho @ 1:30"
