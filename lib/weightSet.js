var Interval, Set, Weight, WeightSet, actions,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Weight = require('./weight');

Interval = require('./interval');

Set = require('./set');

actions = require('./actions');

WeightSet = (function(superClass) {
  extend(WeightSet, superClass);

  function WeightSet(options) {
    WeightSet.__super__.constructor.call(this, options);
    this.intervals = this.intervals.map(function(interval) {
      if (interval.reps) {
        return new Weight(interval);
      } else {
        return new Interval(interval);
      }
    });
  }

  WeightSet.prototype.add = function(weightToAdd) {
    if (weightToAdd === null) {
      throw new Error('Invalid weight given');
    }
    weightToAdd = new Weight(weightToAdd);
    this.intervals.push(weightToAdd);
    return weightToAdd;
  };

  WeightSet.prototype.setWeight = function(weight) {
    return this.current().weight = weight;
  };

  WeightSet.prototype.setReps = function(reps) {
    return this.current().reps = reps;
  };

  WeightSet.prototype.totalReps = function() {
    return actions.sum(this.intervals, 'reps');
  };

  WeightSet.prototype.totalWeight = function() {
    return actions.sum(this.intervals, 'weight');
  };

  WeightSet.prototype.oneRepMax = function() {
    return this.intervals.reduce(function(prev, next) {
      var max, nextMax;
      max = (prev != null ? prev.oneRepMax : void 0) != null ? prev != null ? prev.oneRepMax() : void 0 : prev;
      nextMax = next != null ? next.oneRepMax() : void 0;
      if (nextMax > max) {
        return nextMax;
      } else {
        return max;
      }
    });
  };

  return WeightSet;

})(Set);

module.exports = WeightSet;
