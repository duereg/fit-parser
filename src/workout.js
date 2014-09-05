var set = require("./set.js");
var actions = require("./actions.js");

var workout = function() {
  this.sets = [];
  this.unit = workout.units.yards;
  this.poolLength = 25;
};
 
workout.units = {
  yards: 1,
  meters: 1.3
};

workout.prototype.addSet = function(setName) {
  var newSet = new set(setName);  
  this.sets.push(newSet);
  return newSet;
};

workout.prototype.current = function(){
  var set = null;
  var setLength = this.sets.length

  if(setLength > 0) {
    set = this.sets[setLength - 1] 
  } else {
    set = this.addSet();
  }

  return set;
};

workout.prototype.totalDistance = function() {
  return actions.sum(this.sets, "totalDistance");
};

workout.prototype.totalTime = function() {
  return actions.sum(this.sets, "totalTime");
};
 
module.exports = workout;