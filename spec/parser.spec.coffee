{expect} = require "./spec-helper"
parse = require("../lib/parser")
moment = require "moment"

fullExample = """
Warm-up

200 Swim
300 Kick
100 Swim

Workout

4x100 HUHO @ 1:30
1000 Kick @ 12:00
2:00 Rest
20:00 Swim

4 * 200 OUOU @ 1:30

Cooldown

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
4x100 HUHO @ 1:30
1000 Kick @ 12:00
2:00 Rest
20:00 Swim """

set = "Start"

interval = "100 Swim  @   1:30"

intervalSet = "4x100  Swim @ 1:30"

describe "parser", ->

  it "given null to parse, throws", ->
    expect(() -> parse(null)).to.throw "You must provide a valid string to parse to continue."

  describe "given a Set Name to parse", ->
    workout = null
    beforeEach ->
      workout = parse(set)

    it "returns workout", ->
      expect(workout).not.to.eq null

    it "returns workout with set", ->
      expect(workout.sets.length).to.eq 1

    it "returns workout with correct set name", ->
      expect(workout.current().name).to.eq set

    it "returns workout with distance of 0", ->
      expect(workout.current().totalDistance()).to.eq 0

    it "returns workout with time of 0", ->
      expect(workout.current().totalTime()).to.eq 0

  describe "given interval (100 Swim @ 1:30) to parse", ->
    workout = null
    beforeEach ->
      workout = parse(interval)

    it "returns workout", ->
      expect(workout).not.to.eq null

    it "returns workout with set", ->
      expect(workout.sets.length).to.eq 1

    it "returns workout with set and valid interval", ->
      generatedInterval = workout.current().current()
      expect(generatedInterval).not.to.eq null
      expect(generatedInterval.distance).to.eq 100
      expect(generatedInterval.type).to.eq "Swim"

  describe "given intervalSet (4x100 Swim @ 1:30) to parse", ->
    workout = null
    beforeEach ->
      workout = parse(intervalSet)

    it "returns workout", ->
      expect(workout).not.to.eq null

    it "returns workout with set", ->
      expect(workout.sets.length).to.eq 1

    describe "when looking at the current set", ->
      generatedSet = null
      beforeEach ->
        generatedSet = workout.current()

      it "creates a valid set", ->
        expect(generatedSet).not.to.eq null

      it "creates valid intervals", ->
        expect(generatedSet.intervals).not.to.eq null

      it "returns workout with set and 4 intervals", ->
        expect(generatedSet.intervals.length).to.eq 4

      it "returns workout with set that has a total distance of 400", ->
        expect(generatedSet.totalDistance()).to.eq 400

      it "returns workout with set and swim intervals", ->
        expect(generatedSet.current().type).to.eq "Swim"


  describe "given full set to parse", ->
    workout = null
    beforeEach ->
      workout = parse(fullSet)

    it "returns workout", ->
      expect(workout).not.to.eq null

    it "returns workout with 1 set", ->
      expect(workout.sets.length).to.eq 1

    it "returns workout with set named \"Workout\"", ->
      expect(workout.current().name).to.eq "Workout"

    it "returns workout with 7 intervals", ->
      generatedSet = workout.current()
      expect(generatedSet).not.to.eq null
      expect(generatedSet.intervals).not.to.eq null
      expect(generatedSet.intervals.length).to.eq 7

  describe "given two sets to parse", ->
    workout = null
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
        expect(workout.totalTime()).to.eq 2400000
        expect(moment.duration(workout.totalTime()).humanize()).to.eq "40 minutes"

    describe "the first set", ->
      warmUp = null
      beforeEach ->
        warmUp = workout.sets[0]

      it "is valid", ->
        expect(warmUp).not.to.eq null

      it "is the warm-up", ->
        expect(warmUp.name).to.eq "Warm-up"

      it "contains valid intervals", ->
        expect(warmUp.intervals).not.to.eq null

      it "contains two intervals", ->
        expect(warmUp.intervals.length).to.eq 2

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
        expect(mainSet.intervals.length).to.eq 7

      it "has a distance of 1400", ->
        expect(mainSet.totalDistance()).to.eq 1400

