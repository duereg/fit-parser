var Interval, _, timeFormatter;

timeFormatter = require('./timeFormatter');

_ = require('underscore');

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
    this.rest = timeFormatter.toDuration(this.rest);
    this.time = timeFormatter.toDuration(this.time);
  }

  Interval.prototype.isEmpty = function() {
    return this.distance === 0 && this.type === '' && timeFormatter.isEmpty(this.time) && timeFormatter.isEmpty(this.rest);
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
    if (!timeFormatter.isEmpty(this.time) || !timeFormatter.isEmpty(this.rest)) {
      if (this.distance) {
        time = '';
        if (!timeFormatter.isEmpty(this.time)) {
          time = " @ " + (timeFormatter.toString(this.time));
        } else if (!timeFormatter.isEmpty(this.rest)) {
          time = " +" + (timeFormatter.toString(this.rest));
        }
        return this.distance + " " + this.type + time;
      } else {
        return (timeFormatter.toString(this.time)) + " " + this.type;
      }
    } else {
      return this.distance + " " + this.type;
    }
  };

  return Interval;

})();
