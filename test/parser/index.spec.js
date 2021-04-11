var expect, fullExample, fullSet, interval, intervalSet, intervalWithRest, moment, parse, set, twoSets, weightExample, weightWithCardio;

({expect} = require('../spec-helper'));

parse = require('../../lib/parser');

moment = require('moment');

fullExample = `Warm up

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
100 Kick  `;

fullSet = `Workout
4x100 HUHO @ 1:30
1000 Kick @ 12:00
2:00 Rest
20:00 Swim `;

twoSets = `Warm-up
200 Swim
300 Kick
Workout
4x100 HUHO @ :30
1000 Kick @ 16:00
2:00 Rest
20:00 Swim `;

weightExample = `** Flat Barbell Bench Press **
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
- 20 reps`;

weightWithCardio = weightExample + `
** Rope Beaters **
- 00:30
- 00:30

** Running (Treadmill) **
- 2.03 mi in 20:00`;

set = 'Start';

interval = '100 Swim  @   30';

intervalSet = '4x100  Swim @ 1:30';

intervalWithRest = '100 Swim +30';

describe('parser', function() {
  var workout;
  ({workout} = {});
  it('given null to parse, throws', function() {
    return expect(function() {
      return parse(null);
    }).to.throw('You must provide a valid string to parse to continue.');
  });

  describe('Given a full example to parse', function() {
    beforeEach(function() {
      return workout = parse(fullExample);
    });

    it('parses the workout into three sets', function() {
      return expect(workout.sets.length).to.eq(3);
    });

    it('names each set correctly', function() {
      expect(workout.sets[0].name).to.eq('Warm up');
      expect(workout.sets[1].name).to.eq('Workout');
      return expect(workout.sets[2].name).to.eq('Cooling down now');
    });
  });

  describe('given a weight set to parse', function() {
    beforeEach(function() {
      return workout = parse(weightExample);
    });

    it('returns a workout', function() {
      return expect(workout).not.to.eq(null);
    });

    it('returns a workout with 4 sets', function() {
      return expect(workout.sets.length).to.eq(4);
    });

    it('the sets are named correctly', function() {
      expect(workout.sets[0].name).to.eq('** Flat Barbell Bench Press **');
      expect(workout.sets[1].name).to.eq('** Decline cable flies **');
      expect(workout.sets[2].name).to.eq('** Dead Bug 3 **');
      return expect(workout.sets[3].name).to.eq('** Dead Bug 4 **');
    });

    it('generates the correct number of intervals', function() {
      return expect(workout.totalIntervals()).to.eq(13);
    });
  });

  describe('given a weight set with cardio to parse', function() {
    beforeEach(function() {
      return workout = parse(weightWithCardio);
    });

    it('returns a workout', function() {
      return expect(workout).not.to.eq(null);
    });

    it('returns a workout with 6 sets', function() {
      return expect(workout.sets.length).to.eq;
    });

    it('the 5th and 6th sets are named correctly', function() {
      expect(workout.sets[4].name).to.eq('** Rope Beaters **');
      return expect(workout.sets[5].name).to.eq('** Running (Treadmill) **');
    });

    it('generates the correct number of intervals', function() {
      return expect(workout.totalIntervals()).to.eq(16);
    });
  });

  describe('given a Set Name to parse', function() {
    beforeEach(function() {
      return workout = parse(set);
    });

    it('returns a workout', function() {
      return expect(workout).not.to.eq(null);
    });

    it('returns a workout with a set', function() {
      return expect(workout.sets.length).to.eq(1);
    });

    it('returns a workout with correct set name', function() {
      return expect(workout.current().name).to.eq(set);
    });

    it('returns a workout with distance of 0', function() {
      return expect(workout.current().totalDistance()).to.eq(0);
    });

    it('returns a workout with time of 0', function() {
      return expect(workout.current().totalTime()).to.eq(0);
    });
  });

  describe('given interval with time (100 Swim @ :30) to parse', function() {
    beforeEach(function() {
      return workout = parse(interval);
    });

    it('returns a workout', function() {
      return expect(workout).not.to.eq(null);
    });

    it('returns a workout with a set', function() {
      return expect(workout.sets.length).to.eq(1);
    });

    describe('generated interval', function() {
      var generatedInterval;
      generatedInterval = null;
      beforeEach(function() {
        return generatedInterval = workout.current().current();
      });

      it('has valid distance', function() {
        return expect(generatedInterval.distance).to.eq(100);
      });

      it('had valid type', function() {
        return expect(generatedInterval.type).to.eq('Swim');
      });

      it('had valid time', function() {
        expect(generatedInterval.time.minutes()).to.eq(0);
        return expect(generatedInterval.time.seconds()).to.eq(30);
      });
    });
  });

  describe('given interval with rest (100 Swim +30) to parse', function() {
    beforeEach(function() {
      return workout = parse(intervalWithRest);
    });

    it('returns a workout', function() {
      return expect(workout).not.to.eq(null);
    });

    it('returns a workout with a set', function() {
      return expect(workout.sets.length).to.eq(1);
    });

    describe('generated interval', function() {
      let generatedInterval = null;

      beforeEach(function() {
        return generatedInterval = workout.current().current();
      });

      it('has valid distance', function() {
        return expect(generatedInterval.distance).to.eq(100);
      });

      it('had valid type', function() {
        return expect(generatedInterval.type).to.eq('Swim');
      });

      it('had valid time', function() {
        return expect(generatedInterval.rest.seconds()).to.eq(30);
      });
    });
  });

  describe('given intervalSet (4x100 Swim @ 1:30) to parse', function() {
    beforeEach(function() {
      return workout = parse(intervalSet);
    });

    it('returns a workout', function() {
      return expect(workout).not.to.eq(null);
    });

    it('returns a workout with a set', function() {
      return expect(workout.sets.length).to.eq(1);
    });

    it('returns valid time', function() {
      return expect(workout.totalTime()).to.eq(360000);
    });

    describe('when looking at the current set', function() {
      var generatedSet;
      generatedSet = null;
      beforeEach(function() {
        return generatedSet = workout.current();
      });

      it('creates a valid set', function() {
        return expect(generatedSet).not.to.eq(null);
      });

      it('creates valid intervals', function() {
        return expect(generatedSet.intervals).not.to.eq(null);
      });

      it('returns a workout with a set and 4 intervals', function() {
        return expect(generatedSet.current().intervals.length).to.eq(4);
      });

      it('returns a workout with a set that has a total distance of 400', function() {
        return expect(generatedSet.totalDistance()).to.eq(400);
      });

      it('returns a workout with a set that has a total time of six minutes', function() {
        return expect(generatedSet.totalTime()).to.eq(6 * 60 * 1000);
      });

      it('returns a workout with a set and swim intervals', function() {
        return expect(generatedSet.current().type).to.eq('Swim');
      });
    });
  });

  describe('given full set to parse', function() {
    beforeEach(function() {
      return workout = parse(fullSet);
    });

    it('returns a workout', function() {
      return expect(workout).not.to.eq(null);
    });

    it('returns a workout with 1 set', function() {
      return expect(workout.sets.length).to.eq(1);
    });

    it("returns a workout with a set named 'Workout'", function() {
      return expect(workout.current().name).to.eq('Workout');
    });

    it('returns a workout with 7 intervals', function() {
      var generatedSet;
      generatedSet = workout.current();
      return expect(generatedSet.totalIntervals()).to.eq(7);
    });
  });

  describe('given two sets to parse', function() {
    beforeEach(function() {
      return workout = parse(twoSets);
    });
    describe('the workout', function() {
      it('is valid', function() {
        return expect(workout).not.to.eq(null);
      });

      it('has 2 sets', function() {
        return expect(workout.sets.length).to.eq(2);
      });

      it('has a total distance of 1900 yards', function() {
        return expect(workout.totalDistance()).to.eq(1900);
      });

      it('has a total time of 40 minutes', function() {
        expect(workout.totalTime()).to.eq(40 * 60 * 1000);
        return expect(moment.duration(workout.totalTime()).humanize()).to.eq('40 minutes');
      });
    });
    describe('the first set', function() {
      var warmUp;
      ({warmUp} = {});
      beforeEach(function() {
        return warmUp = workout.sets[0];
      });

      it('is valid', function() {
        return expect(warmUp).not.to.eq(null);
      });

      it('is the warm-up', function() {
        return expect(warmUp.name).to.eq('Warm-up');
      });

      it('contains valid intervals', function() {
        return expect(warmUp.intervals).not.to.eq(null);
      });

      it('contains two intervals', function() {
        return expect(warmUp.totalIntervals()).to.eq(2);
      });

      it('has a distance of 500', function() {
        return expect(warmUp.totalDistance()).to.eq(500);
      });
    });

    describe('the second set', function() {
      var mainSet;
      mainSet = null;
      beforeEach(function() {
        return mainSet = workout.sets[1];
      });

      it('is valid', function() {
        return expect(mainSet).not.to.eq(null);
      });

      it('is the Workout', function() {
        return expect(mainSet.name).to.eq('Workout');
      });

      it('contains valid intervals', function() {
        return expect(mainSet.intervals).not.to.eq(null);
      });

      it('contains seven intervals', function() {
        return expect(mainSet.totalIntervals()).to.eq(7);
      });

      it('has a distance of 1400', function() {
        return expect(mainSet.totalDistance()).to.eq(1400);
      });
    });
  });
});
