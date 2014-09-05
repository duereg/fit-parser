parse = require("../lib/parser")

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

describe "When testing the parser", ->

  it "given null to parse, returns null", ->
    expect(parse(null)).toBe null

  describe "given a Set Name to parse", ->
    workout = null
    beforeEach ->
      workout = parse(set)

    it "returns workout", ->
      expect(workout).not.toBe null

    it "returns workout with set", ->
      expect(workout.sets.length).toBe 1

    it "returns workout with correct set name", ->
      expect(workout.current().name).toBe set

    it "returns workout with distance of 0", ->
      expect(workout.current().totalDistance()).toBe 0

    it "returns workout with time of 0", ->
      expect(workout.current().totalTime()).toBe 0

  describe "given interval (100 Swim @ 1:30) to parse", ->
    workout = null
    beforeEach ->
      workout = parse(interval)

    it "returns workout", ->
      expect(workout).not.toBe null

    it "returns workout with set", ->
      expect(workout.sets.length).toBe 1

    it "returns workout with set and valid interval", ->
      generatedInterval = workout.current().current()
      expect(generatedInterval).not.toBe null
      expect(generatedInterval.distance).toBe 100
      expect(generatedInterval.type).toBe "Swim"

  describe "given intervalSet (4x100 Swim @ 1:30) to parse", ->
    workout = null
    beforeEach ->
      workout = parse(intervalSet)

    it "returns workout", ->
      expect(workout).not.toBe null

    it "returns workout with set", ->
      expect(workout.sets.length).toBe 1

    describe "when looking at the current set", ->
      generatedSet = null
      beforeEach ->
        generatedSet = workout.current()

      it "creates a valid set", ->
        expect(generatedSet).not.toBe null

      it "creates valid intervals", ->
        expect(generatedSet.intervals).not.toBe null

      it "returns workout with set and 4 intervals", ->
        expect(generatedSet.intervals.length).toBe 4

      it "returns workout with set that has a total distance of 400", ->
        expect(generatedSet.totalDistance()).toBe 400

      it "returns workout with set and swim intervals", ->
        expect(generatedSet.current().type).toBe "Swim"


  describe "given full set to parse", ->
    workout = null
    beforeEach ->
      workout = parse(fullSet)

    it "returns workout", ->
      expect(workout).not.toBe null

    it "returns workout with 1 set", ->
      expect(workout.sets.length).toBe 1

    it "returns workout with set named \"Workout\"", ->
      expect(workout.current().name).toBe "Workout"

    it "returns workout with 7 intervals", ->
      generatedSet = workout.current()
      expect(generatedSet).not.toBe null
      expect(generatedSet.intervals).not.toBe null
      expect(generatedSet.intervals.length).toBe 7

  describe "given two sets to parse", ->
    workout = null
    beforeEach ->
      workout = parse(twoSets)

    it "returns workout", ->
      expect(workout).not.toBe null

    it "returns workout with 2 sets", ->
      expect(workout.sets.length).toBe 2

    describe "the first set", ->
      warmUp = null
      beforeEach ->
        warmUp = workout.sets[0]

      it "is valid", ->
        expect(warmUp).not.toBe null

      it "is the warm-up", ->
        expect(warmUp.name).toBe "Warm-up"

      it "contains valid intervals", ->
        expect(warmUp.intervals).not.toBe null

      it "contains two intervals", ->
        expect(warmUp.intervals.length).toBe 2

      it "has a distance of 500", ->
        expect(warmUp.totalDistance()).toBe 500


    describe "the second set", ->
      mainSet = null
      beforeEach ->
        mainSet = workout.sets[1]

      it "is valid", ->
        expect(mainSet).not.toBe null

      it "is the Workout", ->
        expect(mainSet.name).toBe "Workout"

      it "contains valid intervals", ->
        expect(mainSet.intervals).not.toBe null

      it "contains seven intervals", ->
        expect(mainSet.intervals.length).toBe 7

      it "has a distance of 1400", ->
        expect(mainSet.totalDistance()).toBe 1400

