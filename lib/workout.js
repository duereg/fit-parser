var Set, actions, units, workout;

Set = require("./set");

actions = require("./actions");

units = {
  yards: 1,
  meters: 1.3
};

workout = function() {
  this.sets = [];
  this.unit = units.yards;
  this.poolLength = 25;
};

workout.units = units;

workout.prototype.addSet = function(setName) {
  var newSet;
  newSet = new Set(setName);
  this.sets.push(newSet);
  return newSet;
};

workout.prototype.current = function() {
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

workout.prototype.totalDistance = function() {
  return actions.sum(this.sets, "totalDistance");
};

workout.prototype.totalTime = function() {
  return actions.sum(this.sets, "totalTime");
};

module.exports = workout;
