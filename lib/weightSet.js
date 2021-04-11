var Interval, Set, Weight, WeightSet, actions;

Weight = require('./weight');

Interval = require('./interval');

Set = require('./set');

actions = require('./actions');

WeightSet = class WeightSet extends Set {
  constructor(options) {
    //this isn't the right way to do this
    super(options);
    this.intervals = this.intervals.map(function(interval) {
      if (interval.reps) { //always will have reps
        return new Weight(interval);
      } else {
        return new Interval(interval);
      }
    });
  }

  add(weightToAdd) {
    if (weightToAdd === null) {
      throw new Error('Invalid weight given');
    }
    weightToAdd = new Weight(weightToAdd);
    this.intervals.push(weightToAdd);
    return weightToAdd;
  }

  setWeight(weight) {
    return this.current().weight = weight;
  }

  setReps(reps) {
    return this.current().reps = reps;
  }

  totalReps() {
    return actions.sum(this.intervals, 'reps');
  }

  totalWeight() {
    return actions.sum(this.intervals, 'weight');
  }

  oneRepMax() {
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
  }

};

module.exports = WeightSet;
