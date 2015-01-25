{expect} = require '../spec-helper'

Workout = require '../../lib/workout'
WeightSet = require '../../lib/weightSet'
weightTitle = require '../../lib/parser/handlers/weightTitle'

describe 'weightTitle Handler', ->
  describe '::canHandle', ->
    describe 'given the token "**"', ->
      it 'canHandle() returns true', ->
        expect(weightTitle.canHandle('**')).to.eq true

    describe 'given the token "-"', ->
      it 'canHandle() returns false', ->
        expect(weightTitle.canHandle('-')).to.eq false

  describe '::act', ->
    {workout} = {}

    beforeEach ->
      workout = new Workout()
      currentSet = workout.current()
      currentSet.add()
      weightTitle.act ['Bench', 'Press', '**'], '**', currentSet, workout

    it 'the workout`s current set has the correct name', ->
      expect(workout.current().name).to.eq '** Bench Press **'

    it 'the current set is of the correct type', ->
      expect(workout.current()).to.be.instanceOf WeightSet
