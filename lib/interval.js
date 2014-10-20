var Interval, timeFormatter;

timeFormatter = require('./timeFormatter');

module.exports = Interval = (function() {
  function Interval(options) {
    if (options) {
      this.distance = options.distance, this.type = options.type, this.time = options.time;
    }
    if (this.distance == null) {
      this.distance = 0;
    }
    if (this.type == null) {
      this.type = '';
    }
    if (this.time == null) {
      this.time = 0;
    }
  }

  Interval.prototype.isEmpty = function() {
    return this.distance === 0 && this.type === '' && this.time === 0;
  };

  Interval.prototype.toString = function() {
    if (this.time.humanize != null) {
      if (this.distance) {
        return "" + this.distance + " " + this.type + " @ " + (timeFormatter(this.time));
      } else {
        return "" + (timeFormatter(this.time)) + " " + this.type;
      }
    } else {
      return "" + this.distance + " " + this.type;
    }
  };

  return Interval;

})();
