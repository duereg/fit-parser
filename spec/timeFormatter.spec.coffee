{expect} = require './spec-helper'
timeFormatter = require '../lib/timeFormatter'
moment = require 'moment'

describe 'timeFormatter', ->
  {duration, noTime} = {}

  beforeEach ->
    noTime = { milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 }
    moment.duration noTime

  describe 'given invalid time', ->
    it 'throws', ->
      expect(timeFormatter).to.throw

  describe 'given a number of milliseconds', ->
    {fiveMinutes} = {}
    beforeEach ->
      fiveMinutes = 5 * 60 * 1000

    it 'returns a valid representation', ->
      expect(timeFormatter(fiveMinutes)).to.eq '5:00'

  describe 'given a object with time properties', ->
    describe 'in minutes', ->
      {fiveMinutes} = {}

      beforeEach ->
        fiveMinutes = minutes: 5

      it 'returns a valid representation', ->
        expect(timeFormatter(fiveMinutes)).to.eq '5:00'

    describe 'in hours', ->
      {fiveHours} = {}

      beforeEach ->
        fiveHours = hours: 5

      it 'returns a valid representation', ->
        expect(timeFormatter(fiveHours)).to.eq '5:00:00'

  describe 'given a duration', ->
    {fiveMinutes} = {}
    beforeEach ->
      fiveMinutes = moment.duration minutes: 5

    it 'returns a valid representation', ->
      expect(timeFormatter(fiveMinutes)).to.eq '5:00'


