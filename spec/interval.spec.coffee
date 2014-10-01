{expect} = require './spec-helper'
Interval = require '../lib/interval'
moment = require 'moment'

describe 'interval', ->
  {int} = {}

  beforeEach ->
    int = new Interval()

  describe "::isEmpty", ->
    it 'is true for interval with default values', ->
      expect(int.isEmpty()).to.be.true

  describe "::toString", ->
    beforeEach ->
      int.type = 'huho'
      int.distance = 100

    it 'with time not set, formats correctly', ->
      expect(int.toString()).to.eq '100 huho'

    describe 'with second intervals', ->
      beforeEach ->
        int.time = moment.duration('00:00:30')

      it 'formats minutes correctly', ->
        expect(int.toString()).to.eq '100 huho @ 0:30'

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
