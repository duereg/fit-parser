const _ = require('lodash');
const Interval = require('./interval');
const Set = require('./set');
const propertyFactory = require('./propertyFactory');
const int = require('./parser/handlers/int');

class IntervalSet extends Set {
  constructor(intervals) {
    var i;
    super();
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
      if (_.isArray(intervals)) {
        intervals.map((interval) => {
          return this.intervals.push(new Interval(interval));
        });
      }
    }
  }

  isEmpty() {
    return this.intervals.length === 0;
  }

  add(intervalToAdd) {
    if (intervalToAdd === null) {
      throw new Error('Invalid interval given');
    }
    if (intervalToAdd == null) {
      intervalToAdd = new Interval();
    }
    this.intervals.push(intervalToAdd);
    return intervalToAdd;
  }

  toString() {
    if (this.intervals.length) {
      return `${this.intervals.length}x${this.current().toString()}`;
    } else {
      return '';
    }
  }

  toJSON() {
    return {
      intervals: this.intervals.map(function(interval) {
        return interval.toJSON();
      })
    };
  }

};

module.exports = IntervalSet;
