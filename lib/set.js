var Interval, IntervalSet, Set, actions;

Interval = require('./interval');

IntervalSet = require('./intervalSet');

actions = require('./actions');

Set = (function() {
  function Set(setName) {
    this.intervals = [];
    this.name = setName || '';
  }

  Set.prototype.toString = function() {
    var output;
    output = '';
    if (this.name.length) {
      output += this.name + '\n';
    }
    output += this.intervals.map(function(interval) {
      return interval.toString();
    }).join('\n');
    return output;
  };

  Set.prototype.addInterval = function(intervalToAdd) {
    if (intervalToAdd === null) {
      throw new Error('Invalid interval given');
    }
    if (intervalToAdd == null) {
      intervalToAdd = new Interval();
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
    var numIntervals;
    numIntervals = this.current().distance;
    this.intervals.pop();
    return this.addInterval(new IntervalSet(numIntervals));
  };

  Set.prototype.setRest = function(rest) {
    return this.current().rest = rest;
  };

  Set.prototype.setDistance = function(distance) {
    return this.current().distance = distance;
  };

  Set.prototype.setTime = function(time) {
    return this.current().time = time;
  };

  Set.prototype.setType = function(type) {
    return this.current().type = type;
  };

  Set.prototype.totalDistance = function() {
    return actions.sum(this.intervals, 'distance');
  };

  Set.prototype.totalTime = function() {
    return actions.sum(this.intervals, 'time');
  };

  Set.prototype.totalIntervals = function() {
    var interval, total, _i, _len, _ref;
    total = 0;
    _ref = this.intervals;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      interval = _ref[_i];
      if (interval != null ? interval.intervals : void 0) {
        total += interval.intervals.length;
      } else {
        total += 1;
      }
    }
    return total;
  };

  return Set;

})();

module.exports = Set;
