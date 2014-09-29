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

  return Workout;

})();

Workout.units = units;

module.exports = Workout;
