var Set, Workout, actions;

Set = require('./set');

actions = require('./actions');

Workout = (function() {
  function Workout(options) {
    if (options != null) {
      this.sets = options.sets;
    }
    if (this.sets == null) {
      this.sets = [];
    }
    this.sets = this.sets.map(function(set) {
      return new Set(set);
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
    newSet = new Set({
      name: setName
    });
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
    var set, total, _i, _len, _ref;
    total = 0;
    _ref = this.sets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      set = _ref[_i];
      total += set.totalIntervals();
    }
    return total;
  };

  return Workout;

})();

module.exports = Workout;
