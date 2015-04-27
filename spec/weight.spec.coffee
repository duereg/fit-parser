{expect} = require './spec-helper'
Weight = require '../lib/weight'
_ = require 'underscore'

describe 'Weight', ->
  {tenReps} = {}

  beforeEach ->
    tenReps = new Weight()

  describe '::isEmpty', ->
    it 'is true for weight with default values', ->
      expect(tenReps.isEmpty()).to.be.true

  describe 'w/o weight ::toString', ->
    beforeEach ->
      tenReps.reps = 20

    it 'formats correctly', ->
      expect(tenReps.toString()).to.eq '- 20 reps'

  describe 'w/ weight ::toString', ->
    beforeEach ->
      tenReps.weight = 135
      tenReps.reps = 10

    it 'with time not set, formats correctly', ->
      expect(tenReps.toString()).to.eq '- 135 lbs x 10 reps'

    describe '::oneRepMax', ->
      it 'outputs the correct value', ->
        expect(Math.round(tenReps.oneRepMax())).to.eq 180

    describe '::toJSON', ->
      {json} = {}

      beforeEach ->
        json = tenReps.toJSON()

      it 'outputs correctly', ->
        expect(json).to.eql
          weight: 135
          reps: 10

      describe 'creating new weight from JSON', ->
        newWeight = null
        beforeEach ->
          newWeight = new Weight json

        it 'outputs the same as the original', ->
          expect(newWeight.toString()).to.eq '- 135 lbs x 10 reps'
