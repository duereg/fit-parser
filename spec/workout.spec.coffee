{expect, jsonIntervals, weightWorkout} = require './spec-helper'
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
  type: 'ouou'
}

describe 'Workout', ->
  {workout, set1} = {}

  describe '::isWeightSet', ->
    it 'the string that is bracketed with "**" is a weight set regex', ->
      expect(Workout.isWeightSet('** Squats **')).to.eq true

    it 'the string that contains a single "*" is not a weight set regex', ->
      expect(Workout.isWeightSet('4*100 @ 1:30')).to.eq false

  describe 'given weight sets', ->
    beforeEach ->
      workout = new Workout weightWorkout

    it 'contains the correct number of sets', ->
      expect(workout.sets.length).to.eq 6

    it "the sets are named correctly", ->
      expect(workout.sets[0].name).to.eq '** Flat Barbell Bench Press **'
      expect(workout.sets[1].name).to.eq '** Decline cable flies **'
      expect(workout.sets[2].name).to.eq '** Dead Bug 3 **'
      expect(workout.sets[3].name).to.eq '** Dead Bug 4 **'
      expect(workout.sets[4].name).to.eq '** Rope Beaters **'
      expect(workout.sets[5].name).to.eq '** Running (Treadmill) **'

    it 'generates the correct number of intervals', ->
      expect(workout.totalIntervals()).to.eq 16

  describe 'given timed sets', ->
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

  describe 'adding weight sets', ->
    describe 'sets added after creation', ->
      beforeEach ->
        workout = new Workout()
        set1 = workout.addSet('** Bench Press **')
        set1.current().weight = 135
        set1.current().reps = 10

      it 'contains the correct number of exercises', ->
        expect(workout.sets.length).to.eq 1

      it 'contains the correct number of sets', ->
        expect(workout.current().intervals.length).to.eq 1
        expect(workout.totalIntervals()).to.eq 1

      it 'formats correctly', ->
        expect(workout.toString()).to.eq '** Bench Press **\n- 135 lbs x 10 reps'

  describe 'adding timed sets', ->
    describe 'sets added after creation', ->
      beforeEach ->
        workout = new Workout()
        set1 = workout.addSet('set 1')
        set1.current().distance = 1000
        set1.current().type = 'swim'
        set1.current().time = moment.duration('00:20:00')

      it 'contains the correct number of sets', ->
        expect(workout.sets.length).to.eq 1

      it 'contains the correct number of intervals', ->
        expect(workout.current().intervals.length).to.eq 1
        expect(workout.totalIntervals()).to.eq 1

      it 'formats correctly', ->
        expect(workout.toString()).to.eq 'set 1\n1000 swim @ 20:00'

      describe 'adding an interval set', ->
        beforeEach ->
          workout.current().add()
          workout.current().setDistance(4)
          workout.current().changeToMulti()
          workout.current().setDistance(75)
          workout.current().setTime(moment.duration('00:01:10'))
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

        describe '1 set, containing an intervalSet', ->
          it 'contains the correct number of sets', ->
            expect(workout.sets.length).to.eq 1

          it 'contains the correct number of intervals', ->
            expect(workout.current().intervals.length).to.eq 2
            expect(workout.totalIntervals()).to.eq 5

          it 'formats correctly', ->
            expect(workout.toString()).to.eq 'set 1\n1000 swim @ 20:00\n4x75 ouou @ 1:10'
