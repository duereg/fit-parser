var Set, actions;

actions = require('./actions');

Set = class Set {
  constructor(options) {
    if (options != null) {
      ({name: this.name, intervals: this.intervals} = options);
    }
    if (this.intervals == null) {
      this.intervals = [];
    }
    if (this.name == null) {
      this.name = '';
    }
  }

  toString() {
    var output;
    output = '';
    if (this.name.length) {
      output += this.name + '\n';
    }
    output += this.intervals.map(function(interval) {
      return interval.toString();
    }).join('\n');
    return output;
  }

  toJSON() {
    return {
      name: this.name,
      intervals: this.intervals.map(function(interval) {
        return interval.toJSON();
      })
    };
  }

  add() {
    throw new Error('Must implement');
  }

  current() {
    var currentInterval, intervalLength;
    currentInterval = null;
    intervalLength = this.intervals.length;
    if (intervalLength > 0) {
      currentInterval = this.intervals[intervalLength - 1];
    } else {
      currentInterval = this.add();
    }
    return currentInterval;
  }

  totalIntervals() {
    var i, interval, len, ref, total;
    total = 0;
    ref = this.intervals;
    for (i = 0, len = ref.length; i < len; i++) {
      interval = ref[i];
      if (interval != null ? interval.intervals : void 0) {
        total += interval.intervals.length;
      } else {
        total += 1;
      }
    }
    return total;
  }

};

module.exports = Set;
