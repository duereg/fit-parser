moment = require 'moment'
_ = require 'underscore'

IntervalSet = require "../lib/intervalSet"
{expect, intervals, jsonIntervals} = require "./spec-helper"

describe "IntervalSet", ->
  {set} = {}

  describe "Given a number of intervals", ->
    beforeEach ->
      set = new IntervalSet(4)

    it "creates a populated array", ->
      expect(set.intervals.length).to.eq(4)

    it "::isEmpty returns false", ->
      expect(set.isEmpty()).to.be.false

    describe 'setting distance', ->
      beforeEach ->
        set.distance = 100

      it 'sets the distance on the underlying intervals', ->
        expect(_(set.intervals).all((interval) -> interval.distance is 100)).to.be.true


  describe "given intervals", ->
    beforeEach ->
      set = new IntervalSet jsonIntervals

    it 'creates hydrated intervals from given JSON', ->
      expect(set.intervals).to.eql intervals

    describe "::toString", ->
      it 'displays correct notation for all intervals', ->
        expect(set.toString()).to.eq "3x100 huho @ 1:30"

    describe '::toJSON', ->
      it 'outputs JSON matching original input', ->
        expect(set.toJSON()).to.eql {
          intervals: jsonIntervals
        }

    describe '::time', ->
      it 'returns summed milliseconds from the intervals', ->
        expect(set.time).to.eq 270000

  describe "Creating an empty set", ->
    beforeEach ->
      set = new IntervalSet()

    it "creates an array of empty intervals", ->
      expect(set.intervals).to.eql []

    it "outputs an empty string", ->
      expect(set.toString()).to.eq ""

    it "::isEmpty returns true", ->
      expect(set.isEmpty()).to.be.true

    describe "::current", ->
      {interval} = {}

      beforeEach ->
        interval = set.current()

      it 'creates a new interval if called when empty', ->
        expect(set.intervals.length).to.eq 1

      it 'creates a valid interval', ->
        expect(interval).to.be.ok

    describe "::addInterval", ->
      it "calling with null throws", ->
        expect(() -> set.addInterval(null)).to.throw "Invalid interval given"

      it "calling with no params creates an empty interval", ->
        expect(set.addInterval()).to.be.ok

    describe "with multiple intervals", ->
      beforeEach ->
        intervals.forEach (interval) ->
          set.addInterval interval

      describe "::toString", ->
        it 'displays correct set notation for all intervals', ->
          expect(set.toString()).to.eq "3x100 huho @ 1:30"

      describe "distance", ->
        it 'sums the distances correctly', ->
          expect(set.distance).to.eq 300

      describe '::toJSON', ->
        it 'outputs correct information', ->
          expect(set.toJSON()).to.eql {
            intervals: jsonIntervals
          }

      describe "time", ->
        {time} = {}

        beforeEach ->
          time = moment.duration(set.time)

        it 'sums the times correctly', ->
          expect(time.minutes()).to.eq 4
          expect(time.seconds()).to.eq 30
