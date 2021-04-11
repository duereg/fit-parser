var WeightSet, Workout, expect, weightTitle;

({expect} = require('../spec-helper'));

Workout = require('../../lib/workout');

WeightSet = require('../../lib/weightSet');

weightTitle = require('../../lib/parser/handlers/weightTitle');

describe('weightTitle Handler', function() {
  describe('::canHandle', function() {
    describe('given the token "**"', function() {
      return it('canHandle() returns true', function() {
        return expect(weightTitle.canHandle('**')).to.eq(true);
      });
    });
    return describe('given the token "-"', function() {
      return it('canHandle() returns false', function() {
        return expect(weightTitle.canHandle('-')).to.eq(false);
      });
    });
  });
  return describe('::act', function() {
    var workout;
    ({workout} = {});
    return describe('first pass', function() {
      beforeEach(function() {
        var currentSet;
        workout = new Workout();
        currentSet = workout.current();
        currentSet.add();
        return weightTitle.act(['Bench', 'Press', '**'], '**', currentSet, workout);
      });
      it('there should be only one set', function() {
        return expect(workout.sets.length).to.eq(1);
      });
      it('the workout`s current set has the correct name', function() {
        return expect(workout.current().name).to.eq('** Bench Press **');
      });
      it('the current set is of the correct type', function() {
        return expect(workout.current()).to.be.instanceOf(WeightSet);
      });
      return describe('second pass', function() {
        beforeEach(function() {
          var currentSet;
          currentSet = workout.current();
          return weightTitle.act(['Squat', 'Thrusts', '**'], '**', currentSet, workout);
        });
        it('should create a second set', function() {
          return expect(workout.sets.length).to.eq(2);
        });
        it('the workout`s current set has the correct name', function() {
          return expect(workout.current().name).to.eq('** Squat Thrusts **');
        });
        return it('the current set is of the correct type', function() {
          return expect(workout.current()).to.be.instanceOf(WeightSet);
        });
      });
    });
  });
});
