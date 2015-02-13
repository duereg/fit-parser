var Interval, IntervalSet, Set, TimedSet, actions, timeFormatter,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

Interval = require('./interval');

IntervalSet = require('./intervalSet');

Set = require('./set');

actions = require('./actions');

timeFormatter = require('./timeFormatter');

TimedSet = (function(_super) {
  __extends(TimedSet, _super);

  function TimedSet(options) {
    TimedSet.__super__.constructor.call(this, options);
    this.intervals = this.intervals.map(function(interval) {
      if (interval.intervals) {
        return new IntervalSet(interval.intervals);
      } else {
        return new Interval(interval);
      }
    });
  }

  TimedSet.prototype.add = function(intervalToAdd) {
    if (intervalToAdd === null) {
      throw new Error('Invalid interval given');
    }
    if (intervalToAdd == null) {
      intervalToAdd = new Interval();
    }
    this.intervals.push(intervalToAdd);
    return intervalToAdd;
  };

  TimedSet.prototype.changeToMulti = function() {
    var numIntervals;
    numIntervals = this.current().distance;
    this.intervals.pop();
    return this.add(new IntervalSet(numIntervals));
  };

  TimedSet.prototype.setRest = function(rest) {
    return this.current().rest = rest;
  };

  TimedSet.prototype.setDistance = function(distance) {
    return this.current().distance = distance;
  };

  TimedSet.prototype.setTime = function(time) {
    return this.current().time = timeFormatter.toDuration(time);
  };

  TimedSet.prototype.setType = function(type) {
    return this.current().type = type;
  };

  TimedSet.prototype.totalDistance = function() {
    return actions.sum(this.intervals, 'distance');
  };

  TimedSet.prototype.totalTime = function() {
    return actions.sum(this.intervals, 'time');
  };

  return TimedSet;

})(Set);

module.exports = TimedSet;
