{expect} = require './spec-helper'
timeFormatter = require '../lib/timeFormatter'
moment = require 'moment'
_ = require 'underscore'

describe 'timeFormatter', ->
  {duration, noTime} = {}

  beforeEach ->
    moment.duration timeFormatter.noTime

  describe 'given invalid time', ->
    it 'throws', ->
      expect(timeFormatter).to.throw

  describe '::toJSON', ->
    {fiveMinutes} = {}

    describe 'given a duration', ->
      beforeEach ->
        fiveMinutes = moment.duration minutes: 5

      it 'returns a valid representation', ->
        expect(timeFormatter.toJSON(fiveMinutes)).to.eql _({}).extend(timeFormatter.noTime, {minutes: 5})

  describe '::toString', ->
    {fiveMinutes, fiveHours} = {}

    describe 'given a number of milliseconds', ->
      beforeEach ->
        fiveMinutes = 5 * 60 * 1000

      it 'returns a valid representation', ->
        expect(timeFormatter.toString(fiveMinutes)).to.eq '5:00'

    describe 'given a object with time properties', ->
      describe 'in minutes', ->
        beforeEach ->
          fiveMinutes = minutes: 5

        it 'returns a valid representation', ->
          expect(timeFormatter.toString(fiveMinutes)).to.eq '5:00'

      describe 'in hours', ->
        beforeEach ->
          fiveHours = hours: 5

        it 'returns a valid representation', ->
          expect(timeFormatter.toString(fiveHours)).to.eq '5:00:00'

    describe 'given a duration', ->
      beforeEach ->
        fiveMinutes = moment.duration minutes: 5

      it 'returns a valid representation', ->
        expect(timeFormatter.toString(fiveMinutes)).to.eq '5:00'


