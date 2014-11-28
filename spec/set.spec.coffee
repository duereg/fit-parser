_ = require 'underscore'
moment = require 'moment'

{expect} = require "./spec-helper"
Set = require "../lib/set"
Interval = require "../lib/interval"
timeFormatter = require '../lib/timeFormatter'

describe "Set", ->
  {workoutSet} = {}

  describe 'unnamed set', ->
    beforeEach ->
      workoutSet = new Set()

    describe "::toString", ->
      it 'outputs nothing without content', ->
        expect(workoutSet.toString()).to.eq ''

  describe "named set", ->
    beforeEach ->
      workoutSet = new Set({name: "set 1"})

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

    describe "with intervals", ->
      {oneMinuteThirty} = {}

      beforeEach ->
        oneMinuteThirty = _({minutes: 1, seconds: 30}).defaults(timeFormatter.noTime)

        workoutSet.addInterval new Interval {distance: 100, type: 'huho', time: moment.duration(oneMinuteThirty)}
        workoutSet.addInterval new Interval {distance: 100, type: 'huho', time: moment.duration(oneMinuteThirty)}
        workoutSet.addInterval new Interval {distance: 100, type: 'huho', time: moment.duration(oneMinuteThirty)}

      describe "::toString", ->
        it 'displays correct notation for all intervals', ->
          expect(workoutSet.toString()).to.eq "set 1\n100 huho @ 1:30\n100 huho @ 1:30\n100 huho @ 1:30"

      describe '::toJSON', ->
        it 'outputs correct information', ->
          expect(workoutSet.toJSON()).to.eql {
            name: 'set 1'
            intervals: [
              {distance: 100, type: 'huho', time: oneMinuteThirty, rest: timeFormatter.noTime}
              {distance: 100, type: 'huho', time: oneMinuteThirty, rest: timeFormatter.noTime}
              {distance: 100, type: 'huho', time: oneMinuteThirty, rest: timeFormatter.noTime}
            ]
          }
