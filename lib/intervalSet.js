var Interval, IntervalSet, moment, propertyFactory;

Interval = require("./interval");

propertyFactory = require("./propertyFactory");

moment = require("moment");

IntervalSet = (function() {
  function IntervalSet(numIntervals) {
    var i;
    this.intervals = [];
    propertyFactory(this, this.intervals, 'distance');
    propertyFactory(this, this.intervals, 'type');
    propertyFactory(this, this.intervals, 'time');
    if (numIntervals) {
      i = 0;
      while (i < numIntervals) {
        this.intervals.push(new Interval());
        i++;
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
      throw new Error("Invalid interval given");
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
      return "";
    }
  };

  return IntervalSet;

})();

module.exports = IntervalSet;
