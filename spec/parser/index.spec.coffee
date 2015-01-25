{expect} = require "../spec-helper"
parse = require("../../lib/parser")
moment = require "moment"

fullExample = """
Warm up

200 Swim
300 Kick
100 Swim

Workout

4x100 HUHO @ 1:30
1000 Kick @ 12:00
2:00 Rest
20:00 Swim

4 * 200 OUOU @ 1:30

Cooling down now

300 Swim
200 Swim
100 Kick  """

fullSet = """
Workout
4x100 HUHO @ 1:30
1000 Kick @ 12:00
2:00 Rest
20:00 Swim """

twoSets = """
Warm-up
200 Swim
300 Kick
Workout
4x100 HUHO @ :30
1000 Kick @ 16:00
2:00 Rest
20:00 Swim """

weightExample = """
** Flat Barbell Bench Press **
- 95.0 lbs x 10 reps
- 135.0 lbs x 10 reps
- 135.0 lbs x 10 reps
- 145.0 lbs x 10 reps
- 155.0 lbs x 6 reps
- 155.0 lbs x 5 reps

** Decline cable flies **
- 30.0 lbs x 10 reps
- 35.0 lbs x 10 reps
- 40.0 lbs x 10 reps

** Dead Bug 3 **
- 20 reps
- 20 reps

** Dead Bug 4 **
- 20 reps
- 20 reps
"""

weightWithCardio = weightExample + """

** Rope Beaters **
- 00:30
- 00:30

** Running (Treadmill) **
- 2.03 mi in 20:00
"""

set = "Start"

interval = "100 Swim  @   30"

intervalSet = "4x100  Swim @ 1:30"

intervalWithRest = "100 Swim +30"

