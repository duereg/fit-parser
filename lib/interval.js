var Interval, timeFormatter;

timeFormatter = require('./timeFormatter');

module.exports = Interval = (function() {
  function Interval(options) {
    if (options) {
      this.distance = options.distance, this.type = options.type, this.time = options.time, this.rest = options.rest;
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
    if (this.rest == null) {
      this.rest = 0;
    }
  }

  Interval.prototype.isEmpty = function() {
    return this.distance === 0 && this.type === '' && this.time === 0;
  };

  Interval.prototype.toJSON = function() {
    return {
      time: timeFormatter.toJSON(this.time),
      rest: timeFormatter.toJSON(this.rest),
      distance: this.distance,
      type: this.type
    };
  };

  Interval.prototype.toString = function() {
    var time;
    if ((this.time.humanize != null) || (this.rest.humanize != null)) {
      if (this.distance) {
        time = '';
        if (this.time.humanize != null) {
          time = "@ " + (timeFormatter.toString(this.time));
        } else if (this.rest.humanize != null) {
          time = "+" + (timeFormatter.toString(this.rest));
        }
        return "" + this.distance + " " + this.type + " " + time;
      } else {
        return "" + (timeFormatter.toString(this.time)) + " " + this.type;
      }
    } else {
      return "" + this.distance + " " + this.type;
    }
  };

  return Interval;

})();
