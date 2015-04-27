var TimedSet, WeightSet, Workout, actions, isWeightSet;

TimedSet = require('./timedSet');

WeightSet = require('./weightSet');

actions = require('./actions');

isWeightSet = function(str) {
  return !!str && str.indexOf('**') === 0 && str.lastIndexOf('**') === str.length - 2;
};

Workout = (function() {
  function Workout(options) {
    if (options != null) {
      this.sets = options.sets;
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

  Workout.prototype.toString = function() {
    return this.sets.map(function(set) {
      return set.toString();
    }).join('\n');
  };

  Workout.prototype.toJSON = function() {
    return {
      sets: this.sets.map(function(set) {
        return set.toJSON();
      })
    };
  };

  Workout.prototype.addSet = function(setName) {
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
  };

  Workout.prototype.current = function() {
    var currentSet, setLength;
    currentSet = null;
    setLength = this.sets.length;
    if (setLength > 0) {
      currentSet = this.sets[setLength - 1];
    } else {
      currentSet = this.addSet();
    }
    return currentSet;
  };

  Workout.prototype.totalDistance = function() {
    return actions.sum(this.sets, 'totalDistance');
  };

  Workout.prototype.totalTime = function() {
    return actions.sum(this.sets, 'totalTime');
  };

  Workout.prototype.totalIntervals = function() {
    var i, len, ref, set, total;
    total = 0;
    ref = this.sets;
    for (i = 0, len = ref.length; i < len; i++) {
      set = ref[i];
      total += set.totalIntervals();
    }
    return total;
  };

  return Workout;

})();

Workout.isWeightSet = isWeightSet;

module.exports = Workout;
