var TimedSet, WeightSet, Workout, actions, isWeightSet;

TimedSet = require('./timedSet');

WeightSet = require('./weightSet');

actions = require('./actions');

isWeightSet = function(str) {
  return !!str && str.indexOf('**') === 0 && str.lastIndexOf('**') === str.length - 2;
};

Workout = class Workout {
  constructor(options) {
    if (options != null) {
      ({sets: this.sets} = options);
    }
    if (this.sets == null) {
      this.sets = [];
    }
    this.sets = this.sets.map(function(set) {
      if (isWeightSet(set.name)) {
        return new WeightSet(set);
      } else {
        return new TimedSet(set);
      }
    });
  }

  toString() {
    return this.sets.map(function(set) {
      return set.toString();
    }).join('\n');
  }

  toJSON() {
    return {
      sets: this.sets.map(function(set) {
        return set.toJSON();
      })
    };
  }

  addSet(setName) {
    var newSet;
    if (isWeightSet(setName)) {
      newSet = new WeightSet({
        name: setName
      });
    } else {
      newSet = new TimedSet({
        name: setName
      });
    }
    this.sets.push(newSet);
    return newSet;
  }

  current() {
    var currentSet, setLength;
    currentSet = null;
    setLength = this.sets.length;
    if (setLength > 0) {
      currentSet = this.sets[setLength - 1];
    } else {
      currentSet = this.addSet();
    }
    return currentSet;
  }

  totalDistance() {
    return actions.sum(this.sets, 'totalDistance');
  }

  totalTime() {
    return actions.sum(this.sets, 'totalTime');
  }

  totalIntervals() {
    var i, len, ref, set, total;
    total = 0;
    ref = this.sets;
    for (i = 0, len = ref.length; i < len; i++) {
      set = ref[i];
      total += set.totalIntervals();
    }
    return total;
  }

};

Workout.isWeightSet = isWeightSet;

module.exports = Workout;
