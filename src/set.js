var interval = require("./interval.js");
var actions = require("./actions.js");

var set = function(setName) {
  this.intervals = [];
  this.name = setName || "";
  this.multiSet = 0;
};

set.prototype.setStuff = function(key, value) {
  if(this.multiSet) {
    actions.set(this.intervals, this.multiSet, key, value);
  } else {
    this.current()[key] = value;
  }
};

set.prototype.addInterval = function(intervalToAdd) { 
  if(intervalToAdd === null) throw "Give me a valid interval, would you?";
  if(intervalToAdd === undefined) intervalToAdd = new interval()
  this.intervals.push(intervalToAdd);
  return intervalToAdd;
};

set.prototype.current = function() {
  var interval = null;
  var intervalLength = this.intervals.length
  
  if(intervalLength > 0) {
    interval = this.intervals[intervalLength - 1] 
  } else {
    interval = this.addInterval();
  }

  return interval;
};

set.prototype.changeToMulti = function() {
  this.multiSet = this.current().distance;
  this.current().distance = 0;
  for(var i = 1; i < this.multiSet; i++) {
    this.addInterval();
  } 
}

set.prototype.reset = function() {
  this.multiSet = 0;
}

set.prototype.setDistance = function(distance) {
  this.setStuff("distance", distance);
};

set.prototype.setTime = function(time) {
  this.setStuff("time", time);
};

set.prototype.setType = function(type) {
  this.setStuff("type", type);
}; 
 
set.prototype.totalDistance = function() {
  return actions.sum(this.intervals, "distance");
}

set.prototype.totalTime = function() {
  return actions.sum(this.intervals, "time");
}

module.exports = set;