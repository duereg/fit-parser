{expect} = require '../spec-helper'

Workout = require '../../lib/workout'
WeightSet = require '../../lib/weightSet'
Weight = require '../../lib/weight'
weightInterval = require '../../lib/parser/handlers/weightInterval'

describe 'weightInterval Handler', ->
  {workout, currentSet} = {}

  beforeEach ->
    workout = new Workout()
    currentSet = workout.addSet('** Squatters **')

  describe '::canHandle', ->
    describe 'given the token "**"', ->
      it 'canHandle() returns false', ->
        expect(weightInterval.canHandle('**', currentSet)).to.eq false

    describe 'given the token "-"', ->
      it 'canHandle() returns true', ->
        expect(weightInterval.canHandle('-', currentSet)).to.eq true

  describe '::act', ->
    describe 'on a line where both weight and reps are defined', ->
      beforeEach ->
        weightInterval.act ['95.0', 'lbs', 'x', '10', 'reps'], '-', currentSet, workout

      it 'the weight is correct', ->
        expect(currentSet.current().weight).to.eq 95

      it 'the reps are correct', ->
        expect(currentSet.current().reps).to.eq 10

      it 'the interval is instanceOf of the Weight class', ->
        expect(currentSet.current()).to.be.instanceOf Weight

    describe 'on a line where only the reps are set', ->
      beforeEach ->
        weightInterval.act ['10', 'reps'], '-', currentSet, workout

      it 'no weight is set', ->
        expect(currentSet.current().weight).to.not.be.ok

      it 'the reps are correct', ->
        expect(currentSet.current().reps).to.eq 10

      it 'the interval is instanceOf of the Weight class', ->
        expect(currentSet.current()).to.be.instanceOf Weight