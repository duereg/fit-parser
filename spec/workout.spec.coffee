{expect, jsonIntervals} = require './spec-helper'
moment = require 'moment'
_ = require 'underscore'

Workout = require '../lib/workout'
timeFormatter = require '../lib/timeFormatter'

longSwim = {
  distance : 1000,
  type: 'swim'
  rest: timeFormatter.noTime
  time: _({minutes: 20}).defaults(timeFormatter.noTime)
}

shortOuo = {
  distance: 75
  rest: timeFormatter.noTime
  time: _({minutes: 1, seconds: 10}).defaults(timeFormatter.noTime)
  type: "ouou"
}

describe 'Workout', ->
  {workout, set1} = {}

  describe "given sets", ->
    beforeEach ->
      workout = new Workout {sets: [{name: 'set 1', intervals: jsonIntervals}]}

    it 'contains the correct number of sets', ->
      expect(workout.sets.length).to.eq 1

    it 'contains the correct number of intervals', ->
      expect(workout.current().intervals.length).to.eq 3
      expect(workout.totalIntervals()).to.eq 3

    it 'formats correctly', ->
      expect(workout.toString()).to.eq 'set 1\n100 huho @ 1:30\n100 huho @ 1:30\n100 huho @ 1:30'

    describe '::toJSON', ->
      it 'outputs correctly', ->
        expect(workout.toJSON()).to.eql
          sets: [{
            name: 'set 1',
            intervals: jsonIntervals
          }]

  describe "sets added after creation", ->
    beforeEach ->
      workout = new Workout()
      set1 = workout.addSet("set 1")
      set1.current().distance = 1000
      set1.current().type = 'swim'
      set1.current().time = moment.duration("00:20:00")

    it 'contains the correct number of sets', ->
      expect(workout.sets.length).to.eq 1

    it 'contains the correct number of intervals', ->
      expect(workout.current().intervals.length).to.eq 1
      expect(workout.totalIntervals()).to.eq 1

    it 'formats correctly', ->
      expect(workout.toString()).to.eq 'set 1\n1000 swim @ 20:00'

    describe "adding an interval set", ->
      beforeEach ->
        workout.current().add()
        workout.current().setDistance(4)
        workout.current().changeToMulti()
        workout.current().setDistance(75)
        workout.current().setTime(moment.duration("00:01:10"))
        workout.current().setType('ouou')

      describe '::toJSON', ->
        it 'outputs correctly', ->
          expect(workout.toJSON()).to.eql
            sets: [{
              name: 'set 1',
              intervals: [
                longSwim,
                intervals: [
                  shortOuo, shortOuo, shortOuo, shortOuo
                ]
              ]
            }]

      describe "1 set, containing an intervalSet", ->
        it 'contains the correct number of sets', ->
          expect(workout.sets.length).to.eq 1

        it 'contains the correct number of intervals', ->
          expect(workout.current().intervals.length).to.eq 2
          expect(workout.totalIntervals()).to.eq 5

        it 'formats correctly', ->
          expect(workout.toString()).to.eq 'set 1\n1000 swim @ 20:00\n4x75 ouou @ 1:10'
