var actions, interval, set;

interval = require("./interval");

actions = require("./actions");

set = function(setName) {
  this.intervals = [];
  this.name = setName || "";
  this.multiSet = 0;
};

set.prototype.setStuff = function(key, value) {
  if (this.multiSet) {
    actions.set(this.intervals, this.multiSet, key, value);
  } else {
    this.current()[key] = value;
  }
};

set.prototype.addInterval = function(intervalToAdd) {
  if (intervalToAdd === null) {
    throw new Error("Give me a valid interval, would you?");
  }
  if (intervalToAdd === undefined) {
    intervalToAdd = new interval();
  }
  this.intervals.push(intervalToAdd);
  return intervalToAdd;
};

set.prototype.current = function() {
  var currentInterval, intervalLength;
  currentInterval = null;
  intervalLength = this.intervals.length;
  if (intervalLength > 0) {
    currentInterval = this.intervals[intervalLength - 1];
  } else {
    currentInterval = this.addInterval();
  }
  return currentInterval;
};

set.prototype.changeToMulti = function() {
  var i;
  this.multiSet = this.current().distance;
  this.current().distance = 0;
  i = 1;
  while (i < this.multiSet) {
    this.addInterval();
    i++;
  }
};

set.prototype.reset = function() {
  this.multiSet = 0;
};

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
};

set.prototype.totalTime = function() {
  return actions.sum(this.intervals, "time");
};

module.exports = set;
