var Set, actions, interval;

interval = require("./interval");

actions = require("./actions");

Set = (function() {
  function Set(setName) {
    this.intervals = [];
    this.name = setName || "";
    this.multiSet = 0;
  }

  Set.prototype.toString = function() {
    var output, _i, _len, _ref;
    output = '';
    if (this.multiSet) {
      output = "" + this.multiSet + "x" + (this.current().toString());
    } else {
      _ref = this.intervals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        interval = _ref[_i];
        output += interval.toString() + '\n';
      }
    }
    return output;
  };

  Set.prototype.setStuff = function(key, value) {
    if (this.multiSet) {
      actions.set(this.intervals, this.multiSet, key, value);
    } else {
      this.current()[key] = value;
    }
  };

  Set.prototype.addInterval = function(intervalToAdd) {
    if (intervalToAdd === null) {
      throw new Error("Invalid interval given");
    }
    if (intervalToAdd == null) {
      intervalToAdd = new interval();
    }
    this.intervals.push(intervalToAdd);
    return intervalToAdd;
  };

  Set.prototype.current = function() {
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

  Set.prototype.changeToMulti = function() {
    var i;
    this.multiSet = this.current().distance;
    this.current().distance = 0;
    i = 1;
    while (i < this.multiSet) {
      this.addInterval();
      i++;
    }
  };

  Set.prototype.reset = function() {
    this.multiSet = 0;
  };

  Set.prototype.setDistance = function(distance) {
    this.setStuff("distance", distance);
  };

  Set.prototype.setTime = function(time) {
    this.setStuff("time", time);
  };

  Set.prototype.setType = function(type) {
    this.setStuff("type", type);
  };

  Set.prototype.totalDistance = function() {
    return actions.sum(this.intervals, "distance");
  };

  Set.prototype.totalTime = function() {
    return actions.sum(this.intervals, "time");
  };

  return Set;

})();

module.exports = Set;
