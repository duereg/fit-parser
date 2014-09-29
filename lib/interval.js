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
      format += this.time.hours() + ":";
    }
    format += this.time.minutes() + ":" + this.time.seconds();
    return format;
  };

  Interval.prototype.toString = function() {
    if (this.time.humanize != null) {
      return "" + this.distance + " " + this.type + " @ " + (this.timeFormatted());
    } else {
      return "" + this.distance + " " + this.type;
    }
  };

  return Interval;

})();
