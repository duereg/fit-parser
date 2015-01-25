duration = require('moment').duration

TimedSet = require '../lib/timedSet'
Interval = require '../lib/interval'
{expect, intervals, jsonIntervals, oneMinuteThirty} = require './spec-helper'

describe 'TimedSet', ->
  {timedSet} = {}

  describe 'unnamed timedSet', ->
    beforeEach ->
      timedSet = new TimedSet()

    describe '::toString', ->
      it 'outputs nothing without content', ->
        expect(timedSet.toString()).to.eq ''

  describe 'named timedSet with intervals', ->
    beforeEach ->
      timedSet = new TimedSet {name: 'timedSet 2', intervals: jsonIntervals}

    it 'creates hydrated intervals from given JSON', ->
      expect(timedSet.intervals).to.eql intervals

    it 'timedSets the name', ->
      expect(timedSet.name).to.eq 'timedSet 2'

    describe '::toString', ->
      it 'displays correct notation for all intervals', ->
        expect(timedSet.toString()).to.eq 'timedSet 2\n100 huho @ 1:30\n100 huho @ 1:30\n100 huho @ 1:30'

    describe '::toJSON', ->
      it 'outputs JSON matching original input', ->
        expect(timedSet.toJSON()).to.eql
          name: 'timedSet 2'
          intervals: jsonIntervals

  describe 'named timedSet with intervals', ->
    beforeEach ->
      timedSet = new TimedSet {name: 'timedSet 2', intervals: [intervals: jsonIntervals]}

    it 'creates one interval', ->
      expect(timedSet.intervals.length).to.eq 1

    it 'sets the name', ->
      expect(timedSet.name).to.eq 'timedSet 2'

    describe '::toString', ->
      it 'displays correct notation for all intervals', ->
        expect(timedSet.toString()).to.eq 'timedSet 2\n3x100 huho @ 1:30'

    describe '::toJSON', ->
      it 'outputs JSON matching original input', ->
        expect(timedSet.toJSON()).to.eql {
          name: 'timedSet 2'
          intervals: [intervals: jsonIntervals]
        }

  describe 'named timedSet', ->
    beforeEach ->
      timedSet = new TimedSet({name: 'timedSet 1'})

    it 'creates an array of empty intervals', ->
      expect(timedSet.intervals).to.eql []

    it 'timedSets the name', ->
      expect(timedSet.name).to.eq 'timedSet 1'

    describe '::current', ->
      {interval} = {}

      beforeEach ->
        interval = timedSet.current()

      it 'creates a new interval if called when empty', ->
        expect(timedSet.intervals.length).to.eq 1

      it 'creates a valid interval', ->
        expect(interval).to.be.ok

      describe '::setTime(string)', ->
        beforeEach ->
          timedSet.setTime '1:30'

        it 'parses time correctly and timedSets a duration', ->
          expect(timedSet.current().time).to.eql duration oneMinuteThirty

    describe '::add', ->
      it 'calling with null throws', ->
        expect(() -> timedSet.add(null)).to.throw 'Invalid interval given'

      it 'calling with no params creates an empty interval', ->
        expect(timedSet.add()).to.be.ok

    describe '::changeToMulti', ->
      beforeEach ->
        timedSet.current().distance = 2
        timedSet.changeToMulti()

      it 'removes the previous interval', ->
        expect(timedSet.current().distance).not.to.eq 2

      it 'creates an timedSet to replace the previous interval', ->
        expect(timedSet.current().intervals.length).to.eq 2

      describe '::toJSON', ->
        it 'outputs correct information', ->
          expect(timedSet.toJSON()).to.eql {
            name: 'timedSet 1'
            intervals: [
              {
                intervals: [
                  new Interval().toJSON(), new Interval().toJSON()
                ]
              }
            ]
          }

    describe 'with added intervals', ->
      beforeEach ->
        intervals.forEach (interval) ->
          timedSet.add interval

      describe '::toString', ->
        it 'displays correct notation for all intervals', ->
          expect(timedSet.toString()).to.eq 'timedSet 1\n100 huho @ 1:30\n100 huho @ 1:30\n100 huho @ 1:30'

      describe '::toJSON', ->
        it 'outputs correct information', ->
          expect(timedSet.toJSON()).to.eql {
            name: 'timedSet 1'
            intervals: jsonIntervals
          }
