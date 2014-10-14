var Interval;

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

  Interval.prototype.timeFormatted = function() {
    var format;
    format = '';
    if (this.time.hours()) {
      format += this.time.hours() + ':';
    }
    if (this.time.minutes() === 0 && this.time.hours()) {
      format += '00:';
    } else {
      format += this.time.minutes() + ':';
    }
    if (this.time.seconds() === 0) {
      format += '00';
    } else {
      format += this.time.seconds();
    }
    return format;
  };

  Interval.prototype.isEmpty = function() {
    return this.distance === 0 && this.type === '' && this.time === 0;
  };

  Interval.prototype.toString = function() {
    if (this.time.humanize != null) {
      if (this.distance) {
        return "" + this.distance + " " + this.type + " @ " + (this.timeFormatted());
      } else {
        return "" + (this.timeFormatted()) + " " + this.type;
      }
    } else {
      return "" + this.distance + " " + this.type;
    }
  };

  return Interval;

})();
