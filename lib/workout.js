var Set, Workout, actions, units;

Set = require("./set");

actions = require("./actions");

units = {
  yards: 1,
  meters: 1.3
};

Workout = (function() {
  function Workout() {
    this.sets = [];
    this.unit = units.yards;
    this.poolLength = 25;
  }

  Workout.prototype.toString = function() {
    return this.sets.map(function(set) {
      return set.toString();
    }).join('\n');
  };

  Workout.prototype.addSet = function(setName) {
    var newSet;
    newSet = new Set(setName);
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
    return actions.sum(this.sets, "totalDistance");
  };

  Workout.prototype.totalTime = function() {
    return actions.sum(this.sets, "totalTime");
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

Workout.units = units;

module.exports = Workout;
