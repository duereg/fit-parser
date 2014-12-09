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

  describe '::isEmpty', ->
    {fiveMinutes} = {}

    describe 'given a duration', ->
      beforeEach ->
        fiveMinutes = moment.duration minutes: 5

      it 'returns a valid representation', ->
        expect(timeFormatter.isEmpty(fiveMinutes)).to.be.false

    describe 'given a number', ->
      beforeEach ->
        fiveMinutes = 5*60*1000

      it 'returns a valid representation', ->
        expect(timeFormatter.isEmpty(fiveMinutes)).to.be.true

  describe '::toDuration', ->
    {fiveMinutes} = {}

    describe 'given a duration', ->
      beforeEach ->
        fiveMinutes = moment.duration minutes: 5

      it 'returns a valid representation', ->
        expect(timeFormatter.toDuration(fiveMinutes)).to.eql fiveMinutes

    describe 'given a number', ->
      beforeEach ->
        fiveMinutes = 5*60*1000

      it 'returns a valid representation', ->
        expect(timeFormatter.toDuration(fiveMinutes)).to.eql moment.duration minutes: 5

    describe "given a string", ->
      it "':20' returns a 20 second duration", ->
        expect(timeFormatter.toDuration(":20").seconds()).to.eq 20

      it "'20' returns a 20 second duration", ->
        expect(timeFormatter.toDuration("20").seconds()).to.eq 20

      it "'1:15' returns a 1 minute 15 second duration", ->
        expect(timeFormatter.toDuration("1:15").minutes()).to.eq 1
        expect(timeFormatter.toDuration("1:15").seconds()).to.eq 15

      it "'1:25:45' returns a 1 hour, 25 minute, 45 second duration", ->
        expect(timeFormatter.toDuration("1:25:45").hours()).to.eq 1
        expect(timeFormatter.toDuration("1:25:45").minutes()).to.eq 25
        expect(timeFormatter.toDuration("1:25:45").seconds()).to.eq 45

  describe '::toJSON', ->
    {fiveMinutes} = {}

    describe 'given a duration', ->
      beforeEach ->
        fiveMinutes = moment.duration minutes: 5

      it 'returns a valid representation', ->
        expect(timeFormatter.toJSON(fiveMinutes)).to.eql _({minutes: 5}).defaults(timeFormatter.noTime)

    describe 'given crap', ->
      beforeEach ->
        fiveMinutes = 'abc'

      it 'returns the empty time representation', ->
        expect(timeFormatter.toJSON(fiveMinutes)).to.eql _(timeFormatter.noTime).clone()

    describe 'given null', ->
      beforeEach ->
        fiveMinutes = null

      it 'returns the empty time representation', ->
        expect(timeFormatter.toJSON(fiveMinutes)).to.eql _(timeFormatter.noTime).clone()

  describe '::toString', ->
    {fiveMinutes, fiveHours, oneHourFiveMinutes} = {}

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
      describe 'in minutes', ->
        beforeEach ->
          fiveMinutes = moment.duration minutes: 5

        it 'returns a valid representation', ->
          expect(timeFormatter.toString(fiveMinutes)).to.eq '5:00'
      describe 'in hours and minutes', ->
        beforeEach ->
          oneHourFiveMinutes = moment.duration minutes: 5, hours: 1

        it 'returns a valid representation', ->
          expect(timeFormatter.toString(oneHourFiveMinutes)).to.eq '1:05:00'


