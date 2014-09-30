{expect} = require './spec-helper'
moment = require 'moment'

Workout = require '../lib/workout'
Set = require '../lib/set'
Interval = require '../lib/set'

describe 'Workout', ->
  {workout, set1} = {}

  describe "just a long swim", ->
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
        workout.current().addInterval()
        workout.current().setDistance(4)
        workout.current().changeToMulti()
        workout.current().setDistance(75)
        workout.current().setTime(moment.duration("00:01:10"))
        workout.current().setType('ouou')

      describe "1 set, containing an intervalSet", ->
        it 'contains the correct number of sets', ->
          expect(workout.sets.length).to.eq 1

        it 'contains the correct number of intervals', ->
          expect(workout.current().intervals.length).to.eq 2
          expect(workout.totalIntervals()).to.eq 5

        it 'formats correctly', ->
          expect(workout.toString()).to.eq 'set 1\n1000 swim @ 20:00\n4x75 ouou @ 1:10'
