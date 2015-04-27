var Interval, IntervalSet, Set, _, int, moment, propertyFactory,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

moment = require('moment');

_ = require('underscore');

Interval = require('./interval');

Set = require('./set');

propertyFactory = require('./propertyFactory');

int = require('./parser/handlers/int');

IntervalSet = (function(superClass) {
  extend(IntervalSet, superClass);

  function IntervalSet(intervals) {
    var i;
    this.intervals = [];
    propertyFactory(this, this.intervals, 'distance');
    propertyFactory(this, this.intervals, 'type');
    propertyFactory(this, this.intervals, 'time');
    propertyFactory(this, this.intervals, 'rest');
    if (intervals != null) {
      if (int.isNumber(intervals)) {
        i = 0;
        while (i < intervals) {
          this.intervals.push(new Interval());
          i++;
        }
      }
      if (_(intervals).isArray()) {
        intervals.map((function(_this) {
          return function(interval) {
            return _this.intervals.push(new Interval(interval));
          };
        })(this));
      }
    }
  }

  IntervalSet.prototype.isEmpty = function() {
    return this.intervals.length === 0;
  };

  IntervalSet.prototype.add = function(intervalToAdd) {
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
      return this.intervals.length + "x" + (this.current().toString());
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

})(Set);

module.exports = IntervalSet;