describe "parser", ->
  {workout} = {}

  it "given null to parse, throws", ->
    expect(() -> parse(null)).to.throw "You must provide a valid string to parse to continue."

  describe "Given a full example to parse", ->

    beforeEach ->
      workout = parse(fullExample)

    it 'parses the workout into three sets', ->
      expect(workout.sets.length).to.eq 3

    it 'names each set correctly', ->
      expect(workout.sets[0].name).to.eq "Warm up"
      expect(workout.sets[1].name).to.eq "Workout"
      expect(workout.sets[2].name).to.eq "Cooling down now"

  describe 'given a weight set to parse', ->
    beforeEach ->
      workout = parse(weightExample)

    it "returns a workout", ->
      expect(workout).not.to.eq null

    it "returns a workout with 4 sets", ->
      expect(workout.sets.length).to.eq 4

    it "the sets are named correctly", ->
      expect(workout.sets[0].name).to.eq '** Flat Barbell Bench Press **'
      expect(workout.sets[1].name).to.eq '** Decline cable flies **'
      expect(workout.sets[2].name).to.eq '** Dead Bug 3 **'
      expect(workout.sets[3].name).to.eq '** Dead Bug 4 **'

    it 'generates the correct number of intervals', ->
      expect(workout.totalIntervals()).to.eq 13

  describe 'given a weight set with cardio to parse', ->
    beforeEach ->
      workout = parse(weightWithCardio)

    it "returns a workout", ->
      expect(workout).not.to.eq null

    it "returns a workout with 6 sets", ->
      expect(workout.sets.length).to.eq

    it "the 5th and 6th sets are named correctly", ->
      expect(workout.sets[4].name).to.eq '** Rope Beaters **'
      expect(workout.sets[5].name).to.eq '** Running (Treadmill) **'

    it 'generates the correct number of intervals', ->
      expect(workout.totalIntervals()).to.eq 16

  describe "given a Set Name to parse", ->
    beforeEach ->
      workout = parse(set)

    it "returns a workout", ->
      expect(workout).not.to.eq null

    it "returns a workout with a set", ->
      expect(workout.sets.length).to.eq 1

    it "returns a workout with correct set name", ->
      expect(workout.current().name).to.eq set

    it "returns a workout with distance of 0", ->
      expect(workout.current().totalDistance()).to.eq 0

    it "returns a workout with time of 0", ->
      expect(workout.current().totalTime()).to.eq 0

  describe "given interval with time (100 Swim @ :30) to parse", ->
    beforeEach ->
      workout = parse(interval)

    it "returns a workout", ->
      expect(workout).not.to.eq null

    it "returns a workout with a set", ->
      expect(workout.sets.length).to.eq 1

    describe 'generated interval', ->
      generatedInterval = null

      beforeEach ->
        generatedInterval = workout.current().current()

      it "has valid distance", ->
        expect(generatedInterval.distance).to.eq 100

      it 'had valid type', ->
        expect(generatedInterval.type).to.eq "Swim"

      it 'had valid time', ->
        expect(generatedInterval.time.minutes()).to.eq 0
        expect(generatedInterval.time.seconds()).to.eq 30

  describe "given interval with rest (100 Swim +30) to parse", ->
    beforeEach ->
      workout = parse(intervalWithRest)

    it "returns a workout", ->
      expect(workout).not.to.eq null

    it "returns a workout with a set", ->
      expect(workout.sets.length).to.eq 1

    describe 'generated interval', ->
      generatedInterval = null

      beforeEach ->
        generatedInterval = workout.current().current()

      it "has valid distance", ->
        expect(generatedInterval.distance).to.eq 100

      it 'had valid type', ->
        expect(generatedInterval.type).to.eq "Swim"

      it 'had valid time', ->
        expect(generatedInterval.rest.seconds()).to.eq 30

  describe "given intervalSet (4x100 Swim @ 1:30) to parse", ->
    beforeEach ->
      workout = parse(intervalSet)

    it "returns a workout", ->
      expect(workout).not.to.eq null

    it "returns a workout with a set", ->
      expect(workout.sets.length).to.eq 1

    it 'returns valid time', ->
      expect(workout.totalTime()).to.eq 360000

    describe "when looking at the current set", ->
      generatedSet = null
      beforeEach ->
        generatedSet = workout.current()

      it "creates a valid set", ->
        expect(generatedSet).not.to.eq null

      it "creates valid intervals", ->
        expect(generatedSet.intervals).not.to.eq null

      it "returns a workout with a set and 4 intervals", ->
        expect(generatedSet.current().intervals.length).to.eq 4

      it "returns a workout with a set that has a total distance of 400", ->
        expect(generatedSet.totalDistance()).to.eq 400

      it "returns a workout with a set that has a total time of six minutes", ->
        expect(generatedSet.totalTime()).to.eq 6 * 60 * 1000

      it "returns a workout with a set and swim intervals", ->
        expect(generatedSet.current().type).to.eq "Swim"

  describe "given full set to parse", ->
    beforeEach ->
      workout = parse(fullSet)

    it "returns a workout", ->
      expect(workout).not.to.eq null

    it "returns a workout with 1 set", ->
      expect(workout.sets.length).to.eq 1

    it "returns a workout with a set named \"Workout\"", ->
      expect(workout.current().name).to.eq "Workout"

    it "returns a workout with 7 intervals", ->
      generatedSet = workout.current()
      expect(generatedSet.totalIntervals()).to.eq 7

  describe "given two sets to parse", ->
    beforeEach ->
      workout = parse(twoSets)

    describe "the workout", ->
      it "is valid", ->
        expect(workout).not.to.eq null

      it "has 2 sets", ->
        expect(workout.sets.length).to.eq 2

      it "has a total distance of 1900 yards", ->
        expect(workout.totalDistance()).to.eq 1900

      it "has a total time of 40 minutes", ->
        expect(workout.totalTime()).to.eq 40 * 60 * 1000
        expect(moment.duration(workout.totalTime()).humanize()).to.eq "40 minutes"

    describe "the first set", ->
      {warmUp} = {}

      beforeEach ->
        warmUp = workout.sets[0]

      it "is valid", ->
        expect(warmUp).not.to.eq null

      it "is the warm-up", ->
        expect(warmUp.name).to.eq "Warm-up"

      it "contains valid intervals", ->
        expect(warmUp.intervals).not.to.eq null

      it "contains two intervals", ->
        expect(warmUp.totalIntervals()).to.eq 2

      it "has a distance of 500", ->
        expect(warmUp.totalDistance()).to.eq 500

    describe "the second set", ->
      mainSet = null
      beforeEach ->
        mainSet = workout.sets[1]

      it "is valid", ->
        expect(mainSet).not.to.eq null

      it "is the Workout", ->
        expect(mainSet.name).to.eq "Workout"

      it "contains valid intervals", ->
        expect(mainSet.intervals).not.to.eq null

      it "contains seven intervals", ->
        expect(mainSet.totalIntervals()).to.eq 7

      it "has a distance of 1400", ->
        expect(mainSet.totalDistance()).to.eq 1400
