const {expect, jsonIntervals, weightWorkout} = require('./spec-helper');
const moment = require('moment');
const _ = require('lodash');
const Workout = require('../lib/workout');
const timeFormatter = require('../lib/timeFormatter');

const longSwim = {
  distance: 1000,
  type: 'swim',
  rest: timeFormatter.noTime,
  time: _.defaults({
    minutes: 20
  }, timeFormatter.noTime)
};

const shortOuo = {
  distance: 75,
  rest: timeFormatter.noTime,
  time: _.defaults({
    minutes: 1,
    seconds: 10
  }, timeFormatter.noTime),
  type: 'ouou'
};

describe('Workout', function() {
  var set1, workout;
  ({workout, set1} = {});
  describe('::isWeightSet', function() {
    it('the string that is bracketed with "**" is a weight set regex', function() {
      return expect(Workout.isWeightSet('** Squats **')).to.eq(true);
    });
    return it('the string that contains a single "*" is not a weight set regex', function() {
      return expect(Workout.isWeightSet('4*100 @ 1:30')).to.eq(false);
    });
  });
  describe('given weight sets', function() {
    beforeEach(function() {
      return workout = new Workout(weightWorkout);
    });
    it('contains the correct number of sets', function() {
      return expect(workout.sets.length).to.eq(6);
    });
    it('the sets are named correctly', function() {
      expect(workout.sets[0].name).to.eq('** Flat Barbell Bench Press **');
      expect(workout.sets[1].name).to.eq('** Decline cable flies **');
      expect(workout.sets[2].name).to.eq('** Dead Bug 3 **');
      expect(workout.sets[3].name).to.eq('** Dead Bug 4 **');
      expect(workout.sets[4].name).to.eq('** Rope Beaters **');
      return expect(workout.sets[5].name).to.eq('** Running (Treadmill) **');
    });
    return it('generates the correct number of intervals', function() {
      return expect(workout.totalIntervals()).to.eq(16);
    });
  });
  describe('given timed sets', function() {
    beforeEach(function() {
      return workout = new Workout({
        sets: [
          {
            name: 'set 1',
            intervals: jsonIntervals
          }
        ]
      });
    });
    it('contains the correct number of sets', function() {
      return expect(workout.sets.length).to.eq(1);
    });
    it('contains the correct number of intervals', function() {
      expect(workout.current().intervals.length).to.eq(3);
      return expect(workout.totalIntervals()).to.eq(3);
    });
    it('formats correctly', function() {
      return expect(workout.toString()).to.eq('set 1\n100 huho @ 1:30\n100 huho @ 1:30\n100 huho @ 1:30');
    });
    return describe('::toJSON', function() {
      return it('outputs correctly', function() {
        return expect(workout.toJSON()).to.eql({
          sets: [
            {
              name: 'set 1',
              intervals: jsonIntervals
            }
          ]
        });
      });
    });
  });
  describe('adding weight sets', function() {
    return describe('sets added after creation', function() {
      beforeEach(function() {
        workout = new Workout();
        set1 = workout.addSet('** Bench Press **');
        set1.current().weight = 135;
        return set1.current().reps = 10;
      });
      it('contains the correct number of exercises', function() {
        return expect(workout.sets.length).to.eq(1);
      });
      it('contains the correct number of sets', function() {
        expect(workout.current().intervals.length).to.eq(1);
        return expect(workout.totalIntervals()).to.eq(1);
      });
      return it('formats correctly', function() {
        return expect(workout.toString()).to.eq('** Bench Press **\n- 135 lbs x 10 reps');
      });
    });
  });
  return describe('adding timed sets', function() {
    return describe('sets added after creation', function() {
      beforeEach(function() {
        workout = new Workout();
        set1 = workout.addSet('set 1');
        set1.current().distance = 1000;
        set1.current().type = 'swim';
        return set1.current().time = moment.duration('00:20:00');
      });
      it('contains the correct number of sets', function() {
        return expect(workout.sets.length).to.eq(1);
      });
      it('contains the correct number of intervals', function() {
        expect(workout.current().intervals.length).to.eq(1);
        return expect(workout.totalIntervals()).to.eq(1);
      });
      it('formats correctly', function() {
        return expect(workout.toString()).to.eq('set 1\n1000 swim @ 20:00');
      });
      return describe('adding an interval set', function() {
        beforeEach(function() {
          workout.current().add();
          workout.current().setDistance(4);
          workout.current().changeToMulti();
          workout.current().setDistance(75);
          workout.current().setTime(moment.duration('00:01:10'));
          return workout.current().setType('ouou');
        });
        describe('::toJSON', function() {
          return it('outputs correctly', function() {
            return expect(workout.toJSON()).to.eql({
              sets: [
                {
                  name: 'set 1',
                  intervals: [
                    longSwim,
                    {
                      intervals: [shortOuo,
                    shortOuo,
                    shortOuo,
                    shortOuo]
                    }
                  ]
                }
              ]
            });
          });
        });
        return describe('1 set, containing an intervalSet', function() {
          it('contains the correct number of sets', function() {
            return expect(workout.sets.length).to.eq(1);
          });
          it('contains the correct number of intervals', function() {
            expect(workout.current().intervals.length).to.eq(2);
            return expect(workout.totalIntervals()).to.eq(5);
          });
          return it('formats correctly', function() {
            return expect(workout.toString()).to.eq('set 1\n1000 swim @ 20:00\n4x75 ouou @ 1:10');
          });
        });
      });
    });
  });
});
