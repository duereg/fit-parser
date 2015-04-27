var Set, actions;

actions = require('./actions');

Set = (function() {
  function Set(options) {
    if (options != null) {
      this.name = options.name, this.intervals = options.intervals;
    }
    if (this.intervals == null) {
      this.intervals = [];
    }
    if (this.name == null) {
      this.name = '';
    }
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

  Set.prototype.toJSON = function() {
    return {
      name: this.name,
      intervals: this.intervals.map(function(interval) {
        return interval.toJSON();
      })
    };
  };

  Set.prototype.add = function() {
    throw new Error('Must implement');
  };

  Set.prototype.current = function() {
    var currentInterval, intervalLength;
    currentInterval = null;
    intervalLength = this.intervals.length;
    if (intervalLength > 0) {
      currentInterval = this.intervals[intervalLength - 1];
    } else {
      currentInterval = this.add();
    }
    return currentInterval;
  };

  Set.prototype.totalIntervals = function() {
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
  };

  return Set;

})();

module.exports = Set;
