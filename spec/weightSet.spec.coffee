duration = require('moment').duration

WeightSet = require '../lib/weightSet'
Weight = require '../lib/weight'
{expect} = require './spec-helper'

jsonWeights = [
  { weight: 135, reps: 10 }
  { weight: 135, reps: 10 }
  { weight: 135, reps: 10 }
]

hydratedWeights = jsonWeights.map (weight) -> new Weight(weight)

describe 'WeightSet', ->
  {weightSet} = {}

  describe 'unnamed weightSet', ->
    beforeEach ->
      weightSet = new WeightSet()

    describe '::toString', ->
      it 'outputs nothing without content', ->
        expect(weightSet.toString()).to.eq ''

  describe 'named weightSet with intervals', ->
    beforeEach ->
      weightSet = new WeightSet {name: 'weightSet 2', intervals: jsonWeights}

    it 'creates hydrated intervals from given JSON', ->
      expect(weightSet.intervals).to.eql hydratedWeights

    it 'sets the name', ->
      expect(weightSet.name).to.eq 'weightSet 2'

    describe '::toString', ->
      it 'displays correct notation for all intervals', ->
        expect(weightSet.toString()).to.eq 'weightSet 2\n- 135 lbs x 10 reps\n- 135 lbs x 10 reps\n- 135 lbs x 10 reps'

    describe '::toJSON', ->
      it 'outputs JSON matching original input', ->
        expect(weightSet.toJSON()).to.eql
          name: 'weightSet 2'
          intervals: jsonWeights

  describe 'named weightSet', ->
    beforeEach ->
      weightSet = new WeightSet({name: 'weightSet 1'})

    it 'creates an array of empty intervals', ->
      expect(weightSet.intervals).to.eql []

    it 'sets the name', ->
      expect(weightSet.name).to.eq 'weightSet 1'

    describe '::current', ->
      {interval} = {}

      beforeEach ->
        interval = weightSet.current()

      it 'creates a new interval if called when empty', ->
        expect(weightSet.intervals.length).to.eq 1

      it 'creates a valid interval', ->
        expect(interval).to.be.ok

      describe '::setWeight(number)', ->
        beforeEach ->
          weightSet.setWeight 155

        it 'sets the weight', ->
          expect(weightSet.current().weight).to.eq 155

    describe '::add', ->
      it 'calling with null throws', ->
        expect(() -> weightSet.add(null)).to.throw 'Invalid weight given'

      it 'calling with no params creates an empty interval', ->
        expect(weightSet.add()).to.be.ok

    describe 'with added intervals', ->
      beforeEach ->
        jsonWeights.forEach (weight) ->
          weightSet.add weight

      describe '::toString', ->
        it 'displays correct notation for all intervals', ->
          expect(weightSet.toString()).to.eq 'weightSet 1\n- 135 lbs x 10 reps\n- 135 lbs x 10 reps\n- 135 lbs x 10 reps'

      describe '::toJSON', ->
        it 'outputs correct information', ->
          expect(weightSet.toJSON()).to.eql {
            name: 'weightSet 1'
            intervals: jsonWeights
          }
