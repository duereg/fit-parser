var Interval, IntervalSet, Set, TimedSet, actions, timeFormatter;

Interval = require('./interval');

IntervalSet = require('./intervalSet');

Set = require('./set');

actions = require('./actions');

timeFormatter = require('./timeFormatter');

TimedSet = class TimedSet extends Set {
  constructor(options) {
    //this isn't the right way to do this
    super(options);
    this.intervals = this.intervals.map(function(interval) {
      if (interval.intervals) {
        return new IntervalSet(interval.intervals);
      } else {
        return new Interval(interval);
      }
    });
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

  changeToMulti() {
    var numIntervals;
    numIntervals = this.current().distance;
    //remove single interval
    this.intervals.pop();
    //replace with interval set
    return this.add(new IntervalSet(numIntervals));
  }

  setRest(rest) {
    return this.current().rest = rest;
  }

  setDistance(distance) {
    return this.current().distance = distance;
  }

  setTime(time) {
    return this.current().time = timeFormatter.toDuration(time);
  }

  setType(type) {
    return this.current().type = type;
  }

  totalDistance() {
    return actions.sum(this.intervals, 'distance');
  }

  totalTime() {
    return actions.sum(this.intervals, 'time');
  }

};

module.exports = TimedSet;
