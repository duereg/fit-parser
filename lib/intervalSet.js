var Interval, IntervalSet, int, moment, propertyFactory, _;

moment = require('moment');

_ = require('underscore');

Interval = require('./interval');

propertyFactory = require('./propertyFactory');

int = require('./parser/handlers/int');

IntervalSet = (function() {
  function IntervalSet(intervals) {
    var i;
    this.intervals = [];
    propertyFactory(this, this.intervals, 'distance');
    propertyFactory(this, this.intervals, 'type');
    propertyFactory(this, this.intervals, 'time');
    propertyFactory(this, this.intervals, 'rest');
    if (intervals) {
      if (int.isNumber(intervals)) {
        i = 0;
        while (i < intervals) {
          this.intervals.push(new Interval());
          i++;
        }
      }
      if (_(intervals).isArray()) {
        this.intervals = intervals.map(function(interval) {
          return new Interval(interval);
        });
      }
    }
  }

  IntervalSet.prototype.isEmpty = function() {
    return this.intervals.length === 0;
  };

  IntervalSet.prototype.current = function() {
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

  IntervalSet.prototype.addInterval = function(intervalToAdd) {
    if (intervalToAdd === null) {
      throw new Error('Invalid interval given');
    }
    if (intervalToAdd == null) {
      intervalToAdd = new Interval();
    }
    this.intervals.push(intervalToAdd);
    return intervalToAdd;
  };

  IntervalSet.prototype.toString = function() {
    if (this.intervals.length) {
      return "" + this.intervals.length + "x" + (this.current().toString());
    } else {
      return '';
    }
  };

  IntervalSet.prototype.toJSON = function() {
    return {
      intervals: this.intervals.map(function(interval) {
        return interval.toJSON();
      })
    };
  };

  return IntervalSet;

})();

module.exports = IntervalSet;
