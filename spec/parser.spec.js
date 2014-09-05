var parse = require('../lib/app/parser.js');

describe('When testing the parser', function () {

  var fullExample = "Warm-up \n" +
                    " \n" +
                    "200 Swim \n" +
                    "300 Kick \n" +
                    "100 Swim  \n" +
                    " \n" +
                    "Workout \n" +
                    " \n" +
                    "4x100 HUHO @ 1:30 \n" +
                    "1000 Kick @ 12:00 \n" +
                    "2:00 Rest \n" +
                    "20:00 Swim \n" +
                    " \n" +
                    "4 * 200 OUOU @ 1:30 \n" +
                    " \n" +
                    "Cooldown \n" +
                    " \n" +
                    "300 Swim  \n" +
                    "200 Swim  \n" +
                    "100 Kick  \n";

  var fullSet =     "Workout \n" +
                    "4x100 HUHO @ 1:30 \n" +
                    "1000 Kick @ 12:00 \n" +
                    "2:00 Rest \n" +
                    "20:00 Swim \n";

  var twoSets =     "Warm-up \n" +
                    "200 Swim \n" +
                    "300 Kick \n" +
                    "Workout \n" +
                    "4x100 HUHO @ 1:30 \n" +
                    "1000 Kick @ 12:00 \n" +
                    "2:00 Rest \n" +
                    "20:00 Swim \n";

  var set = "Start";
  var interval = "100 Swim  @   1:30";
  var intervalSet = "4x100  Swim @ 1:30";

  it('given null to parse, returns null', function () {
    var workout = parse(null);
    expect(workout).toBe(null);
  });

  describe('given a Set Name to parse', function () {
    var workout = null;

    beforeEach(function() {
      workout = parse(set);
    });

    it('returns workout', function () {
      expect(workout).not.toBe(null);
    });

    it('returns workout with set', function () {
      expect(workout.sets.length).toBe(1);
    });

    it('returns workout with correct set name', function () {
      expect(workout.current().name).toBe(set);
    });

    it('returns workout with distance of 0', function () {
      expect(workout.current().totalDistance()).toBe(0);
    });

    it('returns workout with time of 0', function () {
      expect(workout.current().totalTime()).toBe(0);
    });
  });

  describe('given interval (100 Swim @ 1:30) to parse', function () {
    var workout = null;

    beforeEach(function() {
      workout = parse(interval);
    });

    it('returns workout', function () {
      var workout = parse(interval);
      expect(workout).not.toBe(null);
    });

    it('returns workout with set', function () {
      var workout = parse(interval);
      expect(workout.sets.length).toBe(1);
    });

    it('returns workout with set and valid interval', function () {
      var workout = parse(interval);
      var generatedInterval = workout.current().current();

      expect(generatedInterval).not.toBe(null);
      expect(generatedInterval.distance).toBe(100);
      expect(generatedInterval.type).toBe("Swim");
    });
  });

  describe('given intervalSet (4x100 Swim @ 1:30) to parse', function () {
    it('returns workout', function () {
      var workout = parse(intervalSet);
      expect(workout).not.toBe(null);
    });

    it('returns workout with set', function () {
      var workout = parse(intervalSet);
      expect(workout.sets.length).toBe(1);
    });

    it('returns workout with set and 4 intervals', function () {
      var workout = parse(intervalSet);
      var generatedSet = workout.current();

      expect(generatedSet).not.toBe(null);
      expect(generatedSet.intervals).not.toBe(null);
      expect(generatedSet.intervals.length).toBe(4);
    });

    it('returns workout with set that has a total distance of 400', function () {
      var workout = parse(intervalSet);
      var generatedSet = workout.current();

      expect(generatedSet).not.toBe(null);
      expect(generatedSet.intervals).not.toBe(null);
      expect(generatedSet.totalDistance()).toBe(400);
    });

    it('returns workout with set and swim intervals', function () {
      var workout = parse(intervalSet);
      var generatedSet = workout.current();

      expect(generatedSet).not.toBe(null);
      expect(generatedSet.intervals).not.toBe(null);
      expect(generatedSet.current().type).toBe("Swim");
    });
  });

  describe('given full set to parse', function () {
    it('returns workout', function () {
      var workout = parse(fullSet);
      expect(workout).not.toBe(null);
    });

    it('returns workout with 1 set', function () {
      var workout = parse(fullSet);
      expect(workout.sets.length).toBe(1);
    });

    it('returns workout with set named "Workout"', function () {
      var workout = parse(fullSet);
      expect(workout.current().name).toBe("Workout");
    });

    it('returns workout with 7 intervals', function () {
      var workout = parse(fullSet);
      var generatedSet = workout.current();

      console.log(generatedSet.intervals);

      expect(generatedSet).not.toBe(null);
      expect(generatedSet.intervals).not.toBe(null);
      expect(generatedSet.intervals.length).toBe(7);
    });
  });

  describe('given two sets to parse', function () {
    it('returns workout', function () {
      var workout = parse(twoSets);
      expect(workout).not.toBe(null);
    });

    it('returns workout with 2 sets', function () {
      var workout = parse(twoSets);
      expect(workout.sets.length).toBe(2);
    });

    it('returns workout with set named "Warm-up" and "Workout"', function () {
      var workout = parse(twoSets);
      expect(workout.sets[0].name).toBe("Warm-up");
      expect(workout.sets[1].name).toBe("Workout");
    });

    it('returns workout with warm-up set with two intervals', function () {
      var workout = parse(twoSets);
      var warmUp = workout.sets[0];

      expect(warmUp).not.toBe(null);
      expect(warmUp.intervals).not.toBe(null);
      expect(warmUp.intervals.length).toBe(2);
    });

    it('returns workout with warm-up set with distance 500', function () {
      var workout = parse(twoSets);
      var warmUp = workout.sets[0];

      expect(warmUp).not.toBe(null);
      expect(warmUp.intervals).not.toBe(null);
      expect(warmUp.totalDistance()).toBe(500);
    });

    it('returns workout with workout set with seven intervals', function () {
      var workout = parse(twoSets);
      var mainSet = workout.sets[1];

      expect(mainSet).not.toBe(null);
      expect(mainSet.intervals).not.toBe(null);
      expect(mainSet.intervals.length).toBe(7);
    });

    it('returns workout with workout set with distance 1400', function () {
      var workout = parse(twoSets);
      var mainSet = workout.sets[1];

      expect(mainSet).not.toBe(null);
      expect(mainSet.intervals).not.toBe(null);
      expect(mainSet.totalDistance()).toBe(1400);
    });
  });
});
