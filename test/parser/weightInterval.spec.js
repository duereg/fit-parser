var Interval, Weight, WeightSet, Workout, expect, weightInterval;

({expect} = require('../spec-helper'));

Workout = require('../../lib/workout');

WeightSet = require('../../lib/weightSet');

Weight = require('../../lib/weight');

Interval = require('../../lib/interval');

weightInterval = require('../../lib/parser/handlers/weightInterval');

describe('weightInterval Handler', function() {
  var currentSet, workout;
  ({workout, currentSet} = {});
  beforeEach(function() {
    workout = new Workout();
    return currentSet = workout.addSet('** Squatters **');
  });
  describe('::canHandle', function() {
    describe('given the token "**"', function() {
      return it('canHandle() returns false', function() {
        return expect(weightInterval.canHandle('**', currentSet)).to.eq(false);
      });
    });
    return describe('given the token "-"', function() {
      return it('canHandle() returns true', function() {
        return expect(weightInterval.canHandle('-', currentSet)).to.eq(true);
      });
    });
  });
  return describe('::act', function() {
    describe('on a line where both weight and reps are defined', function() {
      beforeEach(function() {
        return weightInterval.act(['95.0', 'lbs', 'x', '10', 'reps'], '-', currentSet, workout);
      });
      it('the weight is correct', function() {
        return expect(currentSet.current().weight).to.eq(95);
      });
      it('the reps are correct', function() {
        return expect(currentSet.current().reps).to.eq(10);
      });
      return it('the interval is instanceOf of the Weight class', function() {
        return expect(currentSet.current()).to.be.instanceOf(Weight);
      });
    });
    describe('on a line where only the reps are set', function() {
      beforeEach(function() {
        return weightInterval.act(['10', 'reps'], '-', currentSet, workout);
      });
      it('no weight is set', function() {
        return expect(currentSet.current().weight).to.not.be.ok;
      });
      it('the reps are correct', function() {
        return expect(currentSet.current().reps).to.eq(10);
      });
      return it('the interval is instanceOf of the Weight class', function() {
        return expect(currentSet.current()).to.be.instanceOf(Weight);
      });
    });
    describe('on a line where time and distance is set', function() {
      beforeEach(function() {
        return weightInterval.act(['2.03', 'mi', 'in', '20:00'], '-', currentSet, workout);
      });
      it('no weight is set', function() {
        return expect(currentSet.current().weight).to.not.be.ok;
      });
      it('a time is set', function() {
        return expect(currentSet.current().time.minutes()).to.eq(20);
      });
      it('a distance is set', function() {
        return expect(currentSet.current().distance).to.eq(2.03);
      });
      return it('the interval is instanceOf of the Interval class', function() {
        return expect(currentSet.current()).to.be.instanceOf(Interval);
      });
    });
    return describe('on a line where only time is set', function() {
      beforeEach(function() {
        return weightInterval.act(['00:30'], '-', currentSet, workout);
      });
      it('no weight is set', function() {
        return expect(currentSet.current().weight).to.not.be.ok;
      });
      it('a time is set', function() {
        return expect(currentSet.current().time.seconds()).to.eq(30);
      });
      return it('the interval is instanceOf of the Interval class', function() {
        return expect(currentSet.current()).to.be.instanceOf(Interval);
      });
    });
  });
});
