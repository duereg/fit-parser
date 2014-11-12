{expect} = require './spec-helper'
Interval = require '../lib/interval'
timeFormatter = require '../lib/timeFormatter'
moment = require 'moment'
_ = require 'underscore'

describe 'interval', ->
  {int} = {}

  beforeEach ->
    int = new Interval()

  describe '::isEmpty', ->
    it 'is true for interval with default values', ->
      expect(int.isEmpty()).to.be.true

  describe 'w/o distance ::toString', ->
    beforeEach ->
      int.type = 'rest'
      int.time = moment.duration('00:20:00')

    it 'formats correctly', ->
      expect(int.toString()).to.eq '20:00 rest'

  describe 'w/ distance ::toString', ->
    beforeEach ->
      int.type = 'huho'
      int.distance = 100

    it 'with time not set, formats correctly', ->
      expect(int.toString()).to.eq '100 huho'

    describe 'w/ rest', ->
      describe 'with second intervals', ->
        beforeEach ->
          int.rest = moment.duration('00:00:30')

        it 'formats minutes correctly', ->
          expect(int.toString()).to.eq '100 huho +0:30'

      describe 'with minute intervals', ->
        beforeEach ->
          int.rest = moment.duration('00:01:30')

        it 'formats minutes correctly', ->
          expect(int.toString()).to.eq '100 huho +1:30'

      describe 'with hour intervals', ->
        beforeEach ->
          int.rest = moment.duration('02:30:15')

        it 'formats hours correctly', ->
          expect(int.toString()).to.eq '100 huho +2:30:15'

    describe 'time', ->
      describe 'with second intervals', ->
        beforeEach ->
          int.time = moment.duration('00:00:30')

        it 'formats minutes correctly', ->
          expect(int.toString()).to.eq '100 huho @ 0:30'

        describe '::toJSON', ->
          {json} = {}

          beforeEach ->
            json = int.toJSON()

          it 'outputs correctly', ->
            expect(json).to.eql
              time: _({}).extend(timeFormatter.noTime, {seconds: 30})
              rest: timeFormatter.noTime
              distance: 100
              type: 'huho'

      describe 'with minute intervals', ->
        beforeEach ->
          int.time = moment.duration('00:01:30')

        it 'formats minutes correctly', ->
          expect(int.toString()).to.eq '100 huho @ 1:30'

      describe 'with hour intervals', ->
        beforeEach ->
          int.time = moment.duration('02:30:15')

        it 'formats hours correctly', ->
          expect(int.toString()).to.eq '100 huho @ 2:30:15'
