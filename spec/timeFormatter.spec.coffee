{expect} = require './spec-helper'
timeFormatter = require '../lib/timeFormatter'
moment = require 'moment'

describe 'timeFormatter', ->
  {duration, noTime} = {}

  beforeEach ->
    noTime = { milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 }
    moment.duration noTime

  describe 'is given invalid time', ->
    it 'throw', ->
      expect(timeFormatter).to.throw

  describe 'given a object with time properties', ->
    {fiveMinutes} = {}
    beforeEach ->
      fiveMinutes = minutes: 5

    it 'returns a valid respresentation', ->
      expect(timeFormatter(fiveMinutes)).to.eq '5:00'

  describe 'given a duration', ->
    {fiveMinutes} = {}
    beforeEach ->
      fiveMinutes = moment.duration minutes: 5

    it 'returns a valid respresentation', ->
      expect(timeFormatter(fiveMinutes)).to.eq '5:00'


